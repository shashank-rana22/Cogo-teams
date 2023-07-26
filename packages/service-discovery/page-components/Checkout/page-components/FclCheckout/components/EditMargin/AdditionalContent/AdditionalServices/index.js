import { Accordion } from '@cogoport/components';
import { dynamic } from '@cogoport/next';

import AdditionalServicesComponent from '../../../../../../../../common/OtherServices/AdditionalServices';
import SubsidiaryServices from '../../../../../../../../common/OtherServices/SubsidiaryServices';

import styles from './styles.module.css';

const CargoInsurance = dynamic(
	() => import(
		'../../../../../../../../common/OtherServices/CargoInsurance'
	),
	{ ssr: false },
);

const MAX_SERVICES_LENGTH = 3;

function AdditionalServices({
	setHeaderProps = () => {},
	rate = {},
	detail = {},
	primaryService = {},
	getCheckout = () => {},
	possible_subsidiary_services = [],
	loading = false,
	servicesLength = 0,
}) {
	const { services, id, ...restDetails } = detail;

	const { services:serviceRates } = rate;

	const { inco_term = '' } = primaryService;

	const finalDetails = { ...primaryService, ...restDetails, service_details: services, inco_term, checkout_id: id };

	const rateCardData = { ...rate, service_rates: serviceRates, service_type: restDetails.primary_service };

	return (
		<Accordion
			className={styles.accordion}
			type="form"
			isOpen={servicesLength < MAX_SERVICES_LENGTH}
			title="Looking for additional services?"
		>
			<AdditionalServicesComponent
				detail={finalDetails}
				rateCardData={rateCardData}
				setHeaderProps={setHeaderProps}
				refetchSearch={getCheckout}
			/>

			<CargoInsurance
				key={loading}
				data={finalDetails}
				rateCardData={rateCardData}
				refetch={getCheckout}
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
