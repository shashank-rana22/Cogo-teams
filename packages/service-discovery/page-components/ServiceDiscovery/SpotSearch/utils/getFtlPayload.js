import { isEmpty } from '@cogoport/utils';

import getFtlPrefillValues from '../../../../common/Header/utils/getFtlPrefillValues';

import getFormattedTouchPointDataPayload from './getFormattedTouchPointDataPayload';
import { getFTLGrossFormattedData, getFTLPerPackageFormattedData } from './getFtlFormattedData';

const TONS_TO_KGS_CONVERSION_FACTOR = 1000;

const getFtlPayload = (values, origin, destination) => {
	const {
		commodity = '',
		cargo_readiness_date = '',
		load_selection_type = '',
		packages = [],
		trip_type,
		touch_points = {},
		trucks = [],
		ftlFormData = {},
		source = '',
	} = values;

	const finalTripType = ftlFormData?.typeOfJourney || trip_type;

	const ftl_touch_points = getFormattedTouchPointDataPayload({
		...(!isEmpty(ftlFormData) ? ftlFormData : (
			getFtlPrefillValues({ trip_type: finalTripType }, touch_points) || {})
		),
		location: {
			origin,
			destination,
		},
	});

	if (isEmpty(ftl_touch_points)) {
		return {};
	}

	const commonPayload = {
		cargo_readiness_date,
		commodity                                   : commodity === 'all' ? null : commodity,
		destination_location_id                     : destination?.id,
		load_selection_type,
		ftl_freight_service_touch_points_attributes : ftl_touch_points,
		origin_location_id                          : origin?.id,
		status                                      : 'active',
		trade_type                                  : 'domestic',
		trip_type                                   : finalTripType,
	};

	let payloadArray = [];

	if (load_selection_type === 'cargo_per_package') {
		let totalVolume = 0;
		let totalWeight = 0;

		const formattedPackages = getFTLPerPackageFormattedData(packages);

		const packageArr = formattedPackages.reduce((acc, packageData) => {
			const {
				dimensions = {},
				handling_type,
				packing_type,
				packages_count,
				package_weight,
				unit,
			} = packageData;

			const formattedWeight = unit === 'kg' ? package_weight / TONS_TO_KGS_CONVERSION_FACTOR : package_weight;

			const height = packageData.height || dimensions.height;
			const length = packageData.length || dimensions.length;
			const width = packageData.width || dimensions.width;

			totalWeight += Number(packages_count) * Number(formattedWeight);
			totalVolume += Number(height) * Number(length)
						* Number(width);

			return [...acc, {
				packing_type,
				packages_count : Number(packages_count),
				package_weight : Number(formattedWeight),
				height         : Number(height),
				length         : Number(length),
				width          : Number(width),
				handling_type,
			}];
		}, []);

		payloadArray = [
			{
				...commonPayload,
				packages : packageArr,
				volume   : Number(totalVolume),
				weight   : Number(totalWeight),
			},
		];
	}

	if (load_selection_type === 'cargo_gross') {
		const formattedPackages = getFTLGrossFormattedData(source === 'edit' ? values : packages);

		const {
			dimensions = {},
			handling_type,
			packing_type,
			packages_count,
			package_weight,
			volume,
			unit,
		} = formattedPackages;

		const formattedWeight = unit === 'kg'
			? Number(package_weight) / TONS_TO_KGS_CONVERSION_FACTOR : Number(package_weight);

		payloadArray = [
			{
				...commonPayload,
				packages: [
					{
						packing_type,
						packages_count : Number(packages_count),
						package_weight : Number(formattedWeight),
						height         : Number(dimensions.height),
						length         : Number(dimensions.length),
						width          : Number(dimensions.width),
						handling_type,
					},
				],
				volume : Number(values.volume || volume),
				weight : Number(formattedWeight),
			},
		];
	}

	if (load_selection_type === 'truck') {
		payloadArray = [
			...(trucks || []).map((truckItem) => {
				const { truck_type = '', trucks_count = '' } = truckItem;

				return {
					...commonPayload,
					packages     : [],
					truck_type,
					trucks_count : Number(trucks_count),
				};
			}),
		];
	}

	const payload = {
		ftl_freight_services_attributes: payloadArray,
	};

	return payload;
};

export default getFtlPayload;
