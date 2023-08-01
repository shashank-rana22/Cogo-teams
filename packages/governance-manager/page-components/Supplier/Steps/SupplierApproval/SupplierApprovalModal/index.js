/* eslint-disable no-magic-numbers */
import { Modal, Button, Textarea } from '@cogoport/components';

import useUpdateOrganizationMarketFeedbackVerificationStatus
	from '../hooks/ModalHooks/useUpdateOrganizationMarketFeedbackVerificationStatus';
import useUpdateOrganizationServiceExpertiseManagerStatus
	from '../hooks/ModalHooks/UseUpdateOrganizationServiceExpertiseManagerStatus';

import styles from './styles.module.css';

function SupplierApprovalModal({
	open, setOpen,
	organization_id, service_id,
	getOrganizationSupplierVerificationDetails,
	service_type,
}) {
	const { updateOrganizationServiceExpertiseManagerStatus } = useUpdateOrganizationServiceExpertiseManagerStatus({
		organization_id,
		service_id,
		setOpen,
		getOrganizationSupplierVerificationDetails,
	});
	const {
		updateOrganizationMarketFeedbackVerificationStatus,
	} = useUpdateOrganizationMarketFeedbackVerificationStatus({
		organization_id,
		service_id,
		service_type,
		getOrganizationSupplierVerificationDetails,
		setOpen,
	});

	const onClose = () => {
		setOpen(null);
	};
	const handleVerify = () => {
		if (open === 'need_analysis_report') {
			updateOrganizationServiceExpertiseManagerStatus({ manager_approval_status: 'accepted' });
		} else if (open === 'market_feedback_report') {
			updateOrganizationMarketFeedbackVerificationStatus({ verification_status: 'accepted' });
		} else if (open === 'evaluation_paramenter_report') {
			console.log('ks');
		}
	};
	const handleReject = () => {
		if (open === 'need_analysis_report') {
			updateOrganizationServiceExpertiseManagerStatus({ manager_approval_status: 'rejected' });
		} else if (open === 'market_feedback_report') {
			updateOrganizationMarketFeedbackVerificationStatus({ verification_status: 'rejected' });
		}
	};

	return (
		<Modal size="md" show={open} onClose={() => { onClose(); }} placement="centre">
			<Modal.Header title="Supplier Approval" className={styles.header} />
			<div className={styles.header} />
			<Modal.Body className={styles.body}>
				<div className={styles.text_middle}>Need Analysis Report</div>
				<Textarea
					name="a4"
					size="md"
					defaultValue=""
					placeholder=""
					rows={4}
					style={{ height: '75%', marginBottom: '34px' }}
				/>
			</Modal.Body>
			<Modal.Footer style={{ gap: '15px' }}>
				<Button onClick={handleVerify} style={{ backgroundColor: '#ABCD62' }}>Verify</Button>
				<Button onClick={handleReject}>Reject</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SupplierApprovalModal;
