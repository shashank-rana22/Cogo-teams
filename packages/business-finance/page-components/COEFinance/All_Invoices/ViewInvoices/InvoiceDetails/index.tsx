import React  from "react";
import { Button } from "@cogoport/components";
import styles from './styles.module.css';

const InvoiceDetails =()=>{
    return(
        <div className={styles.container}> 

        <h3>Invoice Details</h3>

        <div className={styles.smallHr} />
        <div className={styles.card} >
            <div className={styles.cardField}>Invoice Amount - &nbsp; <span className={styles.amount}>INR 10,02,302</span></div>
            <div className={styles.verticalSmallHr}/>
            <div className={styles.cardField}>
                Tag - &nbsp; <span className={styles.tag}>Advanced Payments - CFS security dep...</span>
                <Button themeType="sm" style={{marginLeft:'10px'}}>Remove Tag</Button>
                </div>
            <div className={styles.verticalSmallHr}/>
            <div className={styles.cardField}>Remark - The remarks from payables/S02</div>
        </div>
        </div>
    )
}

export default InvoiceDetails