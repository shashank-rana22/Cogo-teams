const getMargins = (key, services) => {
	const { margins: dbMargins } = services[key] || {};
	const MARGINS = [];
	(dbMargins || []).forEach((margin) => {
		const { margin_values } = margin;
		const modifiedMarginValues = (margin_values || []).map((value) => ({
			...value,
			margin_type         : margin?.margin_type,
			service_provider_id : margin?.service_provider_id,
		}));
		MARGINS.push(...modifiedMarginValues);
	});
	return MARGINS;
};

const getHash = (arr) => {
	const MARGIN_VALUE_HASH = {};
	arr.forEach((margin) => {
		MARGIN_VALUE_HASH[margin?.code] = {
			code      : margin?.code,
			currency  : margin?.currency,
			type      : margin?.type,
			value     : margin?.value,
			min_value : margin?.min_value,
			max_value : margin?.max_value,
			unit      : margin?.unit || 'per_shipment',
		};
	});
	return MARGIN_VALUE_HASH;
};

const getProperMargin = (arr) => arr.reduce((acc, margin) => {
	const properMargin = ({
		code                : margin?.code,
		currency            : margin?.currency,
		type                : margin?.type,
		value               : margin?.value,
		min_value           : margin?.min_value,
		max_value           : margin?.max_value,
		unit                : margin?.unit || 'per_shipment',
		service_provider_id : margin?.service_provider_id || undefined,
	});
	if (!Number.isNaN(margin?.value)) {
		return acc.concat(properMargin);
	}
	return properMargin;
}, []);

export const transformMargins = ({ values, services, detail }) => {
	const UPDATED_MARGINS = {};

	Object.keys(values).forEach((key) => {
		const margins = getMargins(key, services);
		const service_type = services[key]?.service_type;
		const cogoMargins = getProperMargin((margins || []).filter((margin) => margin.margin_type === 'cogoport'));
		const supplyMargins = getProperMargin((margins || []).filter((margin) => margin.margin_type === 'supply'));
		const ALL_SUPLY_MARGINS = {};

		supplyMargins.forEach((margin) => {
			const { service_provider_id, ...restMargin } = margin;
			ALL_SUPLY_MARGINS[service_provider_id] = [
				{
					service            : service_type,
					margin_values      : [restMargin],
					margin_type        : 'supply',
					margin_values_hash : getHash([restMargin]),
				},
			];
		});

		const supplyMargin = {
			service            : service_type,
			margin_values      : supplyMargins,
			margin_type        : 'supply',
			margin_values_hash : getHash(supplyMargins),
		};

		const otherServicesSupply = { [detail?.services[key]?.service_provider_id]: [supplyMargin] };
		const supplyMarginActual = service_type === 'fcl_freight' ? ALL_SUPLY_MARGINS : otherServicesSupply;

		const cogoMargin = {
			service            : service_type,
			margin_values      : getProperMargin(cogoMargins),
			margin_type        : 'cogoport',
			margin_values_hash : getHash(cogoMargins),
		};

		let demandMargins = getProperMargin(values[key]);
		demandMargins = demandMargins.filter((m) => !!m.value);
		const demandMargin = {
			service            : service_type,
			margin_values      : demandMargins,
			margin_type        : 'demand',
			margin_values_hash : getHash(demandMargins),
		};

		const modifiedMargins = {
			service_type,
			cogoport_margins : [cogoMargin],
			demand_margins   : [demandMargin],
			supply_margins   : supplyMarginActual,
		};
		UPDATED_MARGINS[key] = modifiedMargins;
	});

	return UPDATED_MARGINS;
};
