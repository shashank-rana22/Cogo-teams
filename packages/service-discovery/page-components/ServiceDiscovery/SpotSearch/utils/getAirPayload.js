import getIncoterm from './getIncoterm';

const LB_TO_KG = 2.205;
const CFT_TO_CBM = 35.315;
const CC_TO_CBM = 1000000;
const INCHCUBE_TO_CBM = 61020;
const INCH_TO_CM = 2.54;
const ROUNDOFF_TO_POWER_6 = 1000000;
const ROUNDOFF_TO_POWER_3 = 1000;

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
			handling_type = '',
			packing_type = '',
		} = values;

		totalWeight = Number(total_weight);
		totalQuantity = Number(total_quantity);
		totalVolume = Number(total_volume);

		if (volume_unit === 'cc') {
			totalVolume = Number(total_volume) / CC_TO_CBM;
			totalVolume = Math.round(totalVolume * ROUNDOFF_TO_POWER_3) / ROUNDOFF_TO_POWER_3;
		} else if (volume_unit === 'cft') {
			totalVolume = Number(total_volume) / CFT_TO_CBM;
			totalVolume = Math.round(totalVolume * ROUNDOFF_TO_POWER_3) / ROUNDOFF_TO_POWER_3;
		}

		if (weight_unit === 'lb') {
			totalWeight = Number(total_weight) / LB_TO_KG;
			totalWeight = Math.round(totalWeight * ROUNDOFF_TO_POWER_3) / ROUNDOFF_TO_POWER_3;
		}

		packages = [
			{
				packages_count : Number(total_quantity),
				packing_type,
				handling_type  : handling_type || 'non_stackable',
			},
		];
	} else {
		const { packages:packagesData = [] } = values;

		(packagesData || []).forEach((item) => {
			let { length, width, height, package_weight } = item;
			totalQuantity += Number(item.packages_count);

			if (item.weight_unit === 'kg_unit') {
				totalWeight += Number(item.packages_count) * Number(item.package_weight);
			}
			if (item.weight_unit === 'kg_total') {
				totalWeight += Number(item.package_weight);
				package_weight /= Number(item?.packages_count);
			}
			if (item.weight_unit === 'lb_unit') {
				totalWeight += (Number(item.packages_count) * Number(item.package_weight)) / LB_TO_KG;
				package_weight /= LB_TO_KG;
				package_weight = Math.round(package_weight * ROUNDOFF_TO_POWER_6) / ROUNDOFF_TO_POWER_6;
			}
			if (item.weight_unit === 'lb_total') {
				totalWeight += Number(item.package_weight) / LB_TO_KG;
				package_weight /= LB_TO_KG;
				package_weight = Math.round(package_weight * ROUNDOFF_TO_POWER_6) / ROUNDOFF_TO_POWER_6;
				package_weight /= Number(item?.packages_count);
			}

			if (item.dimensions_unit === 'cm') {
				totalVolume += (Number(item.length) * Number(item.width) * Number(item.height)
                            * Number(item.packages_count)) / ROUNDOFF_TO_POWER_6;
			}

			if (item.dimensions_unit === 'inch') {
				totalVolume += (Number(item.length) * Number(item.width) * Number(item.height)
							* Number(item.packages_count)) / INCHCUBE_TO_CBM;

				length *= INCH_TO_CM;
				width *= INCH_TO_CM;
				height *= INCH_TO_CM;
			}
			if (!item?.weight_unit && !item?.volume_unit) {
				totalWeight += Number(item.package_weight) * Number(item.packages_count);
				totalVolume += (Number(item.length) * Number(item.width) * Number(item.height)
							* Number(item.packages_count)) / ROUNDOFF_TO_POWER_6;
			}

			packages = [
				...packages,
				{
					length         : Number(length),
					width          : Number(width),
					height         : Number(height),
					packages_count : Number(item.packages_count),
					packing_type   : item.packing_type,
					handling_type  : item.handling_type || 'non_stackable',
					package_weight : Number(package_weight),
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
		weight                 : Math.round(totalWeight * ROUNDOFF_TO_POWER_6) / ROUNDOFF_TO_POWER_6,
		volume                 : Math.round(totalVolume * ROUNDOFF_TO_POWER_6) / ROUNDOFF_TO_POWER_6,
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
