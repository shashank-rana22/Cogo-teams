import { useState, useRef } from 'react';

function ImageComponent(props) {
	const { src, alt, styles, components, setComponents, elementId } = props;

	const [fileValue, setFileValue] = useState(src);

	const inputRef = useRef(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleFileUpload = (event) => {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setFileValue(reader.result);
			};
		}

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
	};

	return (
		<div>
			<img
				role="presentation"
				src={fileValue}
				style={styles}
				alt={alt}
				onClick={handleClick}
			/>

			<input type="file" onChange={handleFileUpload} ref={inputRef} style={{ display: 'none' }} />

		</div>
	);
}

export default ImageComponent;
