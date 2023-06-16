import getFormatedPreferenceSetData from '../../../../helper/getFormatedPreferenceSetData';
import useListRevenueDeskShowedRates from '../../../../hooks/useListRevenueDeskShowedRates';
import useListShipmentBookingConfirmationPreferences from '../../../../hooks/useListShipmentBookingConfirmationPreferences';

import Card from '../../ServiceWiseDetails/RatesCard/Card';
import styles from './styles.module.css';

function PreferenceSetServiceData({ singleServiceData ,price,shipmentData}) {
	const { data:allPreferenceCardsData, loading } = useListShipmentBookingConfirmationPreferences({ singleServiceData,shipmentData });
    const {data,loading:show_rates}=useListRevenueDeskShowedRates({ singleServiceData,shipmentData });
	const formatedData=getFormatedPreferenceSetData(allPreferenceCardsData,singleServiceData);
	return (
		<div className={styles.container}>
			<div>Preference Set</div>
			{(formatedData?.rows || [])?.map((item, index) => (
				<Card data={item} rate_key serviceData={singleServiceData} price={price}/>
			))}
		</div>
	);
}

export default PreferenceSetServiceData;
