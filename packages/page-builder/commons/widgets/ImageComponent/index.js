import FileUploader from '../FileUploader';

function ImageComponent(props) {
	const {
		pageConfiguration,
		setPageConfiguration,
		childId,
		widget,
		rowData,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
	} = props;

	const { component } = widget || {};

	const { content } = component || {};

	const handleFileChange = (value, rowDetails) => {
		if (value) {
			const { id } = rowDetails || {};
			const { id: selectedRowId } = selectedRow || {};

			const { id : columnId } = columnData || {};

			const { id : nestedColumnId } = nestedColumData || {};

			const { id: selectedColumnId } = selectedColumn || {};

			const { id: selectedChildId } = selectedItem || {};

			const { id: selectedNestedColumnId } = selectedItem || {};

			const data = pageConfiguration;

			const selectedComponentIndex = (data.layouts || []).findIndex(
				(selectedComponent) => selectedComponent.id === id,
			);

			if (id === selectedRowId && selectedItem) {
				if (Object.keys(selectedNestedColumn).length > 0 && nestedColumnId === selectedNestedColumnId) {
					data.layouts[selectedComponentIndex].component.children[selectedColumnId].component.children[selectedNestedColumnId].component.content = value;
				} else if (Object.keys(selectedColumn).length > 0 && columnId === selectedColumnId) {
					data.layouts[selectedComponentIndex].component.children[selectedChildId].component.content = value;
				} else if (Object.keys(selectedColumn).length === 0 && Object.keys(selectedNestedColumn).length === 0) {
					data.layouts[selectedComponentIndex].component.content = value;
				}
			}

			setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));
		}
	};

	return (
		<div>
			{content ? (
				<div>
					<img width="100%" src={content} alt="upload-img" />
				</div>
			) : (
				<FileUploader
					value={content}
					onChange={(val) => handleFileChange(val, rowData)}
					accept="png"
					uploadDesc="Upload"
				/>

			) }
		</div>
	);
}

export default ImageComponent;
