import { Modal, Button } from '@cogoport/components';
import React from 'react';

import ViewCtcBreakupContent from './ViewCtcBreakupContent';

function ViewCtcBreakup({ viewCtcBreakupModal, setViewCtcBreakupModal, is_offer_letter_applicable }) {
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
					is_offer_letter_applicable={is_offer_letter_applicable}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ViewCtcBreakup;
