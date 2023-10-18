import { Accordion } from '@cogoport/components';

import AdditionalServicesComponent from '../../../../../../common/OtherServices/AdditionalServices';
import SubsidiaryServices from '../../../../../../common/OtherServices/SubsidiaryServices';

import styles from './styles.module.css';

const MAX_SERVICES_LENGTH = 3;

function AdditionalServices({
	detail = {},
	primaryService = {},
	getCheckout = () => {},
	possible_subsidiary_services = [],
	servicesLength = 0,
	loading = false,
	setHeaderProps = () => {},
	rate = {},
}) {
	const { services, id, ...restDetails } = detail;

	const { services:serviceRates } = rate;

	const finalDetails = { ...primaryService, ...restDetails, service_details: services, checkout_id: id };

	const rateCardData = { ...rate, service_rates: serviceRates, service_type: restDetails.primary_service };

	return (
		<Accordion
			className={styles.accordion}
			type="form"
			isOpen={servicesLength < MAX_SERVICES_LENGTH}
			title="Looking for additional services?"
			animate
		>
			<AdditionalServicesComponent
				detail={finalDetails}
				rateCardData={rateCardData}
				setHeaderProps={setHeaderProps}
				refetchSearch={getCheckout}
				searchLoading={loading}
				source="checkout"
			/>

			<SubsidiaryServices
				possible_subsidiary_services={possible_subsidiary_services}
				data={finalDetails}
				refetch={getCheckout}
				checkout_id={id}
			/>
		</Accordion>
	);
}

export default AdditionalServices;
