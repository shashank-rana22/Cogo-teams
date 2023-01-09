import styles from "styles.module.css";

const controls = [
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
