import { IcMInfo } from '@cogoport/icons-react';
import styles from './styles.module.css'
import { startCase } from '@cogoport/utils';
function CancelledShipmentCard({itemData}){
    return(
        <div className={styles.container}>
            <div className={styles.text1}>
                <IcMInfo color='#EE3425'/> Your Shipment Is Cancelled.
            </div>
            <div className={styles.text2}>
                Reason: {startCase(itemData?.cancellation_reason)}
            </div>
            {
                itemData?.cancellation_subreason ? <div className={styles.text2}>
                Sub-Reason: {startCase(itemData?.cancellation_subreason)}
                </div>:null
            }
            
        </div>
    )
}
export default CancelledShipmentCard;