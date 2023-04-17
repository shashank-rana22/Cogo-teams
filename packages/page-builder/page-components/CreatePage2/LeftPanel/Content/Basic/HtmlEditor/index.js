import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

function HtmlEditor(props) {
	const { component, setComponent, selectedRow } = props;

	const [htmlValue, setHtmlValue] = useState('');

	const handleEditorChange = (value) => {
		const { parentId, id } = selectedRow || {};
		const data = component;
		const selectedComponentIndex = (data.layouts || []).findIndex((item) => (item.id === id));

		if (parentId) {
			// data.layouts[selectedComponentIndex].children[childId].content = value;
		} else {
			data.layouts[selectedComponentIndex].content = value;
		}

		setHtmlValue(value);

		setComponent((prev) => ({ ...prev, layouts: data.layouts }));
	};

	return (
		<div style={{ width: '100%' }}>
			<AceEditor
				value={htmlValue}
				mode="html"
				theme="github"
				onChange={handleEditorChange}
				name="editor"
				width="350px"
				height="600px"
				editorProps={{ $blockScrolling: true }}
			/>
		</div>
	);
}

export default HtmlEditor;
