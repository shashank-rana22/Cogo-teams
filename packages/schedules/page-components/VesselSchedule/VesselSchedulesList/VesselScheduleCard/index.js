import { Button } from '@cogoport/components';
import styles from './styles.module.css'
import Upper from './Upper';
import Middle from './Middle';
import Lower from './Lower';

function VesselScheduleCard ({vessel}){
    return <>
        <div className={styles.card}>
            <Upper vessel={vessel}/>
            <Middle vessel_schedule_link={vessel?.vessel_schedule_link}/>
            <Lower vessel={vessel}/>
        </div>
    </>
}
export default VesselScheduleCard;