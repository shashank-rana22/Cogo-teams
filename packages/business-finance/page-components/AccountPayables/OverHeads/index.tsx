import React, {useState} from "react";
import { Button } from "@cogoport/components";
import VenderComponent from "./Vendors";
import ExpenseComponent from "./Expenses";
import ReportComponent from "./Reports";


function OverHead () {
    const [tabValue, setTabValue] = useState('VENDORS');
    const overHeadMapping = {
        "VENDORS": {
            "component": <VenderComponent />
        },
        "EXPENSES": {
            "component": <ExpenseComponent />
        },
        "REPORTS": {
            "component": <ReportComponent />
        }
    }

    const renderButtons = () => {
        return (
            <div style={{
                borderRadius   : '10px',
                display        : 'flex',
                justifyContent : 'flex-start',
                marginBottom   : '20px',
                marginTop   : '16px',
                gap         : '10px',
            }}
            >
            {
                Object.keys(overHeadMapping).map ((key) => {
                    return (<Button size="lg" themeType="primary" onClick={() => setTabValue(key)}>{key}</Button>)
                })
            }
            </div>
        )
    }

    return (
    <div>
        {renderButtons()}
        <div>
            {overHeadMapping?.[tabValue]?.component}
        </div>

    </div>
    )
}


export default OverHead;
