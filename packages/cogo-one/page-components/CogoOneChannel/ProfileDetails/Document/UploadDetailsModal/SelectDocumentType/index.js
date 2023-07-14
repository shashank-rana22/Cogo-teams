import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function SelectDocumentType({
	setSelectedDocumentType = () => {},
	isPanUploaded,
	isGstUploaded,
}) {
	return (
		<div className={styles.container}>
			<Button
				size="md"
				themeType="secondary"
				disabled={isPanUploaded}
				className={styles.first_button}
				onClick={() => setSelectedDocumentType('pan')}
			>
				PAN

			</Button>

			<Button
				size="md"
				themeType="secondary"
				disabled={isGstUploaded}
				onClick={() => setSelectedDocumentType('gst')}
				className={styles.last_button}
			>
				GST

			</Button>

		</div>
	);
}

export default SelectDocumentType;
