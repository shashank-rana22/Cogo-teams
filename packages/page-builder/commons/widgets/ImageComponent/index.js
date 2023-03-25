import { useState, useEffect } from 'react';

import FileUploader from '../FileUploader';

function ImageComponent(props) {
	const { src, styles, components, setComponents, elementId } = props;

	const [fileValue, setFileValue] = useState();
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (fileValue) {
			// eslint-disable-next-line max-len, max-len, max-len
			const selectedComponentIndex = (components || []).findIndex((component) => (component.id === elementId));

			const updatedComponent = {
				...components[selectedComponentIndex],
				properties: {
					...components[selectedComponentIndex].properties,
					content: fileValue,
				},

			};

			// use map instead slice
			setComponents((prevComponents) => [
				...prevComponents.slice(0, selectedComponentIndex),
				updatedComponent,
				...prevComponents.slice(selectedComponentIndex + 1),
			]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileValue]);

	const editorStyle = {
		border  : isFocused ? '1.5px solid #88cad1' : '1px solid #ccc',
		padding : '10px',
		margin  : '20px',

	};

	return (
		<div style={editorStyle}>

			{fileValue ? (
				<img
					role="presentation"
					src={src}
					style={styles}
					alt="upload-img"
					onClick={() => setIsFocused(!isFocused)}
				/>
			) : (
				<FileUploader
					value={fileValue}
					onChange={setFileValue}
					accept="png"
					uploadDesc="Upload your image here"
				/>
			) }

		</div>
	);
}

export default ImageComponent;
