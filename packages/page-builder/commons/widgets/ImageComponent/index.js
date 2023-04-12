import { useState, useEffect } from 'react';

import FileUploader from '../../FileUploader';

// import styles from './styles.module.css';

function ImageComponent(props) {
	const { src, style, components, setComponents, elementId } = props;

	const [fileValue, setFileValue] = useState();
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (fileValue) {
			// eslint-disable-next-line max-len, max-len, max-len
			const selectedComponentIndex = (components || []).findIndex((component) => (component.id === elementId));

			const updatedComponent = {
				...components[selectedComponentIndex],
				content: fileValue,
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

	// const editorStyle = {
	// 	border  : isFocused ? '1.5px solid #88cad1' : '1px solid #ccc',
	// 	padding : '10px',
	// 	margin  : '20px',
	// };

	return (
		<div>

			{fileValue ? (
				<div
					// className={`${styles['my-div']} ${isFocused ? styles.focused : ''}`}
					role="presentation"
					onClick={() => setIsFocused(!isFocused)}
				>
					{/* <span className={styles['edit-icon']}>
						<IcMEdit fil="#88cad1" />
					</span> */}

					<img width="100%" src={src} style={style} alt="upload-img" />
				</div>
			) : (
				<FileUploader
					value={fileValue}
					onChange={setFileValue}
					accept="png"
					uploadDesc="Upload"
				/>
			) }

		</div>
	);
}

export default ImageComponent;
