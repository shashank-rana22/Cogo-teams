import { Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../../../../common/Layout';
import TablePagination from '../../common/TablePagination';
import tableColumns from '../../configurations/promo-budget-details-table';
import controls from '../../controls/search-controls';
import useGetPromoAllocationDetail from '../../hooks/useGetPromoAllocationDetail';
import TableView from '../TableView';

import formattedData from './FormattedData';
import styles from './styles.module.css';

function ViewModal({
	showViewModal = false,
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

	useEffect(() => {
		setFilterValue(agent_id || '');
		setPagination({ page: 1 });
	}, [agent_id, setFilterValue, setPagination]);

	const closeModal = () => {
		setShowViewModal(false);
		refetchListBudgetAllocation();
	};

	return (
		(showViewModal && selectedDetails) ? (
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
					<TablePagination setFilters={setPagination} data={paginationData} />
					<TableView
						columns={tableColumns}
						formattedData={formattedData({
							promoAllocationList,
							refetch,
							selectedDetails,
						})}
						loading={loading}
					/>
					<TablePagination setFilters={setPagination} data={paginationData} />
				</Modal.Body>
			</Modal>
		) : null

	);
}

export default ViewModal;
