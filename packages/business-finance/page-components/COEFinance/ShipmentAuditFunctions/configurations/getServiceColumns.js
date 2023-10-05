import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const DOC_LENGTH = 6;
const CONCAT_LENGTH = 3;
const ZERO_PRICE = 0;

const getServiceColumns = () => {
	const columns = [
		{
			id     : 'code',
			Header : (
				<div>Name</div>
			),
			accessor: (row) => (
				<div>
					<Tooltip
						content={(
							<div>
								{row?.name || ''}
							</div>
						)}
						interactive
					>
						<div>
							{(row?.code && row?.code?.length > DOC_LENGTH
								? `${row?.code?.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH)}...`
								: row?.code) || '-'}
						</div>
						{/* <Pill
								size="sm"
								color="#CFEAED"
								className={styles.docTypePill}
							>
								{row?.documentType || ''}
							</Pill> */}
					</Tooltip>
				</div>
			),
		},
		{
			id     : 'quantity',
			Header : (
				<div className={styles.quantity}>Qty.</div>
			),
			accessor: (row) => (
				<div className={styles.quantity}>
					{row?.quantity}
				</div>
			),
		},
		{
			id     : 'unit',
			Header : (
				<div>Unit</div>
			),
			accessor: (row) => (
				<div>
					<Tooltip
						content={(
							<div>
								{row?.unit || ''}
							</div>
						)}
						interactive
					>
						<div>
							{(row?.unit && row?.unit?.length > DOC_LENGTH
								? `${row?.unit?.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH)}...`
								: row?.unit) || '-'}
						</div>
					</Tooltip>
				</div>
			),
		},
		{
			id     : 'price',
			Header : (
				<div>Price</div>
			),
			accessor: (row) => (
				<div>
					{ShowOverflowingNumber(row?.price || ZERO_PRICE, CONCAT_LENGTH, row?.currency) }
				</div>
			),
		},
		{
			id     : 'margin_price',
			Header : (
				<div>Margin</div>
			),
			accessor: (row) => (
				<div>
					{ShowOverflowingNumber(row?.margin_price || ZERO_PRICE, CONCAT_LENGTH, row?.currency) }
				</div>
			),
		},
		{
			id     : 'exchange_rate',
			Header : (
				<div>Ex. Rate</div>
			),
			accessor: (row) => (
				<div>
					{row?.exchange_rate}
				</div>
			),
		},
		{
			id     : 'tax_total_price',
			Header : (
				<div>Tax</div>
			),
			accessor: (row) => (
				<div>
					{ShowOverflowingNumber(row?.tax_total_price || ZERO_PRICE, CONCAT_LENGTH, row?.currency) }
				</div>
			),
		},
		{
			id     : 'tax_total_price_discounted',
			Header : (
				<div>Total</div>
			),
			accessor: (row) => (
				<div>
					{ShowOverflowingNumber(
						row?.tax_total_price_discounted || ZERO_PRICE,
						CONCAT_LENGTH,

						row?.currency,
					) }
				</div>
			),
		},

	];

	return columns;
};
export default getServiceColumns;
