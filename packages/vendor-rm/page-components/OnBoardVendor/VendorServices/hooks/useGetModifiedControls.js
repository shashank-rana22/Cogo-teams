import subCategoryOptions from '../../../utils/sub-category-options';

function useGetModifiedControls({
	controls,
	services,
	index,
}) {
	const currentCate = services[index]?.category;

	const newControls = controls.map((item) => {
		if (item.name !== 'sub_category') {
			return item;
		}

		return {
			...item,
			options: subCategoryOptions[currentCate],
		};
	});

	return {
		newControls,
	};
}

export default useGetModifiedControls;
