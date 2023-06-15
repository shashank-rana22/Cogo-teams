import useListRevenueDeskShowedRates from '../../../../hooks/useListRevenueDeskShowedRates';
import useListShipmentBookingConfirmationPreferences from '../../../../hooks/useListShipmentBookingConfirmationPreferences';

import Card from './Card';
import styles from './styles.module.css';

function PreferenceSetServiceData({ singleServiceData ,price,shipmentData}) {
	const { data:allPreferenceCardsData, loading } = useListShipmentBookingConfirmationPreferences({ singleServiceData,shipmentData });
    const {data,loading:show_rates}=useListRevenueDeskShowedRates({ singleServiceData,shipmentData });
	return (
		<div className={styles.container}>
			{(allPreferenceCardsData || [])?.map((item, index) => (
				<Card
					singleRateCardData={item}
					index={index}
					key={item?.priority}
                    singleServiceData={singleServiceData}
                    price={price}
				/>
			))}
		</div>
	);
}

export default PreferenceSetServiceData;
