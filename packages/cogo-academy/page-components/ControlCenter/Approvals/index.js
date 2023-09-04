import { Modal, Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import StyledTable from '../../../commons/StyledTable';

import getColumns from './getColumns';
import useListApprovals from './Hooks/useListApprovals';
import useUpdateApprovalRequest from './Hooks/useUpdateApprovalRequest';
import styles from './styles.module.css';

const ROUTE_MAPPING = {
	Test              : '/learning/test-module/create-test?mode=edit&id=',
	CogoAcademyCourse : '/learning/course/create?mode=edit&id=',
};

const INITIAL_PAGE = 1;
function ApprovalsModal({ showApprovalsModal = false, setShowApprovalsModal = () => {} }) {
	const router = useRouter();

	const [page, setPage] = useState(INITIAL_PAGE);

	const { data, loading, getListApprovalRequests } = useListApprovals(page);
	const { loading:btnLoading, updateApprovalRequest } = useUpdateApprovalRequest({ getListApprovalRequests });

	const { list, total_count, page_limit, page:pageNumber } = data || {};

	const handleRedirect = (id, type) => {
		const url = ROUTE_MAPPING[type];
		router.push(url + id);
	};

	const approvalColumns = getColumns({ handleRedirect, updateApprovalRequest, btnLoading });
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
					{total_count > page_limit ? (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={pageNumber}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={(v) => setPage(v)}
							/>
						</div>
					) : null}
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ApprovalsModal;
