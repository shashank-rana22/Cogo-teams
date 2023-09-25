import { Accordion } from '@cogoport/components';

import SubsidiaryServices from '../../../../../../common/OtherServices/SubsidiaryServices';

import styles from './styles.module.css';

const MAX_SERVICES_LENGTH = 3;

function AdditionalServices({
	detail = {},
	primaryService = {},
	getCheckout = () => {},
	possible_subsidiary_services = [],
	servicesLength = 0,
}) {
	const { services, id, ...restDetails } = detail;

	const { inco_term = '' } = primaryService;

	const finalDetails = { ...primaryService, ...restDetails, service_details: services, inco_term, checkout_id: id };

	return (
		<Accordion
			className={styles.accordion}
			type="form"
			isOpen={servicesLength < MAX_SERVICES_LENGTH}
			title="Looking for additional services?"
			animate
		>
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
