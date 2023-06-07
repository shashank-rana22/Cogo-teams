import { Button, Modal, Pagination } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../common/EmptyState';
import StyledTable from '../StyledTable';

import CompanyPolicyModal from './CompanyPolicyModal';
import styles from './styles.module.css';
import useCompanyPolicyDetails from './useCompanyPolicyDetails';

function CompanyPolicyDetails() {
	const {
		columns, listLoading, list, showModal, setShowModal, refetchList, data, setPage, page,
	} = useCompanyPolicyDetails();

	return (
		<div className={styles.container}>
			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					onClick={() => setShowModal(true)}
				>
					Add New Policy
				</Button>
			</div>

			{(list || []).length > 0 || listLoading ? (
				<>
					<StyledTable
						columns={columns}
						data={list}
						loading={listLoading}
					/>

					{data?.total_count > 10 && (
						<div className={styles.pagination_container}>
							<Pagination
								totalItems={data?.total_count || 0}
								currentPage={page || 1}
								pageSize={data?.page_limit}
								onPageChange={setPage}
							/>
						</div>
					)}
				</>
			) : <EmptyState emptyText="No Company Policy Added" />}

			<Modal
				size="md"
				show={showModal}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header title="Create New Company Policy" />
				<Modal.Body>
					<CompanyPolicyModal
						showModal={showModal}
						setShowModal={setShowModal}
						refetchList={refetchList}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default CompanyPolicyDetails;
