import { Select, Input, Pagination } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StyledTable from '../../../../commons/styledTable';
import SettlementList from '../../../../configs/Settlement_table';
import { ACCOUNT_TYPE } from '../../../../constants';
import useGetSettlementTable from '../../../../hooks/useGetSettlementTable';
import useHistorySingleDataList from '../../../../hooks/useHistorySingleDataList';

import MoreDetailsModal from './MoreDetailModal';
import styles from './styles.module.css';

interface Props {
	organizationId: string,
	entityCode?: string
}

function SettlementTable({ organizationId, entityCode }: Props) {
	const {
		singleData,
		getHistoryChild,
		singleListLoading,
		globalFilters,
		setGlobalFilters,
	} = useHistorySingleDataList();

	const {
		settlementList,
		loading,
		settlementFilters,
		setSettlementFilters,
	} = useGetSettlementTable(organizationId, entityCode);

	const [active, setActive] = useState(false);

	const { list, pageNo, totalRecords } = settlementList || {};

	const onChange = (val:string, name:string) => {
		setSettlementFilters((p) => ({ ...p, [name]: val }));
	};

	return (
		<div>
			<div className={styles.filter_wrap}>
				<Select
					placeholder="Select Status"
					value={settlementFilters.accountType}
					onChange={(val:string) => onChange(val, 'accountType')}
					options={ACCOUNT_TYPE}
					style={{ width: 200, marginRight: '16px' }}
				/>
				<Input
					className="primary md"
					placeholder="Search by Document Number"
					value={settlementFilters.query}
					onChange={(val) => onChange(val, 'query')}
					prefix={<IcMSearchdark />}
					style={{ width: 300 }}
				/>
			</div>
			<StyledTable
				data={list}
				columns={SettlementList({
					setActive,
					getHistoryChild,
				})}
				loading={loading}
			/>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={pageNo}
					totalItems={totalRecords}
					pageSize={settlementFilters.pageLimit}
					onPageChange={(val) => setSettlementFilters({ ...settlementFilters, page: val })}
				/>

			</div>

			<MoreDetailsModal
				active={active}
				setActive={setActive}
				singleData={singleData}
				singleListLoading={singleListLoading}
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}

			/>

		</div>
	);
}

export default SettlementTable;
