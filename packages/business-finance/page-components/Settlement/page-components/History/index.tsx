import { Checkbox, Input, Toggle } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyStateDocs from '../../../commons/EmptyStateDocs';
import Filter from '../../../commons/Filters';
import { historyFilters } from '../../configurations/history-filters';
import useHistorySettlemet from '../../hooks/useHistorySettlement';

import CustomTable from './CustomTable';
import SelectState from './SelectState';
import styles from './styles.module.css';

interface ListItem {
	id: string;
	documentValue: string;
	documentAmount: number;
	settledAmount: number;
	balanceAmount: number;
	transactionDate: string;
	lastEditedDate: string;
	currency: string;
	documentNo: string;
	accountType: string;
	accMode: string;
	notPostedSettlementIds : Array<number>;
	ledCurrency: string;
}

interface DataInterface {
	list: ListItem[],
}

function History() {
	const { query } = useRouter();

	const [checkedRows, setCheckedRows] = useState({});

	const { data, loading, filters, setFilters, apiData, refetch } = useHistorySettlemet();

	const { list = [] } = (apiData as DataInterface) || {};

	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/settlement/history`;
	};

	const onPageChange = (val:number) => {
		setFilters({ ...filters, page: val });
	};

	const onChangeTableHeaderCheckbox = (event) => {
		event.stopPropagation();

		const listIds = (list || []).map(({ id }) => id);

		if (event.target.checked) {
			const filterData = (list || [])
				?.filter((item) => item?.notPostedSettlementIds?.length > 0);

			const NEW_CHECKED = {};
			filterData.forEach((item) => { NEW_CHECKED[item?.id] = item.notPostedSettlementIds; });
			setCheckedRows({
				...checkedRows,
				...NEW_CHECKED,
			});
		} else {
			const NEW_UNCHECK = { ...checkedRows };

			listIds.forEach((id) => {
				if (Object.keys(NEW_UNCHECK).includes(id)) {
					delete NEW_UNCHECK[id];
				}
			});
			setCheckedRows({
				...NEW_UNCHECK,
			});
		}
	};

	const onChangeTableBodyCheckbox = (event, item) => {
		event.stopPropagation();
		if (event.target.checked) {
			setCheckedRows({
				...checkedRows,
				[item?.id]: item?.notPostedSettlementIds,
			});
		} else {
			const NEW_REMOVE_CHECK = { ...checkedRows };
			delete NEW_REMOVE_CHECK[item?.id];
			setCheckedRows({
				...(NEW_REMOVE_CHECK),
			});
		}
	};

	const getTableBodyCheckbox = (item) => {
		const isChecked = (Object.keys(checkedRows) || []).includes(
			item?.id,
		);

		return item?.notPostedSettlementIds?.length ? (
			<Checkbox
				checked={isChecked}
				disabled={loading}
				onChange={(event) => onChangeTableBodyCheckbox(event, item)}
			/>
		) : (
			<Checkbox
				disabled
			/>
		);
	};

	const isAllChecked = isEmpty((list || [])?.filter((item) => item?.notPostedSettlementIds?.length > 0
	&& !Object.keys(checkedRows).includes(item?.id)));

	const showHeaderCheckbox = !isEmpty((list || [])?.filter(
		(item) => item?.notPostedSettlementIds?.length > 0,
	));

	return (
		<div>
			<div className={styles.filter_container}>
				<Filter controls={historyFilters()} setFilters={setFilters} filters={filters} pageKey="page" />
				<div className={styles.toggle_Div}>
					<Toggle
						name="toggle"
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>
					<Input
						name="query"
						onChange={(val) => { setFilters({ ...filters, query: val, page: 1 }); }}
						placeholder="Search by Document Number"
						size="md"
						suffix={<IcMSearchlight height="20px" width="20px" />}
						className={styles.search_div}
					/>
				</div>
			</div>
			{filters?.orgId &&	(
				<CustomTable
					apiData={apiData}
					filters={filters}
					setFilters={setFilters}
					loading={loading}
					onPageChange={onPageChange}
					isAllChecked={isAllChecked}
					showHeaderCheckbox={showHeaderCheckbox}
					getTableBodyCheckbox={getTableBodyCheckbox}
					onChangeTableHeaderCheckbox={onChangeTableHeaderCheckbox}
					checkedRows={checkedRows}
					setCheckedRows={setCheckedRows}
					refetch={refetch}
				/>
			)}
			{!filters?.orgId && <SelectState />}
			{!loading && data?.list?.length <= 0 && <EmptyStateDocs />}
		</div>
	);
}

export default History;
