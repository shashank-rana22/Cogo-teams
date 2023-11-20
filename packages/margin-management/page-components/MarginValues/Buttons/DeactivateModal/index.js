import { Modal, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useCallback } from 'react';

import useUpdateMargin from '../../../../hooks/useUpdateMargin';

const MODAL_TEXT_1 = 'Are you sure you want to deactivate this margin? Once you deactivate a margin, ';
const MODAL_TEXT_2 = 'you cannot activate it again.';
function DeactiveModal({
	setOpenModal = () => {}, refetch = () => {},
	id = '', setMarginBreakupData = () => {}, type = '', openModal = false,
}) {
	const router = useRouter();

	const { loading = false, onSubmit = () => { } } = useUpdateMargin();

	const handleSave = useCallback(async () => {
		const success = await onSubmit({ params: { id, status: 'inactive' } });

		if (success) {
			setOpenModal(false);
			setMarginBreakupData({});
			refetch();
			if (type === 'edit') {
				router.push('/margins');
			}
		}
	}, [id, onSubmit, refetch, router, setMarginBreakupData, setOpenModal, type]);

	return (
		<Modal show={openModal} onClose={setOpenModal} placement="top" showCloseIcon={false}>
			<Modal.Header title="Deactivate" />
			<Modal.Body>
				{MODAL_TEXT_1 + MODAL_TEXT_2}
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={() => setOpenModal(false)}
					disabled={loading}
					style={{ marginRight: '5px' }}
				>

					CANCEL
				</Button>

				<Button themeType="primary" onClick={() => handleSave()} disabled={loading}>
					SAVE
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default DeactiveModal;
