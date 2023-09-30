import { Button, Modal, Toast } from '@cogoport/components';
import { useCallback } from 'react';

import useUpdateMargin from '../../../../hooks/useUpdateMargin';

function StatusUpdateModal({
	show = false,
	setShow = () => {},
	id = '',
	refetch = () => {},
	setMarginBreakupData = () => {},
}) {
	const { loading, onSubmit } = useUpdateMargin();

	const handleSave = useCallback(async (status) => {
		const success = await onSubmit({ params: { id, status } });
		if (success) {
			setShow(false);
			setMarginBreakupData({});
			refetch();
			Toast.success('Status has been updated successfully!');
		}
	}, [id, setMarginBreakupData, setShow, refetch, onSubmit]);

	return (
		<Modal show={show} onClose={setShow} placement="top" showCloseIcon={false}>
			<Modal.Header title="UPDATE STATUS" />
			<Modal.Body>
				Are you sure, you want to update the margin status?
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={() => handleSave('inactive')}
					disabled={loading}
					style={{ marginRight: '5px' }}
				>

					REJECT
				</Button>

				<Button themeType="primary" onClick={() => handleSave('active')} disabled={loading}>
					APPROVE
				</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default StatusUpdateModal;
