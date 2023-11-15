import { Pagination, Table, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useSmeDashboardStats from '../../../hooks/useSmeDashboardStats';

import getTableColumns from './getTableColumns';
import styles from './styles.module.css';

const TABLE_TYPES = {
	search    : 'search_exception_data',
	call      : 'call_exception_data',
	mail      : 'mail_exception_data',
	quotation : 'quotation_exception_data',
	booking   : 'booking_exception_data',
};

function AgentsExceptionList({ filterParams = {} }) {
	const [page, setPage] = useState(1);
	const [tableType, setTableType] = useState('search');

	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks: `get_${tableType}_exception_data`, filterParams, page });

	const tableColumns = getTableColumns() || [];

	const reqData = dashboardData?.[TABLE_TYPES?.[tableType]] || {};

	const { list = [], total_count = 0 } = reqData || {};

	return (
		<div className={styles.table_body}>
			<div className={styles.header_bar}>
				{Object.entries(TABLE_TYPES)?.map(
					([itm, valueKey]) => (
						<div
							key={itm}
							role="presentation"
							onClick={() => {
								setTableType(itm);
								setPage(1);
							}}
							className={cl`${styles.table_header} 
                                    ${tableType === itm ? styles.selected_header : ''}`}
						>
							<div className={styles.table_count}>
								{dashboardData?.[valueKey]?.total_count || '-'}
							</div>
							{`Not a Single ${startCase(itm)}`}
						</div>
					),
				)}
			</div>

			<Table
				columns={tableColumns}
				data={list}
				layoutType="table"
				loading={dashboardLoading}
				loadingRowsCount={5}
			/>

			<div className={styles.footer_bar}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={5}
					onPageChange={(val) => setPage(val)}
				/>
			</div>
		</div>
	);
}

export default AgentsExceptionList;
