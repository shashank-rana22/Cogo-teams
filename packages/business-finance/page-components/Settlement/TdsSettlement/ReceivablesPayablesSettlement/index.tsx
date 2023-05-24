import { Input, Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import Filters from '../../../commons/Filters';
import StyledTable from '../../../commons/StyledTable';
import receivablesPayablesColumn from '../../configurations/tds-settlement/receivable-payables-list';
import { CreateTdsFilters } from '../../configurations/tds-settlement/tds-filters';
import useTdsSettlement from '../../hook/useTdsSettlement';

import styles from './styles.module.css';
import TdsSingleCard from './TdsSingleCard';

function ReceivablesPayablesSettlement({
	active,
	globalFilters,
	setGlobalFilters,
}) {
	const {
		searchValue,
		setSearchValue,
		summData = {},
		data,
		tdsDocumentsLoading,
		editTdsLoading,
		approveTds,
		setSummData,
		setApiTdsData,
	} = useTdsSettlement({
		active,
		globalFilters,
		setGlobalFilters,
	});
	const rest = { 	loading: tdsDocumentsLoading };
	const column = receivablesPayablesColumn();
	const { list, pageNo = 0, totalRecords = 0 } = data || {};

	const clearFilters = () => {
		setGlobalFilters({});
		setApiTdsData({});
		setSummData({});
	};

	const showClearBtn = Object.keys(globalFilters).length > 1;
	return (
		<div>
			<div className={styles.main_div}>
				<div className={styles.div_style}>
					<Filters
						controls={CreateTdsFilters}
						filters={globalFilters}
						setFilters={setGlobalFilters}
						showClearBtn={showClearBtn}
						clearFilters={clearFilters}
					/>
				</div>
				<div className={styles.div_search}>
					<Input
						name="q"
						size="md"
						value={searchValue}
						onChange={(e: any) => setSearchValue(e)}
						placeholder="Search By Document Number"
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchlight height={15} width={15} />
							</div>
						)}
					/>
				</div>
			</div>

			{Object.keys(summData).length > 0 && (
				<TdsSingleCard
					globalFilters={globalFilters}
					active={active}
					data={summData}
					editTdsLoading={editTdsLoading}
					approveTds={approveTds}
				/>
			)}
			<div>
				<StyledTable
					data={list || []}
					columns={column}
					imageFind="FinanceDashboard"
					{...rest}
				/>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Pagination
						type="table"
						currentPage={pageNo}
						totalItems={totalRecords}
						pageSize={10}
						onPageChange={(pageValue: number) => {
							setGlobalFilters((p) => ({ ...p, pageIndex: pageValue }));
						}}

					/>
				</div>
			</div>
		</div>
	);
}

export default ReceivablesPayablesSettlement;
