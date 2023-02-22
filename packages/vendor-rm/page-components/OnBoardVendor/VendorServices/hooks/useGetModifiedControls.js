import subCategoryOptions from '../utils/sub-category-options';

function useGetModifiedControls({
	controls,
	office_details,
	index,
}) {
	const currentCate = office_details[index]?.category;

	const newControls = controls.map((item) => {
		if (item.name !== 'sub_category') {
			return item;
		}

		const obj = {
			...item,
			options: subCategoryOptions[currentCate],
		};
		return obj;
	});

	return {
		newControls,
	};
}

export default useGetModifiedControls;
