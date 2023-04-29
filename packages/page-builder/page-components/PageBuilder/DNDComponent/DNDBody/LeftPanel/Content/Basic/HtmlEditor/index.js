/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import useUpdateHtmlContent from '../../../../../../../../helpers/useUpdateHtmlContent';

import styles from './styles.module.css';

function HtmlEditor(props) {
	const {
		pageConfiguration,
		setPageConfiguration,
		selectedRow,
		selectedItem,
		selectedColumn,
		selectedNestedColumn,
	} = props;

	const [htmlValue, setHtmlValue] = useState('');

	const { content } = selectedItem || {};

	const { handleEditorChange } = useUpdateHtmlContent({
		selectedColumn,
		selectedRow,
		selectedItem,
		pageConfiguration,
		selectedNestedColumn,
		setHtmlValue,
		setPageConfiguration,
	});

	useEffect(() => {
		setHtmlValue(content);
	}, [content]);

	return (
		<div>
			<div className={styles.sidebar_wrapper}>
				<Button
					themeType="secondary"
					type="button"
				>
					Back
				</Button>
			</div>

			<AceEditor
				value={htmlValue}
				mode="html"
				theme="github"
				onChange={handleEditorChange}
				name="editor"
				width="100%"
				height="600px"
				editorProps={{ $blockScrolling: true }}
			/>
		</div>
	);
}

export default HtmlEditor;
