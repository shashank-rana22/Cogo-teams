import getFormatedNotPreferenceData from '../../../../helpers/getFormatedNotPreferenceData';
import getFormatedPreferenceSetData from '../../../../helpers/getFormatedPreferenceSetData';
import useListRevenueDeskAvailableRates from '../../../../hooks/useListRevenueDeskAvailableRates';
import useListShipmentBookingConfirmationPreferences from
	'../../../../hooks/useListShipmentBookingConfirmationPreferences';

import RatesCards from './RateCards';
import styles from './styles.module.css';

function PreferenceSetServiceData({ singleServiceData, shipmentData, isPreferenceSet }) {
	const { data:allPreferenceCardsData, loading } = useListShipmentBookingConfirmationPreferences({
		singleServiceData,
		shipmentData,
	});
	const { data:ratesDataNotPrefered, loading:show_rates_loading } = useListRevenueDeskAvailableRates({
		singleServiceData,
		shipmentData,
		isPreferenceSet,
	});
	const formatedData = getFormatedPreferenceSetData({ allPreferenceCardsData });
	const formaredAvailableRatesData = getFormatedNotPreferenceData({ ratesDataNotPrefered, singleServiceData });
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>Preference Set</div>
				<RatesCards
					data={formatedData}
					singleServiceData={singleServiceData}
					rate_key="preferences_rate"
					loading={loading}
				/>
			</div>
			<div>
				<div className={styles.heading}>Available Rates At that Time of Setting Preference</div>
				<RatesCards
					data={formaredAvailableRatesData}
					singleServiceData={singleServiceData}
					rate_key="not_preferences_rate"
					loading={show_rates_loading}
				/>
			</div>
		</div>
	);
}

export default PreferenceSetServiceData;
