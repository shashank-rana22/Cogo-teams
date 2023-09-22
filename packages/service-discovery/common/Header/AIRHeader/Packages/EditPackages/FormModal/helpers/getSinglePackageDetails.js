import roundUp from './roundUp';

const LB_TO_KG = 2.205;
const CC_TO_CBM = 1000000;
const INCHCUBE_TO_CBM = 61020;
const DEFAULT_VALUE = 0;

const DIMENSIONS_UNIT_MAPPING = {
	cm   : CC_TO_CBM,
	inch : INCHCUBE_TO_CBM,
};

const getSinglePackageDetails = ({ watch = () => {} }) => {
	const PACKAGE_QUANTITY = [];
	const PACKAGE_WEIGHT = [];
	const PACKAGE_VOLUME = [];

	const packagesData = watch('packages') || [];

	packagesData.forEach((item) => {
		PACKAGE_QUANTITY.push(Number(item.packages_count));

		const WEIGHT_VALUE_MAPPING = {
			kg_unit  : item.packages_count * item.package_weight,
			kg_total : item.package_weight,
			lb_unit  : (item.packages_count * item.package_weight) / LB_TO_KG,
			lb_total : item.package_weight / LB_TO_KG,
		};

		const weight = WEIGHT_VALUE_MAPPING[item.weight_unit] || DEFAULT_VALUE;
		PACKAGE_WEIGHT.push(roundUp(weight));

		const volume = (item.packages_count * item.length * item.width * item.height)
			/ DIMENSIONS_UNIT_MAPPING[item.dimensions_unit];
		PACKAGE_VOLUME.push(roundUp(volume));
	});

	return {
		packageQuantity : PACKAGE_QUANTITY,
		packageWeight   : PACKAGE_WEIGHT,
		packageVolume   : PACKAGE_VOLUME,
	};
};

export default getSinglePackageDetails;
