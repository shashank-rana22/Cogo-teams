import dynamic from 'next/dynamic';
import { useState } from 'react';

import 'react-quill/dist/quill.bubble.css';
import styles from './styles.module.css';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

function TextComponent(props) {
	const { text, components, setComponents, elementId } = props;
	const [editorValue, setEditorValue] = useState(text);
	const [isFocused, setIsFocused] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	// const handleFocus = () => setIsFocused(true);

	// const handleBlur = () => setIsFocused(true);

	const handleEditorChange = (value) => {
		setEditorValue(value);

		// eslint-disable-next-line max-len, max-len, max-len
		const selectedComponentIndex = (components || []).map((component, index) => (component.id === elementId ? index : null));

		const updatedComponent = {
			...components[selectedComponentIndex],
			content: value,
		};

		console.log('updatedComponents ::', updatedComponent);

		// setComponents((prev) => {
		// 	(prev || []).map((component, index) => {
		// 		if (index === selectedComponentIndex) {
		// 			return updatedComponent;
		// 		}
		// 		return component;
		// 	});
		// });
	};

	const modules = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'],
			['blockquote', 'code-block'],
			[{ header: 1 }, { header: 2 }],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ script: 'sub' }, { script: 'super' }],
			[{ indent: '-1' }, { indent: '+1' }],
			[{ direction: 'rtl' }],

			[{ size: ['small', false, 'large', 'huge'] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],

			[{ color: [] }, { background: [] }],
			[{ font: [] }],
			[{ align: [] }],

			['clean'],
		],
	};

	return (
		<div>

			<ReactQuill
				theme="bubble"
				placeholder="Start Typing..."
				value={editorValue}
				modules={modules}
				style={styles}
				onChange={handleEditorChange}
			/>

		</div>
	);
}

export default TextComponent;
