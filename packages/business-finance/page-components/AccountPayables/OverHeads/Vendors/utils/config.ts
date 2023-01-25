import React from "react";

const headerStyle = { 
    marginBottom: '16px', 
    borderRadius: '8px', 
    background: '#333',
    marginTop:'20px',
    fontSize: '14px', 
    fontStyle: "normal", 
    fontFamily: 'Poppins' 
}

const bodyStyles = {
    border: "1px solid #C7C7C7",
    color:' #333333',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '14px',
    fontFamily: "Roboto",
    fontStyle: "normal"
}

const OVER_HEAD_CONFIG = {
    showHeader: true,
    headerStyles       : headerStyle,
    bodyStyles         : bodyStyles,
    fields             : [
        {
            label: "Vendor Serial Id",
            key: "vendorSerialId",
            span: 1.2,
        },
        {
            label: "KYC STATUS",
            key: "kycStatus",
            span: .7,
            func: "renderKYCStatus"
        },
        {
            label: 'NAME',
            key: "name",
            span: 1.2,
        },
        {
            label: "PAN",
            key: "pan",
            span: 1,

        },
        {
            label: "CATEGORY",
            key: "category",
            span: 1,

        },
        {
            label: "PAYMENTS",
            key: "payments",
            span: 1,
            sorting: { name: "payments" },
            func: 'renderPayments'

        },
        {
            label: "OPEN INVOICES",
            key: "openInvoices",
            span: 1,
            sorting: { name: "invoicesCount" },
            func: 'renderInvoice'
        },
        {
            label: "CREATED AT",
            key: "createdDate",
            span: 1.25,
            func: "rendeFormate",
            sorting: { name: "modifiedDateSortType" },
        },
        {
            label: "",
            key: "viewMoreButton",
            span: 1.25,
            func: "renderViewMoreButton"
        }
    ],
};

export default OVER_HEAD_CONFIG

