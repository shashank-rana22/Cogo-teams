import React  from "react";
import { Tags } from "@cogoport/components";
import {IcCFtick} from '@cogoport/icons-react';
import styles from './styles.module.css';
const SupplierDetails =()=>{
    return(
        <div className={styles.container}> 
            <h3>Supplier Details</h3>
            <div className={styles.smallHr} />
            <div className={styles.card}>
                <div className={styles.orgNameAndVerified}>
                    <div>Name - Evergreen Private Limited</div>
                    <div className={styles.tagsContainer}>
                        <Tags themeType="blue" size="md">Non - Asset</Tags>
                        <Tags themeType="blue" size="md">MSME</Tags>
                        <div className={styles.kycVerified}><IcCFtick/><div>kyc verified</div></div>
                    </div>      
                </div>
                <div className={styles.verticalSmallHr}/>
            </div>
          

        </div>
    )
}
export default SupplierDetails