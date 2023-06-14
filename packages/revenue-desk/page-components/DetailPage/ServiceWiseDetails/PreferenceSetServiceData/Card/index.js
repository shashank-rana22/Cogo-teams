import { Pill } from '@cogoport/components';
import styles from './styles.module.css'
import { startCase } from '@cogoport/utils';

function Card({singleRateCardData,index,singleServiceData,price}){
    const total_buy_price=Number(singleServiceData?.chargeable_weight)*Number(singleRateCardData?.buy_rate_preferences?.buy_price);
    let profitability = 0;
	if (total_buy_price !== 0) {
		profitability = (Number(price?.split(' ')?.[1]) - Number(total_buy_price))
		/ Number(total_buy_price);
	}
    return (
       <div className={styles.container}>
            <div className={styles.left_section}>
                {index+1}
            </div>
            <div className={styles.right_section}>
                <div className={styles.upper_section}>
                    <div className={styles.upper_left_section}>
                        <div>
                            {singleRateCardData?.data?.[0]?.service_provider?.business_name}
                        </div>
                        <div>
                            {singleRateCardData?.data?.[0]?.airline ? singleRateCardData?.data?.[0]?.airline?.business_name :null}
                        </div>
                    </div>
                    <div className={styles.upper_right_section}>
                        <Pill size="md" color="#F9F9F9">{startCase(singleRateCardData?.source)}</Pill>
                    </div>
                </div>
                <div className={styles.lower_section}>
                        <div className={styles.first_section}>
                            {
                                singleRateCardData?.buy_rate_preferences?.active_bookings ? (
                                    <div className={styles.active_booking_label}>
                                       Active Bookings : {singleRateCardData?.buy_rate_preferences?.active_bookings }
                                     </div>
                                ) : null
                            }
                        </div>
                        <div className={styles.second_section}>
                            <div>
                                <div className={styles.text}>Allocation Ratio</div>
                                <div>{singleRateCardData?.buy_rate_preferences?.allocation_ratio ? 
                                singleRateCardData?.buy_rate_preferences?.allocation_ratio:0}%</div>
                            </div>
                            <div>
                                <div className={styles.text}>Fulfillment Ratio</div>
                                <div>{singleRateCardData?.buy_rate_preferences?.fulfillment_ratio ? 
                                singleRateCardData?.buy_rate_preferences?.fulfillment_ratio:0}%</div>
                            </div>
                        </div>
                        <div className={styles.third_section}>
                            <div className={styles.price_text}>
                                Buy Price : {singleRateCardData?.buy_rate_preferences?.buy_price}
                            </div>
                            {
                                singleRateCardData?.buy_rate_preferences?.origin_local_buy_price?      <div className={styles.price_text}>
                                Origin Local Price :{singleRateCardData?.buy_rate_preferences?.origin_local_buy_price}
                                </div>:null
                            }
                            {
                                singleRateCardData?.buy_rate_preferences?.destination_local_buy_price ?  
                                <div className={styles.price_text}>
                                Destination Local Price :{singleRateCardData?.buy_rate_preferences?.destination_local_buy_price}
                                </div>:null
                            }
                           
                        </div>
                        <div className={styles.forth_section}>
                            <div>Chargeable Weight : {singleServiceData?.chargeable_weight}</div>
                            <div>Total Buy Price :{total_buy_price}</div>
                            <div>Probabilty:{Number(profitability).toFixed(4)}</div>
                        </div>
                </div>
            </div>
       </div>
    )
}

export default Card;