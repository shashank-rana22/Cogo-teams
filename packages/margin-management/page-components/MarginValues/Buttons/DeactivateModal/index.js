import { Modal, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import useUpdateMargin from '../../../../hooks/useUpdateMargin';

const M1 = 'Are you sure you want to deactivate this margin? Once you deactivate a margin, ';
const M2 = 'you cannot activate it again.';
function DeactiveModal({
	setOpenModal = () => {},
	id = '', setMarginBreakupData = () => {}, type = '', openModal = false,
}) {
	const router = useRouter();
	const { loading, onSubmit } = useUpdateMargin();
	const handleSave = async () => {
		const params = {
			id,
			status: 'inactive',
		};
		const success = await onSubmit({ params });
		if (success) {
			setOpenModal(false);
			setMarginBreakupData({});
			// refetch();
			// listRefetch();

			if (type === 'edit') {
				router.push('/margins');
			}
		}
	};
	return (
		<Modal show={openModal} onClose={setOpenModal} placement="top" showCloseIcon={false}>
			<Modal.Header title="Deactivate" />
			<Modal.Body>
				{M1 + M2}
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
