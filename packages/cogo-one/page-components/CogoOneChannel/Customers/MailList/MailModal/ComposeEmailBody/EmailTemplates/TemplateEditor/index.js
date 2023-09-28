import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function TemplateEditor({ templateData = {}, setTemplateData = () => {} }) {
	if (isEmpty(templateData)) {
		return null;
	}

	return (
		<Modal
			show
			size="lg"
			onClose={() => setTemplateData(null)}
		>
			<Modal.Header title="Create New Template" />
			<Modal.Body>
				<div className={styles.container}>
					hello
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default TemplateEditor;
