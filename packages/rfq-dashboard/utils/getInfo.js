import { startCase, upperCase } from '@cogoport/utils';

const dataFormat = (item, data) => {
	if (item?.value === 'container_size') {
		return {
			valueKey  : item?.key,
			valueText : `${data[item.value]} FT`,
			value     : item.value,
		};
	}
	if (item?.value === 'containers_count') {
		return {
			valueKey  : item?.key,
			valueText : `${data[item.value]} Container`,
			value     : item.value,
		};
	}
	if (item?.value === 'inco_term') {
		return {
			valueKey  : item?.key,
			valueText : `${upperCase(data[item.value])}`,
			value     : item.value,
		};
	}
	if (item?.value === 'volume') {
		return {
			valueKey  : item?.key,
			valueText : `${data[item.value]} cbm`,
			value     : item.value,
		};
	}
	if (item?.value === 'weight') {
		return {
			valueKey  : item?.key,
			valueText : `${data[item.value]} kg`,
			value     : item.value,
		};
	}
	if (item?.value === 'cargo_weight_per_container') {
		return {
			valueKey  : item?.key,
			valueText : `${data[item.value]} MT`,
			value     : item.value,
		};
	}
	if (item?.value === 'packages_count') {
		return {
			valueKey  : item?.key,
			valueText : `${data[item.value]} pkg`,
			value     : item.value,
		};
	}
	return {
		valueKey  : item?.key,
		valueText : startCase(data[item?.value]),
		value     : item?.value,
	};
};

const getInfo = (data = {}) => {
	const FINAL_DATA = [];
	const dataObject = [
		{ key: 'Container', value: 'container_size' },
		{ key: 'Container Count', value: 'containers_count' },
		{ key: 'Container Type', value: 'container_type' },
		{ key: 'Commodity', value: 'commodity' },
		{ key: 'Inco Term', value: 'inco_term' },
		{ key: 'Trucks Count', value: 'trucks_count' },
		{ key: 'Trade Type', value: 'trade_type' },
		{ key: 'No of Packages', value: 'packages_count' },
		{ key: 'Volume', value: 'volume' },
		{ key: 'Total Weight', value: 'weight' },
		{ key: 'Haulage Type', value: 'haulage_type' },
		{ key: 'Transport Mode', value: 'transport_mode' },
		{ key: 'Cargo Wt Per Container', value: 'cargo_weight_per_container' },
	];

	(dataObject || []).forEach((item) => {
		if (data && data[item.value]) {
			FINAL_DATA.push(dataFormat(item, data));
		}
	});

	return FINAL_DATA;
};

export default getInfo;
