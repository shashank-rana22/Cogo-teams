import React from "react";
import {IcMInfo} from '@cogoport/icons-react';
import { Tooltip } from "@cogoport/components";

const headerStyle = { 
    marginBottom: '16px', 
    paddingLeft: '10px',
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
    fontFamily: "Poppins",
    fontStyle: "normal"
}

export const expenseRecurringConfig = () => {
    const renderExpensePeriod = ()=>{
        return (
            <div style={{display:'flex', alignItems:'center'}}>
            Expense Period &nbsp; 
            <Tooltip content="Start to End Date" placement="top">
                <div style={{cursor: 'pointer', paddingTop:'3px'}}> <IcMInfo/></div>
            </Tooltip>
            </div>
            )
    }
    return {
    showHeader: true,
    headerStyles       : headerStyle,
    bodyStyles         : bodyStyles,
    fields             : [
        {
            label: "Name",
            key: "name",
            span: 2,
        },
        {
            label: "Invoice Number",
            key: "invoiceNumber",
            span: 2,
        },
        {
            label: 'Category',
            key: "category",
            span: 1.2,
        },
        {
            label: "Created on",
            key: "createdOn",
            span: 2,

        },
        {
            label: renderExpensePeriod(),
            key: "expensePeriod",
            span: 2.5,

        },
        {
            label: "Recurring Amount",
            key: "recurringAmount",
            span: 2,
        },
        {
            label: "Approved By",
            key: "approvedBy",
            span: 1.5,
        },
        {
            key: "actionButton",
            span: 1.25,
        }
    ],
}
}

export const expenseNonRecurringConfig =()=>{
    return {
    showHeader: true,
    headerStyles       : headerStyle,
    bodyStyles         : bodyStyles,
    fields             : [
        {
            label: "Name",
            key: "name",
            span: 1.2,
        },
        {
            label: "Invoice Number",
            key: "invoiceNumber",
            span: 1.5,
        },
        {
            label: 'Category',
            key: "category",
            span: 1.2,
        },
        {
            label: "Invoice Amount",
            key: "invoiceAmount",
            span: 1.5,

        },
        {
            label: 'TDS',
            key: "tds",
            span: 1.5,

        },
        {
            label: "Payable",
            key: "payable",
            span: 1.5,
        },
        {
            label: "Paid",
            key: "paid",
            span: 1,
        },
        {
            label:"Invoice Dates",
            key: "invoiceDates",
            span: 1.25,
        },
        {
            label:"Approved By",
            key: "approvedBy",
            span: 1.25,
        }
    ],
}
}


