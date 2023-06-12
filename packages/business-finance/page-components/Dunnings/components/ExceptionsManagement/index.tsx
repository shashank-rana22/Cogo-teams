import React, { useState } from 'react';

import cycleWiseExceptionTable from '../../configurations/cycle-wise-exception-table';
import masterExceptionColumn from '../../configurations/master-exception-table';

import StyledTable from './StyledTable';
import styles from './styles.module.css';

function ExceptionsManagement() {
	const rest = 'loading';
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
	const [filters, setFilters] = useState({});
	const [exceptionFilter, setExceptionFilter] = useState({});
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
				data={[]}
				columns={subTabsValue === 'masterExceptionList' ? masterExceptionColumn() : cycleWiseExceptionTable()}
				imageFind="FinanceDashboard"
				{...rest}
				exceptionFilter={exceptionFilter}
				setExceptionFilter={setExceptionFilter}
				subTabsValue={subTabsValue}
			/>
		</div>
	);
}

export default ExceptionsManagement;
