import { Modal, Button } from '@cogoport/components';
import React from 'react';

import ViewCtcBreakupContent from './ViewCtcBreakupContent';

function ViewCtcBreakup({ metadata, showCtcBreakupModal, setShowCtcBreakupModal }) {
	const onClose = () => {
		setShowCtcBreakupModal(false);
	};

	return (
		<Modal
			size="xl"
			show={showCtcBreakupModal}
			onClose={onClose}
			placement="center"
		>
			<Modal.Header title="View CTC Breakup" />
			<Modal.Body>
				<ViewCtcBreakupContent
					metadata={metadata}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ViewCtcBreakup;
