import { Button, Modal } from '@cogoport/components';
import React from 'react';

import MultipleCheckedAccounts from './MultipleCheckedAccounts';
import SingleCheckedAccount from './SingleCheckedAccount';

const DEFAULT_CHECKED_ACCOUNT = 1;

function DeallocateModal({
	setShowDeallocateModal = () => {},
	showDeallocateModal = false, modalDetailsArray,
}) {
	return (
		<Modal show={showDeallocateModal} onClose={() => setShowDeallocateModal(false)}>
			<Modal.Header title="De - Allocate" />

			<Modal.Body>
				{modalDetailsArray.length === DEFAULT_CHECKED_ACCOUNT
					? <SingleCheckedAccount modalDetailsArray={modalDetailsArray} />
					: <MultipleCheckedAccounts modalDetailsArray={modalDetailsArray} />}
			</Modal.Body>

			<Modal.Footer>
				<Button themeType="secondary">Cancel</Button>
				<Button style={{ marginLeft: '8px' }}>De-Allocate</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeallocateModal;
