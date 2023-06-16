import getFormatedNotPreferenceData from '../../../../helper/getFormatedNotPreferenceData';
import getFormatedPreferenceSetData from '../../../../helper/getFormatedPreferenceSetData';
import useListRevenueDeskShowedRates from '../../../../hooks/useListRevenueDeskShowedRates';
import useListShipmentBookingConfirmationPreferences from '../../../../hooks/useListShipmentBookingConfirmationPreferences';
import Card from '../RatesCard/Card';

import styles from './styles.module.css';

function PreferenceSetServiceData({ singleServiceData, price, shipmentData }) {
	const { data:allPreferenceCardsData, loading } = useListShipmentBookingConfirmationPreferences({
		singleServiceData,
		shipmentData,
	});
	const { data:ratesDataNotPrefered, loading:show_rates_loading } = useListRevenueDeskShowedRates({
		singleServiceData,
		shipmentData,
	});
	const formatedData = getFormatedPreferenceSetData({ allPreferenceCardsData });
	const formaredAvailableRatesData = getFormatedNotPreferenceData({ ratesDataNotPrefered });
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Preference Set</div>
			{(formatedData?.rows || [])?.map((item) => (
				<Card data={item} rate_key serviceData={singleServiceData} price={price} priority_key key={item?.id} />
			))}
			<div className={styles.heading}>Available Rates At that Time of Setting Preference</div>
			{(formaredAvailableRatesData?.rows || [])?.map((item) => (
				<Card data={item} rate_key serviceData={singleServiceData} price={price} key={item?.id}/>
			))}
		</div>
	);
}

export default PreferenceSetServiceData;
