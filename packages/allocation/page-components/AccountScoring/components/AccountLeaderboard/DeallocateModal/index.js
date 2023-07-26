import { Button, Modal } from '@cogoport/components';
import React from 'react';

import useBulkDeallocation from '../../../hooks/useBulkDeallocation';

import MultipleCheckedAccounts from './MultipleCheckedAccounts';
import SingleCheckedAccount from './SingleCheckedAccount';

const DEFAULT_CHECKED_ACCOUNT = 1;

function DeallocateModal({
	setShowDeallocateModal = () => {},
	showDeallocateModal = false,
	modalDetailsArray = [],
	setCheckedRowsId = () => {},
	setModalDetailsArray = () => {},
	refetch = () => {},
}) {
	const isSingleSelected = modalDetailsArray?.length === DEFAULT_CHECKED_ACCOUNT;

	const { onDeallocate } = useBulkDeallocation({
		modalDetailsArray,
		setShowDeallocateModal,
		setCheckedRowsId,
		setModalDetailsArray,
		refetch,
	});

	return (
		<Modal
			show={showDeallocateModal}
			onClose={() => setShowDeallocateModal(false)}
			size={isSingleSelected ? 'lg' : 'md'}
		>
			<Modal.Header title="De - Allocate" />

			<Modal.Body>
				{isSingleSelected
					? <SingleCheckedAccount modalDetailsArray={modalDetailsArray} />
					: <MultipleCheckedAccounts modalDetailsArray={modalDetailsArray} />}
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					themeType="secondary"
					onClick={() => setShowDeallocateModal(false)}
				>
					Cancel

				</Button>
				<Button type="button" style={{ marginLeft: '8px' }} onClick={() => onDeallocate()}>De-Allocate</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeallocateModal;
