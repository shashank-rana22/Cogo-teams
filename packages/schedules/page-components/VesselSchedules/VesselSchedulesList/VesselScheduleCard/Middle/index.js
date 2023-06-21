import styles from './styles.module.css'
import { format } from '@cogoport/utils';

function Middle({vessel_schedule_link}){
    console.log(vessel_schedule_link)
return <>
            <div className={styles.middle}>
                <div className={styles.port}>
                    <div className={styles.port_name}>
                        {vessel_schedule_link?.[0]?.display_name}
                    </div>
                    <div className={styles.date}>
                        {format(vessel_schedule_link?.[0]?.etd,'dd MMM yyyy hh:mm')}
                    </div>
                    <div className={styles.voyage_number}>
                    {
                            vessel_schedule_link?.[0].departure_voyage_number &&
                            (<>Voyage No : {vessel_schedule_link?.[0].departure_voyage_number}</>)
                    }

                    </div>
                </div>       
                <div className={styles.hr_line_box}>
                    <hr width="200px" className={styles.hr_line}/>
                        <div className={styles.port_count}>
                            +{vessel_schedule_link?.length-2} Port
                        </div>
                    <hr width="200px" className={styles.hr_line}/>
                </div>             
                <div className={styles.port}>
                    <div className={styles.port_name}>
                    {vessel_schedule_link?.[vessel_schedule_link?.length-1]?.display_name}
                    </div>
                    <div className={styles.date}>
                    {format(vessel_schedule_link?.[vessel_schedule_link?.length-1]?.eta,'dd MMM yyyy hh:mm')}
                    </div>
                    <div className={styles.voyage_number}>
                        {
                            vessel_schedule_link?.[vessel_schedule_link?.length-1].arrival_voyage_number &&
                            (<>Voyage No : {vessel_schedule_link?.[vessel_schedule_link?.length-1].arrival_voyage_number}</>)
                        }
                    </div>
                </div>                    
            </div>

    </>
}
export default Middle;