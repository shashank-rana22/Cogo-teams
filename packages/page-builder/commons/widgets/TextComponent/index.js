import dynamic from 'next/dynamic';
import { useState } from 'react';

import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

function TextComponent(props) {
	const { text, components, setComponents, childId, selectedItem } = props;

	const [editorValue, setEditorValue] = useState(text);

	const handleEditorChange = (value) => {
		const { parentId, id } = selectedItem || {};

		const data = components;
		const selectedComponentIndex = (data.layouts || []).findIndex((component) => (component.id === id));

		if (parentId) {
			data.layouts[selectedComponentIndex].children[childId].content = value;
		} else {
			data.layouts[selectedComponentIndex].content = value;
		}

		setEditorValue(value);
		setComponents((prev) => ({ ...prev, layouts: data.layouts }));
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
		/>

	);
}

export default TextComponent;
