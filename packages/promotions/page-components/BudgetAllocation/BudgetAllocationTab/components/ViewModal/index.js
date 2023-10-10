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
	const {
		loading,
		promoAllocationList,
		paginationData,
		refetch,
		filters,
		setFilters,
	} = useGetPromoAllocationDetail({ selectedDetails });

	useEffect(() => {
		const subscription = watch(({ agent_id }) => {
			setFilters((state) => ({ ...state, agent_id: agent_id || '', page: 1 }));
		});
		return () => subscription.unsubscribe();
	}, [watch, setFilters]);

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
					<TablePagination filters={filters} setFilters={setFilters} data={paginationData} />
					<TableView
						columns={tableColumns}
						formattedData={formattedData({
							promoAllocationList,
							refetch,
							selectedDetails,
						})}
						loading={loading}
					/>
					<TablePagination filters={filters} setFilters={setFilters} data={paginationData} />
				</Modal.Body>
			</Modal>
		) : null

	);
}

export default ViewModal;
