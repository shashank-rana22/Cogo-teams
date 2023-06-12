import React, { useState } from 'react';

import cycleWiseExceptionTable from '../../configurations/cycle-wise-exception-table';
import masterExceptionColumn from '../../configurations/master-exception-table';
import useMasterException from '../../hooks/useMasterException';

import StyledTable from './StyledTable';
import styles from './styles.module.css';

function ExceptionsManagement() {
	const [filters, setFilters] = useState({});
	const [exceptionFilter, setExceptionFilter] = useState({});
	const [showCycleExceptions, setShowCycleExceptions] = useState(false);
	const { data, loading, searchValue, setSearchValue } = useMasterException({ exceptionFilter });

	const subTab = [
		{
			key   : 'masterExceptionList',
			label : 'Master Exception List',
			badge : '21',
		},
		{
			key   : 'cycleWiseExceptionList',
			label : 'Cycle Wise Exception List',
		},
	];
	const [subTabsValue, setSubTabsValue] = useState('masterExceptionList');
	const CYCLE_WISE_COLUMN = cycleWiseExceptionTable({ setShowCycleExceptions });
	const rest = { loading };
	return (
		<div>
			<div className={styles.flex}>
				{subTab.map((item) => (
					<div
						key={item.key}
						onClick={() => {
							setFilters((p) => ({ ...p, pageIndex: 1 })); setSubTabsValue(item.key);
						}}
						role="presentation"
					>
						<div className={item.key === subTabsValue ? styles.sub_container_click : styles.sub_container}>
							{item?.label}
							<span>{item?.badge}</span>
						</div>
					</div>
				))}
			</div>

			<StyledTable
				data={data?.list || []}
				columns={subTabsValue === 'masterExceptionList' ? masterExceptionColumn() : CYCLE_WISE_COLUMN}
				{...rest}
				exceptionFilter={exceptionFilter}
				setExceptionFilter={setExceptionFilter}
				subTabsValue={subTabsValue}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				showCycleExceptions={showCycleExceptions}
				setShowCycleExceptions={setShowCycleExceptions}
			/>
		</div>
	);
}

export default ExceptionsManagement;
