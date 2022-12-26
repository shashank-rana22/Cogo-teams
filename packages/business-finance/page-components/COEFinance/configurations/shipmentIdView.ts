export const ShipmentIdViewConfig = {
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
            key: "bankAccounts",
            label: "Invoice No.",
            span: 2,
            // func: 'rendernameDownloadButton',
        },
        {
            label: "Supplier Name",
            key: "currency",
            // func: 'renderstatusDownloadButton',
            span: 1,
        },
        {
            label: "Invoice Amount",
            key: "allocatedFunds",
            func: "renderAmountWithDetails",
            span: 2,
        },
        {
            label: "Service Ops 2",
            key: "createdBy",
            func: "renderAllAmountDetailsOnTooltip",
            span: 1.7,
        },
        {
            label: "Invoice Date",
            key: "utilizedAmount",
            func: "renderAmount",
            span: 1.5,
        },
        {
            label: "Payment Due Date",
            key: "balanceAmount",
            func: "renderAmount",
            span: 1.3,
        },
        {
            label: "Status",
            key: "request",
            span: 1.2,
            func: "renderTooltipOnNewRequest",
        },
        {
            label: "Remarks",
            key: "button",
            func: "renderButton",
            span: 1.3,
        },
    ],
};
