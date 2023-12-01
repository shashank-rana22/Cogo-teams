import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import SecureNow from '../../../../common/SecureNow';

import shippingLine from './shippingLine';
import styles from './styles.module.css';

const getServiceType = (item, service_details) => {
	const serviceName = item.service_name
		? item?.service_name
		: item.service_type;

	if (item.service_type === 'fcl_freight') {
		return shippingLine(item?.service_type, service_details);
	}
	if (item.service_type === 'air_freight') {
		return shippingLine(item?.service_type, service_details);
	}
	if (item.service_type === 'cargo_insurance') {
		return startCase(serviceName);
	}
	if (item?.trade_type) {
		if (item?.trade_type === 'export') {
			return startCase(`origin_${serviceName}`);
		}
		if (item?.trade_type === 'import') {
			return startCase(`destination_${serviceName}`);
		}
	}
	if (
		service_details?.service_type === 'air_freight_local'
		&& service_details?.trade_type === 'domestic'
	) {
		return `Terminal ${startCase(service_details?.terminal_charge_type)}`;
	}

	return startCase(serviceName || '');
};

function RenderServiceType({ item, service_details }) {
	const { service_type } = item || {};
	const serviceName = getServiceType(item, service_details);

	const allWords = serviceName.split(' ');

	const wordsToConvert = ['Fcl', 'Cfs', 'Ftl', 'Ltl', 'Lcl'];

	const convertedWords = allWords.map((currWord) => {
		if (wordsToConvert.includes(currWord)) {
			return currWord.toUpperCase();
		}

		return currWord;
	});

	if (service_type === 'cargo_insurance') {
		return (
			<div className={styles.cargo_insurance_container}>
				<Tooltip
					placement="top"
					interactive
					maxWidth={400}
					content="The payment link for Cargo Insurance will be sent separately once our CCS agent
					collects the required documents from the customer.
					Insurance policy will be generated only after the payment is successful."
				>
					<IcMInfo width={16} height={16} style={{ marginTop: '4px' }} />
				</Tooltip>

				<div className={styles.cargo_service_container}>
					{serviceName}
					<SecureNow />
				</div>
			</div>
		);
	}

	return convertedWords.join(' ');
}

export default RenderServiceType;
