import { IcMFtick } from "@cogoport/icons-react";
import React, { useState } from "react";
import styles  from './styles.module.css'

interface TimeLine {
    itemCheck?:boolean
}
const TimeLineItemCheck = ({itemCheck}:TimeLine) => {
   
    return (
    <div>
        <div className={styles.container}>
            
            {itemCheck ?  <IcMFtick  color="red" height={40} width={40}/> : <div className={styles.dull}/>}
            
            <div className={styles.line}/>
            {itemCheck ?  <IcMFtick  color="red" height={40} width={40}/> : <div className={styles.dull}/>}
        </div>
        <div className={styles.container}>
            <div className={styles.textContainer}>Invoice Details</div>
            <div>Line item check</div>
        </div>
    </div>
        
    )

}
export default TimeLineItemCheck