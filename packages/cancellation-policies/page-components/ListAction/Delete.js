import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useUpdateShipmentCancellationCharges from '../../hooks/useUpdateShipmentCancellationCharges';

function Delete({
	show = null, setShow = () => {}, item = {},
	refetch = () => {},
}) {
	const { apiTrigger = () => {}, loading = false } = useUpdateShipmentCancellationCharges({
		successMessage : 'Deleted Successfully',
		refetch        : () => {
			refetch();
			setShow(false);
		},
	});

	const onDelete = () => {
		apiTrigger({ ...item, status: 'inactive' });
	};

	return show ? (
		<Modal show={!isEmpty(show)} onClose={() => setShow(null)} placement="top">
			<Modal.Header title="DELETE CANCELLATION CHARGES" />

			<Modal.Body>
				<div>
					Are you sure you want to delete?
					{' '}

				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					style={{ marginRight: 8 }}
					disabled={loading}
					onClick={() => setShow(false)}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					onClick={onDelete}
				>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	) : null;
}

export default Delete;
