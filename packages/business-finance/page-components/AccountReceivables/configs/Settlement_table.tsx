import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInfo } from '@cogoport/icons-react';

import showOverflowingNumber from '../../commons/showOverflowingNumber';
import GetSortingData from '../components/Outstanding/OutstandingList/SettlementTable/sorting';

interface Sort {
	sortType?: string;
	sortBy?: string;
}
interface InvoiceKey {
	document_key?: string;
	irn_key?: string;
}
interface Props {
	sort?: Sort;
	setSort?: React.Dispatch<React.SetStateAction<object>>;
	settlementFilters?: object;
	setSettlementFilters?: React.Dispatch<React.SetStateAction<object>>;
	invoiceKeys: InvoiceKey;
}
const MAX_LEN_FOR_TEXT = 12;

const SettlementList = ({ sort, setSort, settlementFilters, setSettlementFilters, invoiceKeys }:Props) => [
	{
		Header   : 'Reference Number',
		id       : 'name',
		accessor : (row) => {
			const { sourceDocumentValue, sourceIrnNumber } = row;
			return (
				<div style={{ display: 'flex' }}>
					<div style={{ marginRight: '10px' }}>
						{showOverflowingNumber(sourceDocumentValue, MAX_LEN_FOR_TEXT)}
					</div>
					{sourceIrnNumber ? (
						<div>
							<Tooltip
								content={(
									<div>
										{sourceIrnNumber}
									</div>
								)}
								placement="top"
								interactive
							>
								<div><IcMInfo height="12px" width="12px" /></div>
							</Tooltip>

						</div>
					) : ''}
				</div>
			);
		},
	},
	{
		Header   : 'Invoice Number',
		accessor : (row) => (

			<div style={{ display: 'flex' }}>
				<div style={{ marginRight: '10px' }}>
					{showOverflowingNumber(row?.[invoiceKeys.document_key], MAX_LEN_FOR_TEXT)}
				</div>
				{row?.destinationIrnNumber ? (
					<div>
						<Tooltip
							content={(
								<div>
									{row?.[invoiceKeys.irn_key]}
								</div>
							)}
							placement="top"
							interactive
						>
							<div><IcMInfo height="12px" width="12px" /></div>
						</Tooltip>
					</div>
				) : ''}
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
		Header   : 'Amount',
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
