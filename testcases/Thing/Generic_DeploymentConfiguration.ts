@exportName('Generic_DeploymentConfiguration')
@ThingDefinition
@config({
    GS3Configuration: { baseUrl: 'https://example.com/', apikey: 'example password' },
    WindchillConfiguration: {
        baseUrl: 'https://example.com',
        password: 'example password',
        ignoreSslErrors: true,
        issueContainer: "Containers('OR:wt.pdmlink.PDMLinkProduct:XXXX')",
        username: 'TWXWCUser',
        issueContainerName: 'CRP 1 Product',
    },
    ObjectDefinition: {
        SCAR_Thing: 'GenericData_SCAR_ActionRequest',
        CAR_Thing: 'GenericData_CAR_ActionRequest',
        TopLevelActionPlanType: 'PTC.ChangeMgmt.ActionPlan',
        TopLevelIssueType_Thing: 'GenericData_PTC.ChangeMgmt.Issue_Issue',
        TopLevelActionRequestType: 'PTC.ChangeMgmt.ActionRequest',
    },
    FieldMappings: [
        {
            WindchillPropertyName: 'CLOSURENOTES',
            Kind: '',
            InternalName: 'ClosureNotes',
            SourcedFromTopLevelIssue: false,
            LegalValues: {
                rows: [],
                dataShape: {
                    fieldDefinitions: {
                        display: { name: 'display', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 2 },
                        value: { name: 'value', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 1 },
                    },
                },
            },
        },
        {
            WindchillPropertyName: 'IssuePriority',
            Kind: '',
            InternalName: 'IssuePriority',
            SourcedFromTopLevelIssue: true,
            LegalValues: {
                rows: [],
                dataShape: {
                    fieldDefinitions: {
                        display: { name: 'display', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 2 },
                        value: { name: 'value', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 1 },
                    },
                },
            },
        },
        {
            WindchillPropertyName: 'State',
            Kind: '',
            InternalName: 'State',
            SourcedFromTopLevelIssue: true,
            LegalValues: {
                rows: [],
                dataShape: {
                    fieldDefinitions: {
                        display: { name: 'display', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 2 },
                        value: { name: 'value', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 1 },
                    },
                },
            },
        },
        {
            WindchillPropertyName: 'Region',
            Kind: '',
            InternalName: 'Region',
            SourcedFromTopLevelIssue: true,
            LegalValues: {
                rows: [],
                dataShape: {
                    fieldDefinitions: {
                        display: { name: 'display', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 2 },
                        value: { name: 'value', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 1 },
                    },
                },
            },
        },
        {
            WindchillPropertyName: 'MANUFACTURINGLOCATION',
            Kind: '',
            InternalName: 'MfgSite',
            SourcedFromTopLevelIssue: true,
            LegalValues: {
                rows: [],
                dataShape: {
                    fieldDefinitions: {
                        display: { name: 'display', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 2 },
                        value: { name: 'value', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 1 },
                    },
                },
            },
        },
        {
            WindchillPropertyName: 'ProductGroup',
            Kind: '',
            InternalName: 'Platform',
            SourcedFromTopLevelIssue: true,
            LegalValues: {
                rows: [],
                dataShape: {
                    fieldDefinitions: {
                        display: { name: 'display', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 2 },
                        value: { name: 'value', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 1 },
                    },
                },
            },
        },
        {
            WindchillPropertyName: '@odata.type',
            Kind: 'STRING',
            InternalName: 'ObjectOdataType',
            SourcedFromTopLevelIssue: false,
            LegalValues: {
                rows: [],
                dataShape: {
                    fieldDefinitions: {
                        display: { name: 'display', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 2 },
                        value: { name: 'value', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 1 },
                    },
                },
            },
        },
        {
            WindchillPropertyName: 'Assignee',
            Kind: 'OBJECTREF',
            InternalName: 'Assignee',
            SourcedFromTopLevelIssue: false,
            LegalValues: {
                rows: [],
                dataShape: {
                    fieldDefinitions: {
                        display: { name: 'display', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 2 },
                        value: { name: 'value', aspects: { isPrimaryKey: false }, description: '', baseType: 'STRING', ordinal: 1 },
                    },
                },
            },
        },
    ],
})
class Generic_DeploymentConfiguration extends Generic_DeploymentDefinition_TT {}
