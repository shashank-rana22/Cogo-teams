const getMargins = (key, services) => {
	const { margins: dbMargins } = services[key] || {};

	const margins = (dbMargins || []).flatMap((margin) => {
		const { margin_values } = margin;
		return (margin_values || []).map((value) => ({
			...value,
			margin_type         : margin?.margin_type,
			service_provider_id : margin?.service_provider_id,
		}));
	});
	return margins;
};

const getHash = (arr) => {
	const margin_value_hash = {};
	arr.forEach((margin) => {
		margin_value_hash[margin?.code] = {
			code      : margin?.code,
			currency  : margin?.currency,
			type      : margin?.type,
			value     : margin?.value,
			min_value : margin?.min_value,
			max_value : margin?.max_value,
			unit      : margin?.unit || 'per_shipment',
		};
	});
	return margin_value_hash;
};

const getProperMargin = (arr) => arr.reduce((acc, margin) => {
	const properMargin = {
		code                : margin?.code,
		currency            : margin?.currency,
		type                : margin?.type,
		value               : margin?.value,
		min_value           : margin?.min_value,
		max_value           : margin?.max_value,
		unit                : margin?.unit || 'per_shipment',
		service_provider_id : margin?.service_provider_id || undefined,
	};
	if (!Number.isNaN(margin?.value)) {
		return acc.concat(properMargin);
	}
	return properMargin;
}, []);

const transformMargins = ({ values, services, detail }) => {
	const updatedMargins = {};
	Object.keys(values).forEach((key) => {
		const margins = getMargins(key, services);
		const service_type = services[key]?.service_type;
		const cogoMargins = getProperMargin(
			(margins || []).filter((margin) => margin.margin_type === 'cogoport'),
		);
		const supplyMargins = getProperMargin(
			(margins || []).filter((margin) => margin.margin_type === 'supply'),
		);
		const allSupplyMargins = {};
		supplyMargins.forEach((margin) => {
			const { service_provider_id, ...restMargin } = margin;
			allSupplyMargins[service_provider_id] = [
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

		const otherServicesSupply = {
			[detail?.service_details[key]?.service_provider_id]: [supplyMargin],
		};
		const supplyMarginActual =			service_type === 'fcl_freight' ? allSupplyMargins : otherServicesSupply;

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
		updatedMargins[key] = modifiedMargins;
	});

	return updatedMargins;
};

export default transformMargins;
