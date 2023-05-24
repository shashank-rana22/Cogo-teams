let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require, import/no-unresolved
	RichTextEditor = require('react-rte').default;
}

function BodyTextEditor({
	editorValue = '',
	setEditorValue = () => {},
	setEditorError = () => {},
}) {
	const handleChange = (value) => {
		setEditorValue(value);
		setEditorError(false);
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
