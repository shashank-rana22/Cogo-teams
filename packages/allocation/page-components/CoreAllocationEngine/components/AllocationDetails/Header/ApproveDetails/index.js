import { Button, Modal } from '@cogoport/components';

import useApproveAllocationDetails from '../../../../hooks/useApproveAllocationDetails';

import styles from './styles.module.css';

function ApproveDetails({ showApprove, setShowApprove, listRefetch }) {
	const {
		onApproveDetails,
		loadingApproveDetails,
	} = useApproveAllocationDetails({ setShowApprove, listRefetch });
	return (
		<Modal
			size="sm"
			placement="top"
			show={showApprove}
			closeOnOuterClick
			showCloseIcon
			onClose={() => setShowApprove(false)}
		>
			<Modal.Header title="Approve Details" />

			<Modal.Body>
				<p className={styles.main_warning}>
					Are you sure you want to approve all the details ?
				</p>

				<p className={styles.secondary_warning}>
					Once the details are approved, stakeholders cannot be changed.
				</p>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="primary"
					onClick={onApproveDetails}
					disabled={loadingApproveDetails}
				>
					Yes, Approve
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ApproveDetails;
