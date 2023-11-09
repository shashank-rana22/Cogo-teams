const ONE_VALUE = 1;

const getCombinedSimilarPackages = ({ data = {} }) => {
	const packages = data.packages || [];

	for (let i = 0; i < packages.length; i += ONE_VALUE) {
		const { packages_count } = packages[i];
		let firstPackageCount = packages_count;

		for (let j = i + ONE_VALUE; j < packages.length; j += ONE_VALUE) {
			const { packages_count: lastPackageCount } = packages[j];

			if (
				packages[i].packing_type === packages[j].packing_type
				&& packages[i].weight === packages[j].weight
				&& packages[i].length === packages[j].length
				&& packages[i].width === packages[j].width
				&& packages[i].height === packages[j].height
				&& packages[i].handling_type === packages[j].handling_type
				&& packages[i].dimensions_unit === packages[j].dimensions_unit
				&& packages[i].weight_unit === packages[j].weight_unit
			) {
				firstPackageCount = Number(firstPackageCount) + Number(lastPackageCount);
				packages.splice(j, ONE_VALUE);
				packages[i].packages_count = firstPackageCount;
			}
		}
	}

	return packages;
};

export default getCombinedSimilarPackages;
