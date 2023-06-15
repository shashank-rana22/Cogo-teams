import useListShipmentBookingConfirmationPreferences
	from '../../../../hooks/useListShipmentBookingConfirmationPreferences';

import Card from './Card';
import styles from './styles.module.css';

function PreferenceSetServiceData({ singleServiceData }) {
	const { data:allPreferenceCardsData, loading } = useListShipmentBookingConfirmationPreferences({ singleServiceData });
	return (
		<div className={styles.container}>
			{(allPreferenceCardsData || [])?.map((item, index) => (
				<Card
					singleRateCardData={item}
					index={index}
					key={item?.priority}
				/>
			))}
		</div>
	);
}

export default PreferenceSetServiceData;
