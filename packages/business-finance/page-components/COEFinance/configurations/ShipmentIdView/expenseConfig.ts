export const expenseConfig = {
    showHeader: true,
    headerStyles: {
        // marginBottom: "16px",
        // borderRadius: "8px",
        background: "#333",
        // marginTop: "20px",
    },
    // bodyStyles: {
    //     border: "1px solid #C7C7C7",
    //     color: " #333333",
    //     fontWeight: "400",
    //     fontSize: "12px",
    //     lineHeight: "14px",
    // },

    fields: [
        {
            key: "billNumber",
            label: "Invoice No.",
            span: 2,
            // func: 'rendernameDownloadButton',
        },
        {
            label: "Supplier Name",
            key: "organizationName",
            // func: 'renderstatusDownloadButton',
            span: 1,
        },
        {
            label: "Invoice Amount",
            key: "grandTotal",
            // func: "renderAmountWithDetails",
            span: 2,
        },
        {
            label: "Service Ops 2",
            key: "createdBy",
            // func: "renderAllAmountDetailsOnTooltip",
            span: 1.7,
        },
        {
            label: "Invoice Date",
            key: "billDate",
            func: "renderAmount",
            span: 1.5,
        },
        {
            label: "Payment Due Date",
            key: "dueDate",
            func: "renderAmount",
            span: 1.3,
        },
        {
            label: "Status",
            key: "status",
            span: 1.2,
            func: "renderTooltipOnNewRequest",
        },
        {
            label: "Remarks",
            key: "remarks",
            func: "renderButton",
            span: 1.3,
        },
    ],
};
