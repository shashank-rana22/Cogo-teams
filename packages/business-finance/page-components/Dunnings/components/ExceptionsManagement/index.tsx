import { Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import cycleWiseExceptionTable from '../../configurations/cycle-wise-exception-table';
import masterExceptionColumn from '../../configurations/master-exception-table';
import useMasterException from '../../hooks/useMasterException';

import StyledTable from './StyledTable';
import styles from './styles.module.css';

function ExceptionsManagement() {
	const [exceptionFilter, setExceptionFilter] = useState({});
	const [showCycleExceptions, setShowCycleExceptions] = useState(false);
	const [sort, setSort] = useState({});
	const [subTabsValue, setSubTabsValue] = useState('masterExceptionList');
	const {
		data, loading, searchValue,
		setSearchValue,
		cycleWiseData,
	} = useMasterException({ exceptionFilter, sort, subTabsValue });
	const subTab = [
		{
			key   : 'masterExceptionList',
			label : 'Master Exception List',
		},
		{
			key   : 'cycleWiseExceptionList',
			label : 'Cycle Wise Exception List',
		},
	];

	const CYCLE_WISE_COLUMN = cycleWiseExceptionTable({ setShowCycleExceptions });
	const MASTER_COLUMN = masterExceptionColumn({ sort, setSort });
	const rest = { loading };
	const { list, pageNo = 0, totalRecords } = data || {};
	const { list:cycleList, pageNo :cyclePageNo = 0, totalRecords:cycleTotalRecords } = cycleWiseData || {};

	return (
		<div>
			<div className={styles.flex}>
				{subTab?.map((item) => (
					<div
						key={item.key}
						onClick={() => {
							setExceptionFilter((p) => ({ ...p, pageIndex: 1 })); setSubTabsValue(item.key);
						}}
						role="presentation"
					>
						<div className={item.key === subTabsValue ? styles.sub_container_click : styles.sub_container}>
							{item?.label}
							<span>{subTabsValue === 'masterExceptionList' ? totalRecords : cycleTotalRecords}</span>
						</div>
					</div>
				))}
			</div>

			<StyledTable
				data={subTabsValue === 'masterExceptionList' ? list || [] : cycleList || []}
				columns={subTabsValue === 'masterExceptionList' ? MASTER_COLUMN : CYCLE_WISE_COLUMN}
				exceptionFilter={exceptionFilter}
				setExceptionFilter={setExceptionFilter}
				subTabsValue={subTabsValue}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				showCycleExceptions={showCycleExceptions}
				setShowCycleExceptions={setShowCycleExceptions}
				{...rest}
			/>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Pagination
					type="table"
					currentPage={subTabsValue === 'masterExceptionList' ? pageNo : cyclePageNo}
					totalItems={subTabsValue === 'masterExceptionList' ? totalRecords : cycleTotalRecords}
					pageSize={10}
					onPageChange={(pageValue: number) => {
						setExceptionFilter((p) => ({ ...p, pageIndex: pageValue }));
					}}
				/>
			</div>
		</div>
	);
}

export default ExceptionsManagement;
