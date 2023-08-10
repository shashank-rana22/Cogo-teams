const INCREMENT_BY_ONE = 1;
const FIND_NAME_AT_ZEROTH_INDEX = 0;
const FIND_NAME_AT_FIRST_INDEX = 1;

const findValue = (name, trade_type, detail) => {
	let value = null;

	const services = Object.values(detail?.service_details || {});

	for (let i = 0; i < services?.length; i += INCREMENT_BY_ONE) {
		const item = services?.[i] || {};

		if (value) return value;

		if (!item?.trade_type || trade_type === item?.trade_type) {
			if (trade_type === 'export') {
				value = item?.[name] || item?.[`origin_${name}`];
			}

			if (trade_type === 'import') {
				value = item?.[name] || item?.[`destination_${name}`];
			} else {
				value = item?.[name];
			}
		}
	}

	return '';
};

const getServiceValues = (service, controls, detail) => {
	let trade_type = service?.trade_type;

	if (service?.is_main) trade_type = null;

	const PREFILLED_VALUES = {};

	controls?.forEach((item) => {
		const names = item?.name?.split(`${service?.service}_`);

		const name = names?.[FIND_NAME_AT_FIRST_INDEX] || names?.[FIND_NAME_AT_ZEROTH_INDEX];

		const value = findValue(name, trade_type, detail);

		if (value) PREFILLED_VALUES[item?.name] = value;
	});

	return PREFILLED_VALUES;
};

export default getServiceValues;
