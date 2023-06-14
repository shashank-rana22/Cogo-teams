import useListShipmentBookingConfirmationPreferences from "../../../../hooks/useListShipmentBookingConfirmationPreferences";
import Card from './Card';
import styles from './styles.module.css'
function PreferenceSetServiceData({serviceData}){
    const {data:allPreferenceCardsData,loading}=useListShipmentBookingConfirmationPreferences({serviceData});
    console.log(allPreferenceCardsData,'llllll')
return (
    <div className={styles.container}>
       	{(allPreferenceCardsData || [])?.map((item,index) => (
					<Card
                        singleRateCardData={item}
                        index={index}
					/>
				))}
    </div>
)

}

export default PreferenceSetServiceData;
