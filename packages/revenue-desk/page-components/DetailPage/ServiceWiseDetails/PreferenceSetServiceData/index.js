import useListShipmentBookingConfirmationPreferences from "../../../../hooks/useListShipmentBookingConfirmationPreferences";
import Card from './Card';
import styles from './styles.module.css'
function PreferenceSetServiceData({singleServiceData,price}){
    const {data:allPreferenceCardsData,loading}=useListShipmentBookingConfirmationPreferences({serviceData:singleServiceData});
return (
    <div className={styles.container}>
       	{(allPreferenceCardsData || [])?.map((item,index) => (
					<Card
                        singleRateCardData={item}
                        index={index}
                        singleServiceData={singleServiceData}
                        price={price}
					/>
		))}
    </div>
)

}

export default PreferenceSetServiceData;
