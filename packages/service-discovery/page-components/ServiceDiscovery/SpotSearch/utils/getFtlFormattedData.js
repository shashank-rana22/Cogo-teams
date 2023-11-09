import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

export const getFTLGrossFormattedData = (data = {}) => {
	if (isEmpty(data)) {
		return data;
	}

	const grossData = Array.isArray(data) ? data[GLOBAL_CONSTANTS.zeroth_index] : data;

	const grossResult = {
		packing_type   : grossData.packing_type,
		packages_count : grossData.packages_count,
		package_weight : grossData.package_weight,
		volume         : grossData.volume,
		handling_type  : grossData.handling_type,
		unit           : grossData.unit,
		dimensions     : {
			length : grossData.length || grossData.dimensions?.length,
			width  : grossData.width || grossData.dimensions?.width,
			height : grossData.height || grossData.dimensions?.height,
		},
	};

	return grossResult;
};

export const getFTLPerPackageFormattedData = (data = []) => {
	const perPackageData = Array.isArray(data) ? data : data.packages;

	const packagesArray = perPackageData.reduce((acc, packageItem) => [...acc, {
		packing_type   : packageItem?.packing_type || packageItem?.package_type,
		packages_count : packageItem?.packages_count,
		package_weight : packageItem?.package_weight,
		dimensions     : {
			length : packageItem?.length || packageItem?.dimensions?.length,
			width  : packageItem?.width || packageItem?.dimensions?.width,
			height : packageItem?.height || packageItem?.dimensions?.height,
		},
		handling_type : packageItem?.handling_type,
		unit          : packageItem?.unit,
	}], []);
	return packagesArray;
};
