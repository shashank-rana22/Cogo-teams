import { Checkbox, Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyStateDocs from '../../../commons/EmptyStateDocs';
import Filter from '../../../commons/Filters';
import { historyFilters } from '../../configurations/history-filters';
import useHistorySettlemet from '../../hooks/useHistorySettlement';

import CustomTable from './customTable';
import SelectState from './SelectState';
import styles from './styles.module.css';

function History() {
	const [checkedRows, setCheckedRows] = useState({});

	const { loading, filters, setFilters, apiData, refetch } = useHistorySettlemet();

	const onPageChange = (val:number) => {
		setFilters({ ...filters, page: val });
	};

	const onChangeTableHeaderCheckbox = (event) => {
		event.stopPropagation();

		const listIds = (apiData?.list || []).map(({ id }) => id);

		if (event.target.checked) {
			const filterData = (apiData?.list || [])
				?.filter((item) => item?.notPostedSettlementIds?.length > 0
				&& !(item?.ledCurrency === GLOBAL_CONSTANTS.currency_code.VND));

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

		return item?.notPostedSettlementIds?.length && !(item?.ledCurrency === GLOBAL_CONSTANTS.currency_code.VND) ? (
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

	const isAllChecked = isEmpty((apiData?.list || [])?.filter((item) => item?.notPostedSettlementIds?.length > 0
	&& !(item?.ledCurrency === GLOBAL_CONSTANTS.currency_code.VND)
	&& !Object.keys(checkedRows).includes(item?.id)));

	const showHeaderCheckbox = !isEmpty((apiData?.list || [])?.filter(
		(item) => item?.notPostedSettlementIds?.length > 0
		&& !(item?.ledCurrency === GLOBAL_CONSTANTS.currency_code.VND),
	));

	return (
		<div>
			<div className={styles.filter_container}>
				<Filter controls={historyFilters(filters)} setFilters={setFilters} filters={filters} pageKey="page" />
				<Input
					name="query"
					onChange={(val) => { setFilters({ ...filters, query: val, page: 1 }); }}
					placeholder="Search by Document Number"
					size="md"
					suffix={<IcMSearchlight height="20px" width="20px" />}
					className={styles.search_div}
				/>
			</div>
			<CustomTable
				data={apiData}
				filters={filters}
				setFilters={setFilters}
				loading={loading}
				onPageChange={onPageChange}
				isAllChecked={isAllChecked}
				showHeaderCheckbox={showHeaderCheckbox}
				getTableBodyCheckbox={getTableBodyCheckbox}
				onChangeTableHeaderCheckbox={onChangeTableHeaderCheckbox}
				checkedRows={checkedRows}
				refetch={refetch}

			/>
			{!apiData?.list && !loading && <SelectState />}
			{!loading && apiData?.list?.length <= 0 && <EmptyStateDocs />}
		</div>
	);
}

export default History;
