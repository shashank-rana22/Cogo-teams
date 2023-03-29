import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React from 'react';

import styles from './styles.module.css';

function Attachement({ onChange }) {
	return (
		<div className={styles.uploader}>
			<FileUploader
				value={null}
				onChange={onChange}
				showProgress
				draggable
				multiple
			/>
		</div>
	);
}

export default Attachement;
