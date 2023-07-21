import { Modal } from '@cogoport/components';
import React from 'react';

import ModalContent from './ModalContent';

function DocumentHistory(props) {
	const { showHistory } = props;
	return (
		<div>
			<Modal size="lg" closeOnOuterClick={false} show={showHistory} placement="center">
				<Modal.Header title="Document history" />
				<Modal.Body>
					<ModalContent {...props} />
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default DocumentHistory;
