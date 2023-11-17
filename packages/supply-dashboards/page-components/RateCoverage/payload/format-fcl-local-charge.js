import { HAZ_CLASSES } from '@cogoport/globalization/constants/commodities';

const formatFclLocalCharge = (payload, value, charge) => {
	const tradeType = charge === 'export:fcl_freight_local' ? 'export' : 'import';
	const portId = charge === 'export:fcl_freight_local'
		? payload?.origin_location_id
		: payload?.destination_location_id;
	let main_port_id;
	if (charge === 'export:fcl_freight_local' && payload?.origin_main_port_id) {
		main_port_id = payload?.origin_main_port_id || undefined;
	}
	if (
		charge === 'import:fcl_freight_local'
		&& payload?.destination_main_port_id
	) {
		main_port_id = payload?.destination_main_port_id || undefined;
	}

	const payloadRequired = {
		...payload,
		commodity: HAZ_CLASSES.includes(payload.commodity)
			? payload.commodity || undefined
			: undefined,
		port_id             : portId,
		main_port_id,
		trade_type          : tradeType,
		line_items          : undefined,
		origin_port_id      : undefined,
		destination_port_id : undefined,
		validity_start      : undefined,
		validity_end        : undefined,
		weight_slabs        : undefined,
		stacking_type       : undefined,
		shipment_type       : undefined,
		data                : {
			line_items: value.line_items.map((charges) => ({
				...charges,
				price  : Number(charges.price),
				remark : charges?.remark ? [charges.remark] : undefined,
			})),
			detention: {
				free_limit : value?.detention_free_days,
				slabs      : value.detention_days.map((charges) => ({
					...charges,
					price  : Number(charges.price),
					remark : charges?.remark ? [charges.remark] : undefined,
				})),
			},
			demurrage: {
				free_limit : value?.detention_free_days,
				slabs      : value.demurrage_days.map((charges) => ({
					...charges,
					price  : Number(charges.price),
					remark : charges?.remark ? [charges.remark] : undefined,
				})),
			},
		},
	};
	return payloadRequired;
};

export default formatFclLocalCharge;
