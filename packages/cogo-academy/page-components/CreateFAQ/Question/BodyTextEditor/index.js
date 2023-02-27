import React, { useState, useEffect } from 'react';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require, import/no-unresolved
	RichTextEditor = require('react-rte').default;
}

function BodyTextEditor({
	editorValue = '',
	setEditorValue = () => {},
}) {
	const handleChange = (value) => {
		setEditorValue(value);
	};

	return (
		<RichTextEditor
			value={editorValue}
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
