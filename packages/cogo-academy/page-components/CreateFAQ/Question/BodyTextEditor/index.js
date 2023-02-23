import React, { useState } from 'react';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

function BodyTextEditor({ editorValue, setEditorValue }) {
	const [rteValue, setRteValue] = useState(RichTextEditor.createValueFromString(editorValue, 'markdown'));
	const handleChange = (value) => {
		setRteValue(value);
		setEditorValue(value.toString('html'));
	};

	return (
		<RichTextEditor
			value={rteValue}
			onChange={handleChange}
			required
			id="body-text"
			name="bodyText"
			type="string"
			multiline
			variant="filled"
			rootStyle={{
				zIndex    : 0,
				position  : 'relative',
				minHeight : '300px',
			}}
		/>
	);
}

export default BodyTextEditor;
