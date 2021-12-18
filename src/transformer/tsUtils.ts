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
} from 'typescript';

export function equals(first: string | TokenInfo[], second: string | TokenInfo[]): boolean {
    const firstTokens = typeof first == 'string' ? convertToTokens(first) : first;
    const secondTokens = typeof second == 'string' ? convertToTokens(second) : second;

    return tokensEquals(firstTokens, secondTokens);
}

function tokensEquals(first: TokenInfo[], second: TokenInfo[]) {
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

function convertToTokens(text: string) {
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

export function printNode(node: Node) {
    const resultFile = createSourceFile('someFileName.ts', '', ScriptTarget.Latest, /*setParentNodes*/ false, ScriptKind.TS);
    const printer = createPrinter({
        newLine: NewLineKind.LineFeed,
    });
    const result = printer.printNode(EmitHint.Unspecified, node, resultFile);

    return result;
}
