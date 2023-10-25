import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Content({
	cancelApproved,
	statusPresent,
	sageAllowed,
	loading,
	postToSage,
	setShowCancellationModal,
	irnLabel,
}) {
	return (
		<div className={styles.container}>
			{ cancelApproved ? (
				<Button
					size="sm"
					type="button"
					onClick={() => {
						setShowCancellationModal(true);
					}}
					style={{ marginBottom: '8px' }}
				>
					Cancel
					{' '}
					{irnLabel}
				</Button>
			) : null}
			{(statusPresent && sageAllowed) ? (
				<Button
					disabled={loading}
					size="sm"
					type="button"
					onClick={postToSage}
				>
					Post to Sage
				</Button>
			) : null}
		</div>
	);
}

export default Content;
