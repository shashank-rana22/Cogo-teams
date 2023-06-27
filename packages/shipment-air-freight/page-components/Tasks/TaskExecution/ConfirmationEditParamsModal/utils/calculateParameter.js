const DEFAULT_VALUE_FOR_NULL_HANDLING = 0;
const SECOND_DECIMAL_PLACE = 2;
const SIXTH_DECIMAL_PLACE = 6;
const CONVERT_TO_CBM_BASE = 10;
const CONVERT_TO_CBM_POWER = 6;
const calculateParameter = (packages = []) => {
	const weight = packages.reduce(
		(acc, pack) => acc + Number(pack.total_packages_weight),
		DEFAULT_VALUE_FOR_NULL_HANDLING,
	);
	const volume = packages.reduce(
		(acc, pack) => acc
			+ Number(
				pack.length * pack.width * pack.height * pack.packages_count
				* CONVERT_TO_CBM_BASE ** -(CONVERT_TO_CBM_POWER),
			),
		DEFAULT_VALUE_FOR_NULL_HANDLING,
	);
	const packages_count = packages.reduce(
		(acc, pack) => acc + Number(pack.packages_count),
		DEFAULT_VALUE_FOR_NULL_HANDLING,
	);
	return {
		weight : Number((weight || DEFAULT_VALUE_FOR_NULL_HANDLING).toFixed(SECOND_DECIMAL_PLACE)),
		volume : Number((volume || DEFAULT_VALUE_FOR_NULL_HANDLING).toFixed(SIXTH_DECIMAL_PLACE)),
		packages_count,
	};
};

export default calculateParameter;
