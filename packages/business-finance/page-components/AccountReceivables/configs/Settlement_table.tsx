import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey } from '@cogoport/utils';

import GetSortingData from '../components/Outstanding/OutstandingList/SettlementTable/sorting';

const SettlementList = ({ sort, setSort, settlementFilters, setSettlementFilters }) => [
	{
		Header   : 'Reference Number',
		id       : 'name',
		accessor : (row) => (
			<div>
				{getByKey(row, 'sourceDocumentValue') as string}
			</div>
		),

	},
	{
		Header   : 'Invoice Number',
		accessor : (row) => (

			<div>
				<div>
					{row?.destinationDocumentValue}

				</div>
			</div>

		),
	},
	{
		Header: (
			<div style={{ display: 'flex' }}>
				<span style={{ marginRight: '8px' }}>Invoice Amt</span>
				<GetSortingData
					setSort={setSort}
					sort={sort}
					type="destinationInvoiceAmount"
					settlementFilters={settlementFilters}
					setSettlementFilters={setSettlementFilters}
				/>
			</div>
		),
		id       : 'destinationInvoiceAmount',
		accessor : (row) => (
			<div>
				{formatAmount({
					amount   : row?.destinationInvoiceAmount,
					currency : row?.ledCurrency,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',

					},
				})}
			</div>
		),
	},

	{
		Header: (
			<div style={{ display: 'flex' }}>
				<span style={{ marginRight: '8px' }}>Amount</span>
				<GetSortingData
					setSort={setSort}
					sort={sort}
					type="amount"
					settlementFilters={settlementFilters}
					setSettlementFilters={setSettlementFilters}
				/>
			</div>
		),
		id       : 'amount',
		accessor : (row) => (

			<div>
				<div>
					{formatAmount({
						amount   : row?.amount,
						currency : row?.currency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',

						},
					})}
				</div>
			</div>

		),
	},
	{
		Header: (
			<div style={{ display: 'flex' }}>
				<span style={{ marginRight: '8px' }}>LedAmount</span>
				<GetSortingData
					setSort={setSort}
					sort={sort}
					type="ledAmount"
					settlementFilters={settlementFilters}
					setSettlementFilters={setSettlementFilters}
				/>
			</div>
		),
		id       : 'ledAmount',
		accessor : (row) => (

			<div>
				<div>
					{formatAmount({
						amount   : row?.ledAmount,
						currency : row?.ledCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',

						},
					})}

				</div>
			</div>

		),
	},

	{
		Header: (
			<div style={{ display: 'flex' }}>
				<span style={{ marginRight: '8px' }}>Settlement Date</span>
				<GetSortingData
					setSort={setSort}
					sort={sort}
					type="settlementDate"
					settlementFilters={settlementFilters}
					setSettlementFilters={setSettlementFilters}
				/>
			</div>
		),
		id       : 'settlementDate',
		accessor : (row) => (
			<div>
				{formatDate({
					date       : row?.settlementDate,
					dateFormat : GLOBAL_CONSTANTS.formats.date['eee, dd MMM, yyyy'],
					formatType : 'date',
				})}
			</div>
		),
	},
	{
		Header: (
			<div style={{ display: 'flex' }}>
				<span style={{ marginRight: '8px' }}>Open Invoice Amt</span>
				<GetSortingData
					setSort={setSort}
					sort={sort}
					type="destinationOpenInvoiceAmount"
					settlementFilters={settlementFilters}
					setSettlementFilters={setSettlementFilters}
				/>
			</div>
		),
		id       : 'destinationOpenInvoiceAmount',
		accessor : (row) => (
			<div>
				{formatAmount({
					amount   : row?.destinationOpenInvoiceAmount,
					currency : row?.ledCurrency,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',

					},
				})}
			</div>
		),
	},
];

export default SettlementList;
