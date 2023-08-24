/* eslint-disable no-magic-numbers */
import { Modal, Button } from '@cogoport/components';

import useUpdateOrganizationMarketFeedbackVerificationStatus
	from '../hooks/ModalHooks/useUpdateOrganizationMarketFeedbackVerificationStatus';
import useUpdateOrganizationServiceExpertiseManagerStatus
	from '../hooks/ModalHooks/UseUpdateOrganizationServiceExpertiseManagerStatus';
import useCreateOrganizationEvaluation from '../hooks/useCreateOrganizationEvaluation';

import NeedAnalysisData from './NeedAnalysisData';
import styles from './styles.module.css';
import SupplierEvaluationData from './SupplierEvaluationData';

function SupplierApprovalModal({
	t,
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

	const { createOrganizationEvaluation } = useCreateOrganizationEvaluation({
		organization_id,
		organization_service_id: service_id,
		setOpen,
		getOrganizationSupplierVerificationDetails,

	});

	const onClose = () => {
		setOpen(null);
	};
	const handleVerify = () => {
		if (open === 'need_analysis_report') {
			updateOrganizationServiceExpertiseManagerStatus({ manager_approval_status: 'verified' });
		} else if (open === 'market_feedback_report') {
			updateOrganizationMarketFeedbackVerificationStatus({ verification_status: 'verified' });
		} else if (open === 'evaluation_paramenter_report') {
			createOrganizationEvaluation({ verification_status: 'verified' });
		}
	};
	const handleReject = () => {
		if (open === 'need_analysis_report') {
			updateOrganizationServiceExpertiseManagerStatus({ manager_approval_status: 'rejected' });
		} else if (open === 'market_feedback_report') {
			updateOrganizationMarketFeedbackVerificationStatus({ verification_status: 'rejected' });
		} else if (open === 'evaluation_paramenter_report') {
			createOrganizationEvaluation({ verification_status: 'rejected' });
		}
	};

	return (
		<Modal size="lg" show={open} onClose={() => { onClose(); }} placement="centre">
			<Modal.Header title="Supplier Approval" className={styles.header} />
			<div className={styles.header} />
			<Modal.Body className={styles.body}>
				<div className={styles.text_middle}>
					{{
						need_analysis_report: t('supplier_page_supplier_approval_modal_need_analysis_title'),
						evaluation_paramenter_report:
						t('supplier_page_supplier_approval_modal_evaluation_parameter_title'),
					}[open]}

				</div>
				{{
					need_analysis_report:	<NeedAnalysisData
						t={t}
						service_type={service_type}
						organization_id={organization_id}
						id={service_id}
					/>,
					evaluation_paramenter_report: <SupplierEvaluationData
						t={t}
						organization_id={organization_id}
						id={service_id}
					/>,

				}[open]}
			</Modal.Body>
			<Modal.Footer style={{ gap: '15px' }}>
				<Button onClick={handleVerify} style={{ backgroundColor: '#ABCD62' }}>
					{t('supplier_page_supplier_approval_modal_verify_button_label')}
				</Button>
				<Button onClick={handleReject}>
					{t('supplier_page_supplier_approval_modal_reject_button_label')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SupplierApprovalModal;
