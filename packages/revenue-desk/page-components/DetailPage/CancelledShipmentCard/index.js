import { IcMInfo } from '@cogoport/icons-react';
import styles from './styles.module.css'
function CancelledShipmentCard({itemData}){
    return(
        <div className={styles.container}>
            <div className={styles.text1}>
                <IcMInfo color='#EE3425'/> Your Shipment Is Cancelled.
            </div>
            <div className={styles.text2}>
                Reason:
            </div>
        </div>
    )
}
export default CancelledShipmentCard;