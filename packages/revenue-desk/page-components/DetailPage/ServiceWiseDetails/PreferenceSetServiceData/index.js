import getFormatedNotPreferenceData from '../../../../helper/getFormatedNotPreferenceData';
import getFormatedPreferenceSetData from '../../../../helper/getFormatedPreferenceSetData';
import useListRevenueDeskShowedRates from '../../../../hooks/useListRevenueDeskShowedRates';
import useListShipmentBookingConfirmationPreferences from
	'../../../../hooks/useListShipmentBookingConfirmationPreferences';

import RatesCards from './RateCards';
import styles from './styles.module.css';

function PreferenceSetServiceData({ singleServiceData, shipmentData }) {
	const { data:allPreferenceCardsData, loading } = useListShipmentBookingConfirmationPreferences({
		singleServiceData,
		shipmentData,
	});
	const { data:ratesDataNotPrefered, loading:show_rates_loading } = useListRevenueDeskShowedRates({
		singleServiceData,
		shipmentData,
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
