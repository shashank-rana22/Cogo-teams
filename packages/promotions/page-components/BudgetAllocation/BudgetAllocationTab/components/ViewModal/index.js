import { Modal, Pagination } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../../../../common/Layout';
import tableColumns from '../../configurations/promo-budget-details-table';
import controls from '../../controls/search-controls';
import useGetPromoAllocationDetail from '../../hooks/useGetPromoAllocationDetail';
import TableView from '../TableView';

import formattedData from './FormattedData';
import styles from './styles.module.css';

function ViewModal({
	setShowViewModal = () => {},
	selectedDetails = {},
	refetchListBudgetAllocation = () => {},
}) {
	const DEFAULT_VALUES = {};
	const {
		control,
		watch,
		formState: { errors = {} },
	} = useForm({
		defaultValues: DEFAULT_VALUES,
	});
	const agent_id = watch('agent_id');
	const {
		loading = true,
		promoAllocationList = [],
		paginationData = {},
		setPagination = () => {},
		refetch,
		setFilterValue,
	} = useGetPromoAllocationDetail({ selectedDetails });

	const { page_limit = 10, total_count = 1, page = 1 } = paginationData || {};

	useEffect(() => {
		setFilterValue(agent_id || '');
		setPagination({ page: 1 });
	}, [agent_id, setFilterValue, setPagination]);

	const closeModal = () => {
		setShowViewModal(false);
		refetchListBudgetAllocation();
	};

	return (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon
			onOuterClick={closeModal}
			className="primary xl"
			style={{ width: '80vw' }}
		>
			<Modal.Header title={`Budget allocation for KAM: 
			${selectedDetails.user_count} users`}
			/>
			<Modal.Body>
				<div className={styles.input_cont}>
					<Layout
						controls={controls(selectedDetails)}
						control={control}
						errors={errors}
					/>
				</div>
				<div className={styles.pagination_container}>
					<Pagination
						className="md"
						pageSize={page_limit}
						currentPage={page}
						totalItems={total_count}
						onPageChange={(val) => {
							setPagination((p) => ({ ...p, page: val }));
						}}
					/>
				</div>
				<TableView
					columns={tableColumns}
					formattedData={formattedData({
						promoAllocationList,
						refetch,
						selectedDetails,
					})}
					loading={loading}
				/>
				<div className={styles.pagination_container}>
					<Pagination
						className="md"
						pageSize={page_limit}
						currentPage={page}
						totalItems={total_count}
						onPageChange={(val) => {
							setPagination((p) => ({ ...p, page: val }));
						}}
					/>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ViewModal;
