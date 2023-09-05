import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import { IcMFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

const validServiceType = ['trailer_freight_service', 'haulage_freight_service', 'ftl_freight_service'];
const displayServiceType = ['ftl_freight', 'haulage_freight'];
const SPLIT_SERVICE_TEXT = 2;

const handleModifiedOptions = ({ options: newOptions = [] }) => newOptions?.map((option) => {
	const code = option?.cogo_entity?.entity_code;
	const { country_code = '' } = ENTITY_MAPPING[code];
	const verified = option?.kyc_status === 'verified';

	return ({
		...option,
		business_name: (
			<div className={styles.async_label_container}>
				<div>
					<div>{option?.business_name}</div>
					<div className={styles.under_text}>{country_code ? `Country Code : ${country_code}` : null}</div>
				</div>
				{verified && <IcMFtick fill="#67C676" height={24} width={24} />}
			</div>
		),
	});
});

export default function getControls({
	primary_service_type = '',
	serviceObj = {},
	shipment_type,
}) {
	const { service_provider, service_type } = serviceObj || {};

	const serviceType = service_type?.split('_', SPLIT_SERVICE_TEXT).join('_');
	let services = primary_service_type !== service_type ? [shipment_type, serviceType] : serviceType;
	if (validServiceType.includes(serviceObj?.service_type)) {
		services = displayServiceType;
	}

	const controls = [
		{
			name        : 'service_provider_id',
			label      	: 'Service Provider',
			type        : 'asyncSelect',
			placeholder : 'Select Service Provider',
			asyncKey    : 'organizations',
			params      : {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
					status       : 'active',
					service      : services,
				},
			},
			size               : 'sm',
			rules              : { required: 'Service Provider is required' },
			getModifiedOptions : handleModifiedOptions,
		},
	];

	return {
		controls,
		defaultValues: {
			service_provider_id: service_provider?.id,
		},
	};
}
