import { Tooltip, Checkbox, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useMemo, useEffect } from 'react';

import { getFormatAmount } from '../../utils/getFormatAmount';
import RenderSortingArrows from '../../utils/getSortingData';
import onChangeBodyCheckbox from '../../utils/onChangeBodyCheckbox';
import onChangeTableHeadCheckbox from '../../utils/onChangeTableHeadCheckbox';

import styles from './styles.module.css';

const DOC_LENGTH = 10;
const AMT_LENGTH = 8;

const useGetColumns = ({
	data = {},
	loading = false,
	selectedData = [],
	setSelectedData = () => {},
	sortData = [],
	setSortData = () => {},
	pageCheckedRows = {},
	setPageCheckedRows = () => {},
	t = () => {},
}) => {
	const { list = [] } = data || {};
	const currentPageListIds = useMemo(() => list.map(({ id }) => id), [list]);
	const [selectAll, setSelectAll] = useState(false);
	const pageNumber = data?.pageNo;
	const checkedRowsId = pageCheckedRows?.[pageNumber] || [];

	useEffect(() => {
		const currentPageCheckedIds = pageCheckedRows?.[pageNumber] || [];
		const isRowsChecked = currentPageListIds?.every((id) => currentPageCheckedIds?.includes(id));
		setSelectAll(isRowsChecked);
	}, [pageCheckedRows, currentPageListIds, pageNumber]);

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
					checked={checkedRowsId?.includes(id)}
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
			id     : 'documentValue',
			Header : (
				<div className={styles.commonStylingHeader}>{t('settlement:document_number_header')}</div>
			),
			accessor: (row) => {
				const { documentValue = '', documentType = '' } = row || {};
				return (
					<div>
						<Tooltip
							content={(
								<>
									<div>
										{documentValue || ''}
									</div>
									<div>
										{documentType || ''}
									</div>
								</>
							)}
							interactive
						>
							<div>
								{(documentValue && documentValue?.length > DOC_LENGTH
									? `${documentValue?.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH)}...`
									: documentValue) || '-'}
							</div>
							<Pill
								size="sm"
								color="#CFEAED"
								className={styles.docTypePill}
							>
								{row?.documentType || ''}
							</Pill>
						</Tooltip>
					</div>
				);
			},
		},
		{
			id     : 'transactionDate',
			Header : (
				<span className={styles.commonStylingHeader}>
					{t('settlement:doc_date_header')}
					<RenderSortingArrows field="transactionDate" sortData={sortData} setSortData={setSortData} />
				</span>
			),
			accessor: (item) => (item?.transactionDate
				? item.transactionDate.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH) : '--'),
		},
		{
			id     : 'documentAmount',
			Header : (
				<div className={styles.commonStylingHeader}>
					{t('settlement:doc_amount_header')}
					<RenderSortingArrows field="documentAmount" sortData={sortData} setSortData={setSortData} />
				</div>
			),
			accessor: (item) => {
				const { currency = '', documentAmount = '' } = item || {};
				return (
					<div>
						<Tooltip content={<div>{documentAmount}</div>}>
							{currency || ''}
							{' '}
							{documentAmount?.toString().length > AMT_LENGTH
								? `${documentAmount?.toString().substr(GLOBAL_CONSTANTS.zeroth_index, AMT_LENGTH)}..`
								: documentAmount}
						</Tooltip>
					</div>
				);
			},

		},
		{
			id       : 'exchangeRate',
			Header   : (<div className={styles.commonStylingHeader}>{t('settlement:exchange_rate_header')}</div>),
			accessor : (item) => item?.exchangeRate || '--',
		},
		{
			id     : 'taxableAmount',
			Header : (
				<div className={styles.commonStylingHeader}>
					{t('settlement:tds_applicable_amount_header')}
				</div>
			),
			accessor: (item) => getFormatAmount(item?.taxableAmount, item?.currency) || '--',
		},
		{
			id     : 'tds',
			Header : (
				<div className={styles.commonStylingHeader}>
					{t('settlement:tds_header')}
					<RenderSortingArrows field="tdsAmount" sortData={sortData} setSortData={setSortData} />
				</div>),
			accessor: (item) => {
				const { tds = '', currency = '' } = item || {};
				return (
					<div>
						<Tooltip content={<div>{tds}</div>}>
							{currency || ''}
							{' '}
							{tds?.toString().length > AMT_LENGTH
								? `${tds?.toString().substr(GLOBAL_CONSTANTS.zeroth_index, AMT_LENGTH)}..`
								: tds}
						</Tooltip>
					</div>
				);
			},
		},
		{
			id       : 'settledTds',
			Header   : (<div className={styles.commonStylingHeader}>{t('settlement:settled_tds_header')}</div>),
			accessor : (item) => getFormatAmount(item?.settledTds, item?.currency) || '--',
		},
		{
			id     : 'settledAmount',
			Header : (
				<div className={styles.commonStylingHeader}>
					{t('settlement:paid_received_header')}
					<RenderSortingArrows field="paidAmount" sortData={sortData} setSortData={setSortData} />
				</div>),
			accessor: (item) => getFormatAmount(item?.settledAmount, item?.currency) || '--',
		},
		{
			id     : 'balanceAmount',
			Header : (
				<div className={styles.commonStylingHeader}>
					{t('settlement:balance_header')}
					<RenderSortingArrows field="balanceAmount" sortData={sortData} setSortData={setSortData} />
				</div>),
			accessor: (item) => {
				const { balanceAmount = '', currency = '' } = item || {};
				return (
					<div>
						<Tooltip content={balanceAmount}>
							{currency || ''}
							{' '}
							{balanceAmount?.toString().length > AMT_LENGTH
								? `${balanceAmount?.toString().substr(GLOBAL_CONSTANTS.zeroth_index, AMT_LENGTH)}..`
								: balanceAmount}
						</Tooltip>
					</div>
				);
			},
		},
		{
			id       : 'status',
			Header   : (<div className={styles.commonStylingHeader}>{t('settlement:status_header')}</div>),
			accessor : (item) => (
				<Pill
					size="md"
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
