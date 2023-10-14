const HAZ_CLASSES = [
	'gases-2.1',
	'gases-2.2',
	'gases-2.3',
	'flammable_liquids-3',
	'flammable_solids-4.1',
	'flammable_solids_self_heat-4.2',
	'emit_flammable_gases_with_water-4.3',
	'imo_classes-5.1',
	'toxic_substances-6.1',
	'infectious_substances-6.2',
	'radioactive_material-7',
	'corrosives-8',
	'miscellaneous_dangerous_goods-9',
];

const formatFclLocalCharge = (payload, value, charge) => {
	const tradeType = charge === 'export:fcl_freight_local' ? 'export' : 'import';
	const portId =		charge === 'export:fcl_freight_local'
		? payload?.origin_port_id
		: payload?.destination_port_id;
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
