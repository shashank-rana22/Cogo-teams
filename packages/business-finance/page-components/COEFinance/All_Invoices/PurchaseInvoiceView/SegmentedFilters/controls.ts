import styles from "./styles.module.css";

const controls = [
    {
        name: "urgency_tag",
        type: "select",
        placeholder: "Select Urgency",
        theme: "admin",
        span: 6,
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
];
export default controls;


