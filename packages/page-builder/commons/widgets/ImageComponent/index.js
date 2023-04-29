import useUpdateComponentsContent from '../../../helpers/useUpdateComponentsContent';
import FileUploader from '../FileUploader';

function ImageComponent(props) {
	const {
		pageConfiguration,
		setPageConfiguration,
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

	const { handleUpdateContent } = useUpdateComponentsContent({
		pageConfiguration,
		setPageConfiguration,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
		type: 'image',
	});

	return (
		<div>
			{content ? (
				<div>
					<img width="100%" src={content} alt="upload-img" />
				</div>
			) : (
				<FileUploader
					value={content}
					onChange={(val) => handleUpdateContent(val, rowData)}
					accept="png"
					uploadDesc="Upload"
				/>

			) }
		</div>
	);
}

export default ImageComponent;
