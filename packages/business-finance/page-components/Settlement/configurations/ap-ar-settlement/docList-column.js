import { Tooltip, Checkbox, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState, useMemo, useEffect } from 'react';

import { getFormatAmount } from '../../utils/getFormatAmount';

import styles from './styles.module.css';

const DOC_LENGTH = 10;
const AMT_LENGTH = 8;

const onChangeTableHeadCheckbox = ({
	setPageCheckedRows, selectedData, currentPageListIds, list,
	selectAll, setSelectedData, pageNumber,
}) => {
	setPageCheckedRows((previousPageCheckedRows) => {
		let newSelectedData = [...selectedData];
		let newPageCheckedIds = [];
		if (selectAll) {
			newPageCheckedIds = [];
			newSelectedData = selectedData.filter((item) => !currentPageListIds.includes(item.id));
		} else {
			const newIdsToAdd = currentPageListIds.filter((id) => !selectedData.some((item) => item.id === id));
			newPageCheckedIds = currentPageListIds;
			const newDataToAdd = list.filter((item) => newIdsToAdd.includes(item.id));
			newSelectedData = [...selectedData, ...newDataToAdd];
		}
		setSelectedData(newSelectedData);
		return {
			...previousPageCheckedRows,
			[pageNumber]: newPageCheckedIds,
		};
	});
};

const onChangeBodyCheckbox = ({ event, id, data, setPageCheckedRows, pageNumber, setSelectedData }) => {
	const rowData = data?.list.find((row) => row.id === id);
	if (!rowData) {
		return;
	}
	setPageCheckedRows((previousPageCheckedRows) => {
		const currentPageCheckedIds = previousPageCheckedRows[pageNumber] || [];
		let newPageCheckedIds = [];
		if (event.target.checked) {
			newPageCheckedIds = [...currentPageCheckedIds, id];
			setSelectedData((previousData) => [...previousData, rowData]);
		} else {
			newPageCheckedIds = currentPageCheckedIds.filter((selectedId) => selectedId !== id);
			setSelectedData((previousData) => previousData.filter((row) => row.id !== rowData.id));
		}
		return {
			...previousPageCheckedRows,
			[pageNumber]: newPageCheckedIds,
		};
	});
};

const useGetColumns = ({
	data = [],
	loading = false,
	selectedData = [],
	setSelectedData = () => {},
	sortData = [],
	setSortData = () => {},
	pageCheckedRows = [],
	setPageCheckedRows = () => {},
}) => {
	const { list = [] } = data || {};
	const { sortBy, sortType } = sortData || {};
	const currentPageListIds = useMemo(() => list.map(({ id }) => id), [list]);
	const [selectAll, setSelectAll] = useState(false);
	const pageNumber = data?.pageNo;
	const checkedRowsId = pageCheckedRows?.[pageNumber] || [];

	useEffect(() => {
		const currentPageCheckedIds = pageCheckedRows?.[pageNumber] || [];
		const isRowsChecked = currentPageListIds.every((id) => currentPageCheckedIds.includes(id));
		setSelectAll(isRowsChecked);
	}, [pageCheckedRows, currentPageListIds, pageNumber]);

	function RenderSortingArrows({ field:key = '' }) {
		return (
			<div className={styles.icon_flex}>
				<IcMArrowRotateUp
					className={sortBy === key && sortType === 'Asc' && styles.active}
					cursor="pointer"
					onClick={() => setSortData({
						...sortData,
						sortType : 'Asc',
						sortBy   : key,
					})}
				/>
				<IcMArrowRotateDown
					className={sortBy === key && sortType === 'Desc' && styles.active}
					cursor="pointer"
					onClick={() => setSortData({
						...sortData,
						sortType : 'Desc',
						sortBy   : key,
					})}
				/>
			</div>
		);
	}
	const columns = [
		{
			id     : 'checkbox',
			key    : 'checkbox',
			Header : (
				<Checkbox
					checked={selectAll}
					onChange={(event) => onChangeTableHeadCheckbox({
						event,
						setPageCheckedRows,
						selectedData,
						currentPageListIds,
						list,
						selectAll,
						setSelectedData,
						pageNumber,
					})}
					disabled={loading}
				/>
			),
			accessor: ({ id = '' }) => (
				<Checkbox
					checked={checkedRowsId.includes(id)}
					onChange={(event) => onChangeBodyCheckbox({
						event,
						id,
						data,
						setPageCheckedRows,
						pageNumber,
						setSelectedData,
					})}
				/>

			),
		},
		{
			Header: (
				<div style={{ fontSize: '12px' }}>DOCUMENT NO</div>
			),
			id       : 'documentValue',
			accessor : (row) => (
				<div>
					<Tooltip
						content={(
							<>
								<div>
									{row?.documentValue || ''}
								</div>
								<div>
									{row?.documentType || ''}
								</div>
							</>
						)}
						interactive
					>
						<div>
							{(row?.documentValue && row?.documentValue.length > DOC_LENGTH
								? `${row?.documentValue.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH)}...`
								: row?.documentValue) || '-'}
						</div>
						<Pill
							size="md"
							color="#CFEAED"
							style={{
								fontSize        : '10px',
								backgroundColor : '#CFEAED',
								borderRadius    : '6px',
								textAlign       : 'center',
							}}
						>
							{row?.documentType || ''}
						</Pill>
					</Tooltip>
				</div>
			),
		},
		{
			Header: (
				<span className={styles.commonStylingHeader}>
					DOC. DATE
					<RenderSortingArrows field="transactionDate" />
				</span>
			),
			id       : 'transactionDate',
			accessor : (item) => (item?.transactionDate
				? item.transactionDate.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH) : '--'),
		},
		{
			Header: (
				<div className={styles.commonStylingHeader}>
					DOC AMOUNT
					<RenderSortingArrows field="documentAmount" />
				</div>
			),
			id       : 'documentAmount',
			accessor : (item) => (
				<div>
					<Tooltip content={item?.documentAmount}>
						{item?.currency || ''}
						{' '}
						{item?.documentAmount?.toString().length > AMT_LENGTH
							? `${item?.documentAmount?.toString().substr(GLOBAL_CONSTANTS.zeroth_index, AMT_LENGTH)}..`
							: item?.documentAmount}
					</Tooltip>
				</div>
			),

		},
		{
			Header   : (<div style={{ fontSize: '12px' }}>EXC RATE</div>),
			accessor : (item) => item?.exchangeRate || '--',
			id       : 'exchangeRate',
		},
		{
			Header   : (<div style={{ fontSize: '12px' }}>TDS APPLICABLE AMOUNT</div>),
			accessor : (item) => getFormatAmount(item?.taxableAmount, item?.currency) || '--',
			id       : 'taxableAmount',
		},
		{
			Header: (
				<div className={styles.commonStylingHeader}>
					TDS
					<RenderSortingArrows field="tdsAmount" />
				</div>),
			id       : 'tds',
			accessor : (item) => (
				<div>
					<Tooltip content={item?.tds}>
						{item?.currency || ''}
						{' '}
						{item?.tds?.toString().length > AMT_LENGTH
							? `${item?.tds?.toString().substr(GLOBAL_CONSTANTS.zeroth_index, AMT_LENGTH)}..`
							: item?.tds}
					</Tooltip>
				</div>
			),
		},
		{
			Header   : (<div style={{ fontSize: '12px' }}>SETTLED TDS</div>),
			accessor : (item) => getFormatAmount(item?.settledTds, item?.currency) || '--',
			id       : 'settledTds',
		},
		{
			Header: (
				<div className={styles.commonStylingHeader}>
					PAID/RECIEVED
					<RenderSortingArrows field="paidAmount" />
				</div>),
			accessor : (item) => getFormatAmount(item?.settledAmount, item?.currency) || '--',
			id       : 'settledAmount',
		},
		{
			Header: (
				<div className={styles.commonStylingHeader}>
					BALANCE
					<RenderSortingArrows field="balanceAmount" />
				</div>),
			id       : 'balanceAmount',
			accessor : (item) => (
				<div>
					<Tooltip content={item?.balanceAmount}>
						{item?.currency || ''}
						{' '}
						{item?.balanceAmount?.toString().length > AMT_LENGTH
							? `${item?.balanceAmount?.toString().substr(GLOBAL_CONSTANTS.zeroth_index, AMT_LENGTH)}..`
							: item?.balanceAmount}
					</Tooltip>
				</div>
			),
		},
		{
			Header   : (<div style={{ fontSize: '12px' }}>STATUS</div>),
			id       : 'status',
			accessor : (item) => (
				<Pill
					size="lg"
					color={
					item?.status === 'Unpaid' || item?.status === 'Unutilized'
						? '#fef199'
						: '#acdadf'
					}
				>
					{item?.status || '--'}
				</Pill>
			),
		},
	];

	return columns;
};
export default useGetColumns;
