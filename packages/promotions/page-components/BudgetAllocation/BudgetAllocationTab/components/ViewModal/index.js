import { Modal, Pagination } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState, useEffect } from 'react';

import Layout from '../../../../../common/Layout';
import tableColumns from '../../configurations/promo-budget-details-table';
import controls from '../../controls/search-controls';
import useGetPromoAllocationDetail from '../../hooks/useGetPromoAllocationDetail';
import StyledTableComponent from '../StyledTableComponent';

import formattedData from './FormattedData';
import styles from './styles.module.css';

function ViewModal({
	setShowViewModal = () => {},
	showViewModal = false,
	selectedDetails = {},
	refetchListBudgetAllocation = () => {},
}) {
	const [filterValue, setFilterValue] = useState('');
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
		loading,
		promoAllocationList,
		paginationData = {},
		pagination,
		setPagination,
		refetch,
	} = useGetPromoAllocationDetail({ selectedDetails, filterValue });

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
			show={showViewModal}
			onClose={closeModal}
			onOuterClick={closeModal}
			className="primary xl"
			style={{ width: '80%' }}
		>
			<div className={styles.top_container}>
				<div className={styles.header}>
					Budget allocation for KAM:
					<div className={styles.users}>
						{selectedDetails.user_count}
						users
					</div>
				</div>
				<div className={styles.input_cont}>
					<Layout
						controls={controls(selectedDetails)}
						control={control}
						errors={errors}
					/>
				</div>
			</div>
			<StyledTableComponent
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
					pageLimit={paginationData.page_limit}
					pagination={paginationData.page}
					total={paginationData.total_count}
					onPageChange={(val) => {
						setPagination({ ...pagination, page: val });
					}}
				/>
			</div>
		</Modal>
	);
}

export default ViewModal;
