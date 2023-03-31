import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function PublishVersionModal({
	setShowPublishModal = () => {},
	showPublishModal,
	onCreate,
	publishLoading,
}) {
	return (
		<Modal
			size="md"
			placement="center"
			show={showPublishModal}
			closeOnOuterClick
			onClose={() => {
				setShowPublishModal(false);
			}}
		>

			<Modal.Header title="Publish Draft" />

			<Modal.Body>

				<div className={styles.text}>
					Are you sure you wish to publish
					{' '}
					<b>Current Draft</b>
					{' '}
					?
				</div>

				<div className={styles.cards_container} />

			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="md"
					themeType="tertiary"
					style={{ marginRight: '10px' }}
					disabled={publishLoading}
					onClick={() => setShowPublishModal(false)}
				>
					Cancel
				</Button>

				<Button
					type="submit"
					size="md"
					themeType="primary"
					onClick={() => {
						onCreate();
						// setPublish(true);
					}}
					loading={publishLoading}
				>
					Yes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PublishVersionModal;
