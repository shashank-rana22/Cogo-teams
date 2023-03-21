import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function PublishVersionModal({ setShowPublishModal = () => {} }) {
	<Modal size="md" placement="center" closeOnOuterClick>

		<Modal.Header title="Publish" />

		<Modal.Body>

			<div className={styles.text}>
				Are you sure you wish to publish
				{' '}
				<b>Version 1</b>
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
				onClick={() => setShowPublishModal(false)}
			>
				Cancel
			</Button>
			<Button
				type="submit"
				size="md"
				themeType="primary"
				// sdisabled={loading}
			>
				Save
			</Button>
		</Modal.Footer>

	</Modal>;
}

export default PublishVersionModal;
