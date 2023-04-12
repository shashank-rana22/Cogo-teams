import { Button } from '@cogoport/components';
// eslint-disable-next-line import/no-unresolved
// import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.bubble.css';

// const ReactQuill = dynamic(import('react-quill'), { ssr: false });

function ButtonComponent(props) {
	const {
		// label = 'submit',
		themeType = 'primary',
		size = 'md',
		type = 'button',
		// components,
		// setComponents,
		// elementId,
	} = props;

	const [isFocused, setIsFocused] = useState(false);
	// const [editorValue, setEditorValue] = useState(label);

	// const editorStyle = {
	// 	border         : isFocused ? '1.5px solid #88cad1' : '1px solid #ccc',
	// 	padding        : '10px',
	// 	margin         : '20px',
	// 	display        : 'flex',
	// 	justifyContent : 'center',

	// };

	// const handleEditorChange = (value) => {
	// 	setEditorValue(value);

	// 	// eslint-disable-next-line max-len, max-len, max-len
	// 	const selectedComponentIndex = (components || []).findIndex((component) => (component.id === elementId));

	// 	const updatedComponent = {
	// 		...components[selectedComponentIndex],
	// 		content: value,
	// 	};

	// 	// use map instead slice
	// 	setComponents((prevComponents) => [
	// 		...prevComponents.slice(0, selectedComponentIndex),
	// 		updatedComponent,
	// 		...prevComponents.slice(selectedComponentIndex + 1),
	// 	]);
	// };

	return (
		<div style={{ height: '60px' }}>
			<Button
				type={type}
				themeType={themeType}
				size={size}
				onClick={() => setIsFocused(!isFocused)}

			>
				Submit
				{/* <ReactQuill
					theme="bubble"
					value={editorValue}
					onChange={handleEditorChange}
				/> */}

			</Button>

		</div>
	);
}

export default ButtonComponent;
