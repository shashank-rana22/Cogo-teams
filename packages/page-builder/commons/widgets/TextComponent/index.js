// eslint-disable-next-line import/no-unresolved
import dynamic from 'next/dynamic';
import { useState } from 'react';

import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

function TextComponent(props) {
	const { text, components, setComponents, elementId } = props;

	const [editorValue, setEditorValue] = useState(text);
	const [isFocused, setIsFocused] = useState(false);

	const handleEditorChange = (value) => {
		setEditorValue(value);

		// eslint-disable-next-line max-len, max-len, max-len
		// const selectedComponentIndex = (components || []).findIndex((component) => (component.id === elementId));

		// const updatedComponent = {
		// 	...components[selectedComponentIndex],
		// 	content: value,
		// };

		// use map instead slice
		// setComponents((prevComponents) => [
		// 	...prevComponents.slice(0, selectedComponentIndex),
		// 	updatedComponent,
		// 	...prevComponents.slice(selectedComponentIndex + 1),
		// ]);
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

		<ReactQuill
			theme="bubble"
			placeholder="Start Typing..."
			value={editorValue}
			modules={modules}
			onChange={handleEditorChange}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		/>

	);
}

export default TextComponent;
