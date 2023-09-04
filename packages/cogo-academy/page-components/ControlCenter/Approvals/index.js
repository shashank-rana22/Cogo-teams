import { Modal } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import StyledTable from '../../../commons/StyledTable';

import getColumns from './getColumns';
import useListApprovals from './Hooks/useListApprovals';
import useUpdateApprovalRequest from './Hooks/useUpdateApprovalRequest';
import styles from './styles.module.css';

function ApprovalsModal({ showApprovalsModal = false, setShowApprovalsModal = () => {} }) {
	const router = useRouter();

	const { data, loading, getListApprovalRequests } = useListApprovals();
	const { loading:btnLoading, updateApprovalRequest } = useUpdateApprovalRequest({ getListApprovalRequests });

	const handleRedirect = (id, type) => {
		if (type === 'Test') {
			router.push(`/learning/test-module/create-test?mode=edit&id=${id}`);
		} else if (type === 'Course') {
			router.push(`/learning/course/create?mode=edit&id=${id}`);
		}
	};

	const approvalColumns = getColumns({ handleRedirect, updateApprovalRequest, btnLoading });

	const { list } = data || {};

	return (
		<div>
			<Modal
				show={showApprovalsModal}
				onClose={() => setShowApprovalsModal(false)}
				className={styles.modal_container}
			>
				<Modal.Header title="Approve Tests and Courses" />
				<Modal.Body>
					<div>
						<StyledTable
							columns={approvalColumns}
							data={list}
							loading={loading}
							emptyText="No Approvals Found"
						/>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ApprovalsModal;
