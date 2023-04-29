/* eslint-disable max-len */
const useUpdateHtmlContent = ({
	selectedColumn,
	selectedRow,
	selectedItem,
	pageConfiguration,
	selectedNestedColumn,
	setHtmlValue,
	setPageConfiguration,
}) => {
	const handleEditorChange = (value) => {
		const { id: selectedRowId } = selectedRow || {};

		const { id: selectedColumnId } = selectedColumn || {};

		const { id: selectedChildId } = selectedItem || {};

		const { id: selectedNestedColumnId } = selectedItem || {};

		const data = pageConfiguration;

		const selectedComponentIndex = (data.layouts || []).findIndex((item) => (item.id === selectedRowId));

		if (selectedItem) {
			if (Object.keys(selectedNestedColumn).length > 0) {
				data.layouts[selectedComponentIndex].component.children[selectedColumnId].component.children[selectedNestedColumnId].component.content = value;
			} else if (Object.keys(selectedColumn).length > 0) {
				data.layouts[selectedComponentIndex].component.children[selectedChildId].component.content = value;
			} else if (Object.keys(selectedColumn).length === 0 && Object.keys(selectedNestedColumn).length === 0) {
				data.layouts[selectedComponentIndex].component.content = value;
			}
		}

		setHtmlValue(value);

		setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));
	};
	return { handleEditorChange };
};

export default useUpdateHtmlContent;
