import { Modal, Button } from '@cogoport/components';
import React from 'react';

import ViewCtcBreakupContent from './ViewCtcBreakupContent';

function ViewCtcBreakup({ viewCtcBreakupModal, setViewCtcBreakupModal }) {
	const { metadata } = viewCtcBreakupModal || {};

	const onClose = () => {
		setViewCtcBreakupModal(null);
	};

	return (
		<Modal
			size="xl"
			show={viewCtcBreakupModal?.id}
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
