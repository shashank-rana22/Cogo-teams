import { Pagination } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import cycleWiseExceptionTable from '../../configurations/cycle-wise-exception-table';
import masterExceptionColumn from '../../configurations/master-exception-table';
import useMasterException from '../../hooks/useMasterException';

import ConfirmationModal from './ConfirmationModal';
import ExceptionList from './ExceptionList';
import styles from './styles.module.css';

const SUB_TAB = [
	{
		key   : 'masterExceptionList',
		label : 'Master Exception List',
	},
	{
		key   : 'cycleWiseExceptionList',
		label : 'Cycle Wise Exception List',
	},
];

function ExceptionsManagement() {
	const [exceptionFilter, setExceptionFilter] = useState({});
	const [showCycleExceptions, setShowCycleExceptions] = useState(false);
	const [subTabsValue, setSubTabsValue] = useState('masterExceptionList');
	const [cycleListId, setCycleListId] = useState();
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [masterCount, setMasterCount] = useState(0);
	const [cyclewiseCount, setCyclewiseCount] = useState(0);
	const [entityId, setEntityId] = useState(null);

	const {
		data,
		masterExceptionLoading,
		searchValue,
		setSearchValue,
		cycleWiseData,
		deleteMasterException,
		deleteMasterLoading,
		sort,
		setSort,
		cycleWiseLoading,
		getMasterList,
	} = useMasterException({ exceptionFilter, subTabsValue, setShowConfirmationModal, setExceptionFilter });

	const [masterListId, setMasterListId] = useState();

	const CYCLE_WISE_COLUMN = cycleWiseExceptionTable({
		sort,
		setSort,
		exceptionFilter,
		setExceptionFilter,
		setShowCycleExceptions,
		setCycleListId,
		setEntityId,
	});
	const MASTER_COLUMN = masterExceptionColumn({
		sort,
		setSort,
		deleteMasterException,
		deleteMasterLoading,
		exceptionFilter,
		setExceptionFilter,
		setShowConfirmationModal,
		setMasterListId,
	});
	const SUB_TABS_VALUE = subTabsValue === 'masterExceptionList';

	const loading = SUB_TABS_VALUE ? masterExceptionLoading : cycleWiseLoading;
	const rest = { loading };
	const { list = [], pageNo = 0, totalRecords } = data || {};
	const { list:cycleList = [], pageNo :cyclePageNo = 0, totalRecords:cycleTotalRecords } = cycleWiseData || {};

	const finalTotalRecords = totalRecords > 0 ? totalRecords : list.length;
	const finalCycleTotalRecords = cycleTotalRecords > 0 ? cycleTotalRecords : cycleList.length;

	useEffect(() => {
		setMasterCount(totalRecords);
		setCyclewiseCount(cycleTotalRecords);
	}, [cycleTotalRecords, totalRecords]);

	return (
		<div>
			<div className={styles.flex}>
				{SUB_TAB?.map((item) => (
					<div
						key={item.key}
						onClick={() => {
							setExceptionFilter((p) => ({ ...p, pageIndex: 1 })); setSubTabsValue(item.key);
						}}
						role="presentation"
					>
						<div className={item.key === subTabsValue ? styles.sub_container_click : styles.sub_container}>
							{item?.label}
							{' '}
							{item.key === 'masterExceptionList' ? (
								<span>
									(
									{masterCount || 0}
									)
								</span>
							) : (
								<span>
									(
									{cyclewiseCount || 0}
									)
								</span>
							)}
						</div>
					</div>
				))}
			</div>

			{showConfirmationModal ? (
				<ConfirmationModal
					showConfirmationModal={showConfirmationModal}
					setShowConfirmationModal={setShowConfirmationModal}
					deleteMasterException={deleteMasterException}
					deleteMasterLoading={deleteMasterLoading}
					masterListId={masterListId}
				/>
			) : null}

			<ExceptionList
				data={SUB_TABS_VALUE ? list || [] : cycleList || []}
				columns={SUB_TABS_VALUE ? MASTER_COLUMN : CYCLE_WISE_COLUMN}
				exceptionFilter={exceptionFilter}
				setExceptionFilter={setExceptionFilter}
				subTabsValue={subTabsValue}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				showCycleExceptions={showCycleExceptions}
				setShowCycleExceptions={setShowCycleExceptions}
				cycleListId={cycleListId}
				getMasterList={getMasterList}
				entityId={entityId}
				{...rest}
			/>

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={SUB_TABS_VALUE ? pageNo : cyclePageNo}
					totalItems={SUB_TABS_VALUE ? finalTotalRecords : finalCycleTotalRecords}
					pageSize={10}
					onPageChange={(pageValue: number) => {
						setExceptionFilter((prev) => ({ ...prev, pageIndex: pageValue }));
					}}
				/>
			</div>
		</div>
	);
}

export default ExceptionsManagement;
