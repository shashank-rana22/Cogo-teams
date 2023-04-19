import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Controller } from 'react-hook-form';

function ControlledAceEditor(props) {
	const { name, control, rules, mode, width, height, ...rest } = props;
	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<AceEditor
					{...rest}
					key={rest.id}
					onChange={onChange}
					value={value}
					mode={mode}
					theme="github"
					name="editor"
					showGutter
					width={width || '100%'}
					height={height || '400px'}
					editorProps={{ $blockScrolling: true }}
				/>
			)}
		/>
	);
}
export default ControlledAceEditor;
