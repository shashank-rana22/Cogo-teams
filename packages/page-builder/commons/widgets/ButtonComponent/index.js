import { Button } from '@cogoport/components';
// eslint-disable-next-line import/no-unresolved
import dynamic from 'next/dynamic';
import { useState } from 'react';

import styles from './styles.module.css';
import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

function ButtonComponent(props) {
	const {
		label = 'submit',
		themeType = 'primary',
		size = 'md',
		type = 'button',
		components,
		setComponents,
		elementId,
	} = props;

	const [isFocused, setIsFocused] = useState(false);
	const [editorValue, setEditorValue] = useState(label);

	const editorStyle = {
		border         : isFocused ? '1.5px solid #88cad1' : '1px solid #ccc',
		padding        : '10px',
		margin         : '20px',
		display        : 'flex',
		justifyContent : 'center',

	};

	// const modules = {
	// 	toolbar: [
	// 		['bold', 'italic', 'underline', 'strike'],
	// 		['blockquote', 'code-block'],
	// 		[{ header: 1 }, { header: 2 }],
	// 		[{ list: 'ordered' }, { list: 'bullet' }],
	// 		[{ script: 'sub' }, { script: 'super' }],
	// 		[{ indent: '-1' }, { indent: '+1' }],
	// 		[{ direction: 'rtl' }],

	// 		[{ size: ['small', false, 'large', 'huge'] }],
	// 		[{ header: [1, 2, 3, 4, 5, 6, false] }],

	// 		[{ color: [] }, { background: [] }],
	// 		[{ font: [] }],
	// 		[{ align: [] }],

	// 		['clean'],
	// 	],
	// };

	const handleEditorChange = (value) => {
		setEditorValue(value);

		// eslint-disable-next-line max-len, max-len, max-len
		const selectedComponentIndex = (components || []).findIndex((component) => (component.id === elementId));

		const updatedComponent = {
			...components[selectedComponentIndex],
			properties: {
				...components[selectedComponentIndex].properties,
				content: value,
			},

		};

		// use map instead slice
		setComponents((prevComponents) => [
			...prevComponents.slice(0, selectedComponentIndex),
			updatedComponent,
			...prevComponents.slice(selectedComponentIndex + 1),
		]);
	};

	return (
		<div style={editorStyle}>
			<Button
				className={styles.button}
				type={type}
				themeType={themeType}
				size={size}
				onClick={() => setIsFocused(!isFocused)}

			>
				<ReactQuill
					theme="bubble"
					value={editorValue}
					// modules={modules}
					style={styles}
					onChange={handleEditorChange}
				/>

			</Button>

		</div>
	);
}

export default ButtonComponent;
