import { useState } from 'react';

import FileUploader from '../FileUploader';

function ImageComponent(props) {
	const { src, components, setComponents, childId, selectedRow } = props;

	const [fileValue, setFileValue] = useState();
	const [isFocused, setIsFocused] = useState(false);

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

			setFileValue(val);

			setComponents((prev) => ({ ...prev, layouts: data.layouts }));
		}
	};

	return (
		<div>
			{fileValue ? (
				<div
					role="presentation"
					onClick={() => setIsFocused(!isFocused)}
				>
					<img width="100%" src={src} alt="upload-img" />
				</div>
			) : (
				<FileUploader
					value={src}
					onChange={(val) => handleFileChange(val)}
					accept="png"
					uploadDesc="Upload"
				/>
			) }
		</div>
	);
}

export default ImageComponent;
