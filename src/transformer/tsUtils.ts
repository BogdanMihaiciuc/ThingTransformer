import {
  createScanner,
  ScriptTarget,
  SyntaxKind,
  Node,
  createSourceFile,
  createPrinter,
  ScriptKind,
  EmitHint,
  NewLineKind,
} from "typescript";

import prettier from "@prettier/sync";
import { NEWLINE_PLACEHOLDER } from "./JsonToTsTransformer";

export function equals(
  first: string | TokenInfo[],
  second: string | TokenInfo[]
): boolean {
  const firstTokens = typeof first == "string" ? convertToTokens(first) : first;
  const secondTokens =
    typeof second == "string" ? convertToTokens(second) : second;

  return tokensEquals(firstTokens, secondTokens);
}

function tokensEquals(first: TokenInfo[], second: TokenInfo[]): boolean {
  if (first.length !== second.length) {
    return false;
  }
  let index = first.length;
  while (--index >= 0) {
    const firstToken = first[index];
    const secondToken = second[index];
    if (firstToken.text !== secondToken.text) {
      return false;
    }
  }
  return true;
}

type TokenInfo = {
  value: SyntaxKind;
  text: string;
  pos: number;
};

function convertToTokens(text: string): TokenInfo[] {
  const result: TokenInfo[] = [];

  const scanner = createScanner(ScriptTarget.Latest, true);
  scanner.setText(text);

  while (scanner.scan() !== SyntaxKind.EndOfFileToken) {
    const token = {
      value: scanner.getToken(),
      text: scanner.getTokenText(),
      pos: scanner.getTokenPos(),
    };
    if (
      token.value === SyntaxKind.CommaToken ||
      token.value === SyntaxKind.OpenParenToken ||
      token.value === SyntaxKind.CloseParenToken ||
      token.value === SyntaxKind.SemicolonToken
    ) {
      continue;
    }
    if (token.value === SyntaxKind.StringLiteral) {
      token.text = token.text.trim();
    }
    result.push(token);
  }
  return result;
}

export function printNode(node: Node, withPrettier = false): string {
  const resultFile = createSourceFile(
    "someFileName.ts",
    "",
    ScriptTarget.Latest,
    /*setParentNodes*/ true,
    ScriptKind.TS
  );
  const printer = createPrinter({
    newLine: NewLineKind.LineFeed,
  });

  // Replace all newline placeholders with actual newlines. Do this because typescript printer ignores newlines.
  const result = printer
    .printNode(EmitHint.Unspecified, node, resultFile)
    .replaceAll("//" + NEWLINE_PLACEHOLDER, "\n");

  if (withPrettier) {
    return prettier.format(result, {
      parser: "typescript",
      semi: true,
      trailingComma: "all",
      singleQuote: true,
      printWidth: 140,
      tabWidth: 4,
    });
  } else {
    return result;
  }
}
