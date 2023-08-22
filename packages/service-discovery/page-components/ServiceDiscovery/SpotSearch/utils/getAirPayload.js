import getIncoterm from './getIncoterm';

const LB_TO_KG = 2.205;
const CFT_TO_CBM = 35.315;
const CC_TO_CBM = 1000000;
const INCHCUBE_TO_CBM = 61020;
const INCH_TO_CM = 2.54;

const getAirPayload = (values, origin, destination) => {
	const {
		cargo_clearance_date,
		commodity = '',
		load_selection_type = '',
	} = values;

	let totalWeight = 0;
	let totalQuantity = 0;
	let totalVolume = 0;
	let packages = [];

	if (load_selection_type === 'cargo_gross') {
		const {
			total_weight,
			total_quantity,
			total_volume,
			volume_unit,
			weight_unit,
			stackability,
			package_type,
		} = values;

		totalWeight = Number(total_weight);
		totalQuantity = Number(total_quantity);
		totalVolume = Number(total_volume);

		if (volume_unit === 'cc') {
			totalVolume = Number(total_volume) / CC_TO_CBM;
			totalVolume = Math.round(totalVolume * 1000) / 1000;
		} else if (volume_unit === 'cft') {
			totalVolume = Number(total_volume) / CFT_TO_CBM;
			totalVolume = Math.round(totalVolume * 1000) / 1000;
		}

		if (weight_unit === 'lb') {
			totalWeight = Number(total_weight) / LB_TO_KG;
			totalWeight = Math.round(totalWeight * 1000) / 1000;
		}

		packages = [
			{
				packages_count : Number(total_quantity),
				packing_type   : package_type,
				handling_type  : stackability || 'non_stackable',
			},
		];
	} else {
		const { packages:packagesData = [] } = values;

		(packagesData || []).forEach((item) => {
			let { length, width, height, weight } = item;
			totalQuantity += Number(item.packages_count);

			if (item.weight_unit === 'kg_unit') {
				totalWeight += Number(item.packages_count) * Number(item.weight);
			}
			if (item.weight_unit === 'kg_total') {
				totalWeight += Number(item.weight);
				weight /= Number(item?.packages_count);
			}
			if (item.weight_unit === 'lb_unit') {
				totalWeight += (Number(item.packages_count) * Number(item.weight)) / LB_TO_KG;
				weight /= LB_TO_KG;
				weight = Math.round(weight * 1000000) / 1000000;
			}
			if (item.weight_unit === 'lb_total') {
				totalWeight += Number(item.weight) / LB_TO_KG;
				weight /= LB_TO_KG;
				weight = Math.round(weight * 1000000) / 1000000;
				weight /= Number(item?.packages_count);
			}

			if (item.dimensions_unit === 'cm') {
				totalVolume += (Number(item.length) * Number(item.width) * Number(item.height)
                            * Number(item.packages_count)) / 1000000;
			}

			if (item.dimensions_unit === 'inch') {
				totalVolume += (Number(item.length) * Number(item.width) * Number(item.height)
							* Number(item.packages_count)) / INCHCUBE_TO_CBM;

				length *= INCH_TO_CM;
				width *= INCH_TO_CM;
				height *= INCH_TO_CM;
			}
			if (!item?.weight_unit && !item?.volume_unit) {
				totalWeight += Number(item.weight) * Number(item.packages_count);
				totalVolume += (Number(item.length) * Number(item.width) * Number(item.height)
							* Number(item.packages_count)) / 1000000;
			}

			packages = [
				...packages,
				{
					length,
					width,
					height,
					packages_count : Number(item.packages_count),
					packing_type   : item.package_type,
					handling_type  : item.stackability || 'non_stackable',
					package_weight : weight,
				},
			];
		});
	}

	const airPayload = {
		origin_airport_id      : origin?.id,
		destination_airport_id : destination?.id,
		cargo_clearance_date,
		commodity,
		commodity_details      : [{ commodity_type: 'all' }],
		inco_term              : getIncoterm(origin, destination) || undefined,
		packages,
		packages_count         : totalQuantity,
		weight                 : Math.round(totalWeight * 1000000) / 1000000,
		volume                 : Math.round(totalVolume * 1000000) / 1000000,
		status                 : 'active',
		payment_type           : 'prepaid',
		dry_ice_required       : false,
		load_selection_type,
	};

	const payload = {
		air_freight_services_attributes: [airPayload],
	};

	return payload;
};

export default getAirPayload;
