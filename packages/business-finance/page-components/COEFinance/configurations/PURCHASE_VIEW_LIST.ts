export const PURCHASE_VIEW_CONFIG = {
    showHeader: true,
    headerStyles: {
        marginBottom: "16px",
        borderRadius: "8px",
        background: "#333",
        marginTop: "20px",
    },
    bodyStyles: {
        border: "1px solid #C7C7C7",
        color: " #333333",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "14px",
        fontFamily: "Roboto",
        fontStyle: "normal",
    },
    fields: [
        {
            label: "Invoice No.",
            topKey: {
                key: "billNumber",
                type: "href",
            },
            bottomKey: {
                key: "billType",
                type: "tags",
            },
            func: "renderFieldPair",
            span: 1,
        },
        {
            label: "SID",
            topKey: {
                key: "jobNumber",
                type: "href",
            },
            bottomKey: {
                key: "serviceType",
            },
            func: "renderFieldPair",
            span: 1,
        },
        {
            label: "Supplier Name",
            key: "organizationName",
            func: "renderCustomer",
            span: 1,
        },
        {
            label: "Invoice Amount",
            key: "grandTotal",
            span: 1.3,
            func: "rendeFormate",
        },
        {
            label: "Last Modified Date",
            key: "createdDate",
            span: 1.2,
            func: "rendeFormate",
            sorting: { name: "modifiedDateSortType" },
        },
        {
            label: "Invoice Date",
            key: "billDate",
            func: "rendeFormate",
            span: 1.1,
            sorting: { name: "billDateSortType" },
        },
        {
            label: "Payment Due Date",
            key: "dueDate",
            func: "rendeFormate",
            span: 1.4,
            sorting: { name: "dueDateSortType" },
        },
        {
            label: "Status",
            key: "status",
            span: 1.4,
            func: "renderStatus",
        },
        {
            label: "Remarks ",
            key: "remarks",
            span: .5,
            func: "renderRemarks",
        },
        {
            label:"Urgency",
            span:.7,
            key:"urgencyTag",
            func:"renderUrgencyTag",
        },
        {
            label:'',
            key: "viewMore",
            span: 1.2,
            func: "renderViewMore",
        },
        {
            // span: .1,
            func:'renderRibbon',
        }
    ],
};
