/* eslint-disable max-len */
const useUpdateComponentsContent = ({
	pageConfiguration,
	setPageConfiguration,
	selectedRow,
	selectedColumn,
	selectedNestedColumn,
	selectedItem,
	columnData,
	nestedColumData,
	setEditorValue,
	type,
	modeType,
}) => {
	const handleUpdateContent = (value, rowDetails) => {
		if (value && modeType === 'edit') {
			const { id } = rowDetails || {};

			const { id: selectedRowId } = selectedRow || {};

			const { id : columnId } = columnData || {};

			const { id : nestedColumnId } = nestedColumData || {};

			const { id: selectedColumnId } = selectedColumn || {};

			const { id: selectedChildId } = selectedItem || {};

			const data = pageConfiguration;

			const selectedComponentIndex = (data.layouts || []).findIndex(
				(selectedComponent) => selectedComponent.id === id,
			);

			if (id === selectedRowId && selectedItem) {
				if (Object.keys(selectedNestedColumn).length > 0 && nestedColumnId === selectedChildId) {
					const selectedChildrenId = data.layouts[selectedComponentIndex].component.children.findIndex((item) => item.id === selectedColumnId);
					const nestedSelectedChildrenId = data.layouts[selectedComponentIndex].component.children[selectedChildrenId].component.children.findIndex((item) => item.id === selectedChildId);
					data.layouts[selectedComponentIndex].component.children[selectedChildrenId].component.children[nestedSelectedChildrenId].component.content = value;
				} else if (Object.keys(selectedColumn).length > 0 && columnId === selectedColumnId && Object.keys(selectedNestedColumn).length === 0) {
					const selectedChildrenId = data.layouts[selectedComponentIndex].component.children.findIndex((item) => item.id === selectedChildId);
					data.layouts[selectedComponentIndex].component.children[selectedChildrenId].component.content = value;
				} else if (Object.keys(selectedColumn).length === 0 && Object.keys(selectedNestedColumn).length === 0) {
					data.layouts[selectedComponentIndex].component.content = value;
				}
			}

			if (type === 'text') {
				setEditorValue(value);
			}

			setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));
		}
	};

	return { handleUpdateContent };
};

export default useUpdateComponentsContent;
