import { Button } from '@cogoport/components';
import React from 'react';

import BodyTextEditor from './BodyTextEditor';
import styles from './styles.module.css';
import useDay1Download from './useDay1Download';

function Day1Download() {
	const { editorError, setEditorError, editorValue, setEditorValue, onClickUpdate } = useDay1Download();

	return (
		<div className={styles.container}>
			<div className={styles.text_editor_header}>Provide Day 1 Download</div>

			<div className={styles.text_editor}>
				<BodyTextEditor
					editorValue={editorValue}
					setEditorValue={setEditorValue}
					setEditorError={setEditorError}
				/>
			</div>
			{editorError && (
				<span className={styles.errors}>
					This is required
				</span>
			)}

			<div className={styles.button_wrapper}>
				<Button onClick={onClickUpdate}>Update</Button>
			</div>
		</div>
	);
}

export default Day1Download;
