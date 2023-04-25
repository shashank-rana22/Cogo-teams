import FileUploader from '../FileUploader';

function ImageComponent(props) {
	const { components, setComponents, childId, selectedRow, widget } = props;

	const { content } = widget || {};

	const handleFileChange = (val) => {
		if (val) {
			const { parentId, id } = selectedRow || {};
			const data = components;
			const selectedComponentIndex = (data.layouts || []).findIndex((component) => (component.id === id));

			if (parentId) {
				data.layouts[selectedComponentIndex].children[childId].content = val;
			} else {
				data.layouts[selectedComponentIndex].content = val;
			}

			setComponents({ ...data });
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
					onChange={(val) => handleFileChange(val)}
					accept="png"
					uploadDesc="Upload"
				/>

			) }
		</div>
	);
}

export default ImageComponent;
