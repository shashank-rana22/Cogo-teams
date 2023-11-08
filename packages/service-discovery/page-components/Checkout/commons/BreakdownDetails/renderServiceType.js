import { startCase } from '@cogoport/utils';

import SecureNow from '../../../../common/SecureNow';

import shippingLine from './shippingLine';

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

	const wordsToConvert = ['Fcl', 'Cfs'];

	const convertedWords = allWords.map((currWord) => {
		if (wordsToConvert.includes(currWord)) {
			return currWord.toUpperCase();
		}

		return currWord;
	});

	if (service_type === 'cargo_insurance') {
		return (
			<>
				{serviceName}
				<SecureNow />
			</>
		);
	}

	return convertedWords.join(' ');
}

export default RenderServiceType;
