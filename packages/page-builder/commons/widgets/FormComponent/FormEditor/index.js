import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

function FormEditor(props) {
	const { formData } = props;
	return (
		<div style={{ width: '100%' }}>
			<AceEditor
				value={JSON.stringify(formData, null, '\t')}
				mode="json"
				theme="github"
				name="editor"
				width="100%"
				height="600px"
				editorProps={{ $blockScrolling: true }}
				setOptions={{
					enableBasicAutocompletion : true,
					enableLiveAutocompletion  : true,
					enableSnippets            : true,
				}}
			/>
		</div>
	);
}

export default FormEditor;
