import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['allocation']);

	const isSingleSelected = modalDetailsArray?.length === DEFAULT_CHECKED_ACCOUNT;

	const { onDeallocate } = useBulkDeallocation({
		modalDetailsArray,
		setShowDeallocateModal,
		setCheckedRowsId,
		setModalDetailsArray,
		refetch,
		t,
	});

	return (
		<Modal
			show={showDeallocateModal}
			onClose={() => setShowDeallocateModal(false)}
			size={isSingleSelected ? 'lg' : 'md'}
		>
			<Modal.Header title={t('allocation:de_allocate_heading')} />

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
					{t('allocation:cancel_button')}
				</Button>
				<Button type="button" style={{ marginLeft: '8px' }} onClick={() => onDeallocate()}>
					{t('allocation:de_allocate_button')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeallocateModal;
