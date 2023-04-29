/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import styles from './styles.module.css';

function HtmlEditor(props) {
	const {
		pageConfiguration,
		setPageConfiguration,
		selectedRow,
		selectedItem,
		selectedColumn,
		selectedNestedColumn,
		// columnData,
		// nestedColumData,
	} = props;

	const [htmlValue, setHtmlValue] = useState('');

	const { content } = selectedItem || {};

	useEffect(() => {
		setHtmlValue(content);
	}, [content]);

	const handleEditorChange = (value) => {
		const { id: selectedRowId } = selectedRow || {};

		// const { id : columnId } = columnData || {};

		// const { id : nestedColumnId } = nestedColumData || {};

		const { id: selectedColumnId } = selectedColumn || {};

		const { id: selectedChildId } = selectedItem || {};

		const { id: selectedNestedColumnId } = selectedItem || {};

		const data = pageConfiguration;

		const selectedComponentIndex = (data.layouts || []).findIndex((item) => (item.id === selectedRowId));

		if (selectedItem) {
			if (Object.keys(selectedNestedColumn).length > 0) {
				data.layouts[selectedComponentIndex].component.children[selectedColumnId].component.children[selectedNestedColumnId].component.content = value;
			} else if (Object.keys(selectedColumn).length > 0) {
				data.layouts[selectedComponentIndex].component.children[selectedChildId].component.content = value;
			} else if (Object.keys(selectedColumn).length === 0 && Object.keys(selectedNestedColumn).length === 0) {
				data.layouts[selectedComponentIndex].component.content = value;
			}
		}

		setHtmlValue(value);

		setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));
	};

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
