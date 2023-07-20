import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Content({
	cancelApproved,
	statusPresent,
	sageAllowed,
	loading,
	postToSage,
	setShowCancellationModal,
	setShow,
	irnLabel,
}) {
	return (
		<div className={styles.container}>
			{ cancelApproved ? (
				<Button
					size="sm"
					type="button"
					onClick={() => {
						setShowCancellationModal(true); setShow(false);
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
