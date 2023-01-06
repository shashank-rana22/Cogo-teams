import styles from "styles.module.css";
// interface ControlProps {
//     pending_approval: string;
//     setPending_approval: Function;
//     jobs: string;
//     setJobs: Function;
// }

const controls = [
    // {
    //     name: "pending_approval",
    //     type: "segmented",
    //     theme: "admin",
    //     // activeTab: pending_approval,
    //     // setActiveTab: setPending_approval,
    //     isClearable: true,
    //     span: 1,
    //     background: "#FFFAEB",
    //     color: "#ED3726",
    //     options: [
    //         {
    //             label: "ALL",
    //             value: "all",
    //         },
    //         {
    //             label: "Pending Approval",
    //             value: "pendingApproval",
    //         },
    //         {
    //             label: "Not Pending Approval",
    //             value: "notPendingApproval",
    //         },
    //     ],
    // },
    // {
    //     name: "jobs",
    //     type: "segmented",
    //     theme: "admin",
    //     isClearable: true,
    //     // activeTab: jobs,
    //     // setActiveTab: setJobs,
    //     span: 1,
    //     background: "#FFFAEB",
    //     color: "#ED3726",

    //     options: [
    //         {
    //             label: "ALL",
    //             value: "all",
    //         },
    //         {
    //             label: "Open Jobs",
    //             value: "openJobs",
    //         },
    //         {
    //             label: "Operationally Closed",
    //             value: "operationallyClosed",
    //         },
    //         {
    //             label: "Closed Jobs",
    //             value: "closedJobs",
    //         },
    //     ],
    // },
    {
        name: "shipment_type",
        type: "select",
        placeholder: "Shipment Type",
        theme: "admin",
        span: 1,
        isClearable: true,
        multiple: true,
        defaultOptions: false,
        options: [
            { label: "FCL Freight", value: "fcl_freight" },
            { label: "LCL Freight", value: "lcl_freight" },
            { label: "Air Freight", value: "air_freight" },
            { label: "FTL Freight", value: "ftl_freight" },
            { label: "LTL Freight", value: "ltl_freight" },
            { label: "Haulage Freight", value: "haulage_freight" },
            { label: "Trailer Freight", value: "trailer_freight" },
            { label: "FCL Customs", value: "fcl_customs" },
            { label: "LCL Customs", value: "lcl_customs" },
            { label: "Air Customs", value: "air_customs" },
        ],
    },
    {
        name: "urgency_tag",
        type: "select",
        placeholder: "Select Urgency",
        theme: "admin",
        span: 1,
        isClearable: true,
        options: [
            { label: "Advanced PDA Accounts", value: "pda" },
            { label: "Advanced CFS security deposit", value: "cfs" },
            { label: "Surrender (Telex) BL Payments", value: "telex" },
            { label: "Airlines DO Payments", value: "air_do" },
            { label: "BL Amendment Payments", value: "bl_amnd" },
            { label: "LDC/LBC Payments", value: "ldc_lbc" },
            { label: "Cancel Charges", value: "cxl" },
            { label: "Detention Payments", value: "dtn" },
        ],
    },
    {
        name: "serial_id",
        type: "input",
        theme: "admin",
        span: 3.8,
        isClearable: true,
        placeholder: "Search by Shipment ID",
    },
];

export default controls;
