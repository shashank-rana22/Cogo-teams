import { Popover } from '@cogoport/components';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

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

function TextComponent(props) {
	const { widget, components, setComponents, childId, selectedRow } = props;

	const { content } = widget || {};

	const [editorValue, setEditorValue] = useState(content);

	const handleEditorChange = (value) => {
		const { parentId, id } = selectedRow || {};

		const data = components;

		// console.log('data ::', data);
		// console.log('element id ::', elementId);
		const selectedComponentIndex = (data.layouts || []).findIndex((component) => (component.id === id));

		if (parentId && childId) {
			data.layouts[selectedComponentIndex].children[childId].content = value;
		} else {
			data.layouts[selectedComponentIndex].content = value;
		}

		setEditorValue(value);
		setComponents((prev) => ({ ...prev, layouts: data.layouts }));
	};

	function Editor() {
		return (
			<ReactQuill
				theme="snow"
				placeholder="start typing"
				value={editorValue}
				modules={modules}
				onChange={handleEditorChange}
			/>
		);
	}

	return (

		<Popover
			interactive
			placement="bottom"
			theme="light"
			trigger="click"
			content={Editor()}
		>

			<div dangerouslySetInnerHTML={{ __html: content }} />
		</Popover>

	);
}

export default TextComponent;
