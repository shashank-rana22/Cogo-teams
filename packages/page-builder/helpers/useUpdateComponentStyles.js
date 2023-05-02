import { isEmpty } from '@cogoport/utils';

/* eslint-disable max-len */
const useUpdateComponentsStyles = ({
	pageConfiguration,
	setPageConfiguration,
	selectedRow,
	selectedColumn,
	setSelectedItem,
	selectedNestedColumn,
	selectedItem,
}) => {
	// cases -
	// 1. when no one added then all are empty
	// 2. when components are added and without adding inner item then selectedRow == selectedItem
	// 3. for form, when text and form is selected then selectedColumn = selectedItem

	// structures
	// 1. when no one is added - then selected Row is present only.
	// 2. when some component added - then selected Item will work for selectem Item and selectedColumn is background.
	// 3.for form- when not added then selectedItem.
	// 4. for form with data - outer div is selected Column
	// 5. when inner are selected - selectedItem and selectedNestedItem

	const handleUpdateStyles = (key, value, settingType = '') => {
		const isRootComponent = isEmpty(selectedRow);

		const styleKey = settingType === 'Button' ? 'buttonStyle' : 'style';

		if (isRootComponent) {
			setPageConfiguration((prev) => ({
				...prev,
				style: {
					...pageConfiguration.style,
					[key]: value,
				},
			}));
		} else {
			const data = pageConfiguration;

			const { id: selectedRowId } = selectedRow || {};

			const { id: selectedColumnId } = selectedColumn || {};

			const { id: selectedChildId } = selectedItem || {};

			const selectedComponentIndex = (data.layouts || []).findIndex((item) => (item.id === selectedRowId));

			if (selectedItem) {
				if (Object.keys(selectedNestedColumn).length > 0) {
					const selectedChildrenId = data.layouts[selectedComponentIndex].component.children.findIndex((item) => item.id === selectedColumnId);
					const nestedSelectedChildrenId = data.layouts[selectedComponentIndex].component.children[selectedChildrenId].component.children.findIndex((item) => item.id === selectedChildId);
					const prevStyle = data.layouts[selectedComponentIndex].component.children[selectedChildrenId].component.children[nestedSelectedChildrenId].component.style;
					const modifiedStyle = {
						...prevStyle,
						[key]: value,
					};

					data.layouts[selectedComponentIndex].component.children[selectedChildrenId].component.children[nestedSelectedChildrenId].component.style = modifiedStyle;
				} else if (Object.keys(selectedColumn).length > 0 && Object.keys(selectedNestedColumn).length === 0) {
					const selectedChildrenId = data.layouts[selectedComponentIndex].component.children.findIndex((item) => item.id === selectedChildId);
					const prevStyle = data.layouts[selectedComponentIndex].component.children[selectedChildrenId].component.style;

					const modifiedStyle = {
						...prevStyle,
						[key]: value,
					};

					data.layouts[selectedComponentIndex].component.children[selectedChildrenId].component.style = modifiedStyle;
				} else if (Object.keys(selectedColumn).length === 0 && Object.keys(selectedNestedColumn).length === 0) {
					const prevStyle = data.layouts[selectedComponentIndex].component.style;
					const modifiedStyle = {
						...prevStyle,
						[key]: value,
					};

					data.layouts[selectedComponentIndex].component.style = modifiedStyle;
				}
			}

			setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));

			setSelectedItem((prev) => ({
				...prev,
				component: {
					...prev.component,
					style: {
						...prev.component.style,
						[key]: value,
					},

				},
			}));
		}
	};

	return { handleUpdateStyles };
};

export default useUpdateComponentsStyles;
