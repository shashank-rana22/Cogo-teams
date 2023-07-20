import { Accordion } from '@cogoport/components';
import { dynamic } from '@cogoport/next';

import SubsidiaryServices from '../../../../../../../../common/AdditionalServices/SubsidiaryServices';
import AdditionalServicesComponent from '../../../../../../../SearchResults/components/AdditionalServices';

import styles from './styles.module.css';

const CargoInsuranceContainer = dynamic(
	() => import(
		'../../../../../../../../common/AdditionalServices/CargoInsuranceContainer'
	),
	{ ssr: false },
);

function AdditionalServices({
	setHeaderProps = () => {},
	rate = {},
	detail = {},
	primaryService = {},
	getCheckout = () => {},
	possible_subsidiary_services = [],
	loading = false,
}) {
	const { services, id, ...restDetails } = detail;

	const { services:serviceRates } = rate;

	const { inco_term = '' } = primaryService;

	const finalDetails = { ...primaryService, ...restDetails, service_details: services, inco_term, checkout_id: id };

	const rateCardData = { ...rate, service_rates: serviceRates, service_type: restDetails.primary_service };

	return (
		<Accordion className={styles.accordion} type="form" title="Looking for additional services?">
			<AdditionalServicesComponent
				detail={finalDetails}
				rateCardData={rateCardData}
				setHeaderProps={setHeaderProps}
				refetchSearch={getCheckout}
			/>

			<CargoInsuranceContainer
				key={loading}
				data={finalDetails}
				refetch={getCheckout}
			/>

			<SubsidiaryServices
				possible_subsidiary_services={possible_subsidiary_services}
				data={detail}
				refetch={getCheckout}
			/>
		</Accordion>
	);
}

export default AdditionalServices;
