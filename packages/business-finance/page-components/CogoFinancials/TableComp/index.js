import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import ColumnCard from '../Common/CustumTable/ColumnCard';
import Header from '../Common/CustumTable/Header';
import EmptyState from '../Common/EmptyState';
import { customersConfig } from '../Configuration/customers';
import useGetShipmentList from '../hooks/useGetShipmentList';

import styles from './styles.module.css';

const EMPTY_STATE = 6;
const PAGE_SIZE = 10;

function TableComp({
	activeShipmentCard = '',
	entity = '',
	timeRange = '',
	filter = '',
	statsType = '',
	activeBar = '',
	customDate = new Date(),
	taxType = '',
	type = '',
	tableFilters = {},
	setTableFilters = () => { },
}) {
	const config = customersConfig({ activeShipmentCard });
	const {
		serviceLevelData,
		serviceLevelLoading,
	} = useGetShipmentList({
		entity,
		timeRange,
		statsType,
		filter,
		activeBar,
		customDate,
		tableFilters,
		setTableFilters,
	});

	return (
		<div className={styles.table}>
			<Header config={config} />
			{isEmpty(serviceLevelData) && !serviceLevelLoading ? <EmptyState /> : null}
			{(!isEmpty(serviceLevelData) || serviceLevelLoading)
				? (serviceLevelData?.list || Array(EMPTY_STATE).fill(null)).map((item) => (
					<ColumnCard
						loading={serviceLevelLoading}
						config={config}
						key={item?.id}
						item={item}
						taxType={taxType}
						type={type}
					/>
				)) : null}
			<div className={styles.pagination}>
				<Pagination
					className={styles.pagination}
					type="number"
					currentPage={serviceLevelData?.pageNo}
					totalItems={serviceLevelData?.totalRecords}
					pageSize={PAGE_SIZE}
					onPageChange={(page) => { setTableFilters({ ...tableFilters, pageIndex: page }); }}
				/>
			</div>
		</div>
	);
}

export default TableComp;
