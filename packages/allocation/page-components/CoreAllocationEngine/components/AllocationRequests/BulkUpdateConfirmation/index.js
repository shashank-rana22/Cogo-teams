import { Button, Modal } from '@cogoport/components';

import useBulkApproveRequest from '../../../hooks/useBulkApproveRequest';

function BulkUpdateConfirmation(props) {
	const { checkedRowsId } = props;

	const { loading, onBulkApprove } = useBulkApproveRequest({ ...props });

	return (
		<>
			<Modal.Header title="Bulk Approve Requests" />

			<Modal.Body>
				Are you sure you want to
				{' '}
				Approve
				{' '}
				{checkedRowsId.length || 'these'}
				{' '}
				Request(s)
				?
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="submit"
					size="md"
					themeType="primary"
					disabled={loading}
					onClick={onBulkApprove}
				>
					Yes, I do
				</Button>
			</Modal.Footer>
		</>
	);
}

export default BulkUpdateConfirmation;
