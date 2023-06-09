import { Button, Modal, Pagination } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../common/EmptyState';
import StyledTable from '../StyledTable';

import CompanyPolicyModal from './CompanyPolicyModal';
import styles from './styles.module.css';
import useCompanyPolicyDetails from './useCompanyPolicyDetails';

const TOTAL_COUNT = 10;
const INITIAL_TOTAL_COUNT = 0;
const INITIAL_PAGE = 1;
const ARRAY_LENGTH = 0;

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

			{(list || []).length > ARRAY_LENGTH || listLoading ? (
				<>
					<StyledTable
						columns={columns}
						data={list}
						loading={listLoading}
					/>

					{data?.total_count > TOTAL_COUNT && (
						<div className={styles.pagination_container}>
							<Pagination
								totalItems={data?.total_count || INITIAL_TOTAL_COUNT}
								currentPage={page || INITIAL_PAGE}
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
