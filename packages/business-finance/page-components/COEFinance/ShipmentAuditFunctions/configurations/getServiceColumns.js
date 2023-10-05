import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const DOC_LENGTH = 6;
// const CONCAT_LENGTH = 3;
// const ZERO_PRICE = 0;
const TRUNCATED_UPTO = 2;

const getServiceColumns = ({ currentKey = '' }) => {
	const isModified = currentKey.includes('MODIFIED');
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
								{isModified ? row?.code || '' : row?.name || ''}
							</div>
						)}
						interactive
					>
						<div className={(isModified && row?.code) ? styles.changed : ''}>
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
				<div>Qty.</div>
			),
			accessor: (row) => (
				<div className={isModified && row?.quantity ? styles.changed : ''}>
					{row?.quantity || '-'}
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
						<div className={isModified && row?.unit ? styles.changed : ''}>
							{(row?.unit && row?.unit?.length > DOC_LENGTH
								? `${row?.unit?.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH)}...`
								: row?.unit) || '-'}
						</div>
					</Tooltip>
				</div>
			),
		},
		{
			id     : 'currency',
			Header : (
				<div>Currency</div>
			),
			accessor: (row) => (
				<div className={isModified && row?.currency ? styles.changed : ''}>
					{

						row?.currency || '-'
					}
				</div>
			),
		},
		{
			id     : 'price',
			Header : (
				<div>Price</div>
			),
			accessor: (row) => (
				<div className={isModified && row?.price ? styles.changed : ''}>
					{/* {ShowOverflowingNumber(row?.price || ZERO_PRICE, CONCAT_LENGTH, row?.currency) } */}
					{row?.price?.toFixed(TRUNCATED_UPTO) || '-'}
				</div>
			),
		},
		{
			id     : 'margin_price',
			Header : (
				<div>Margin</div>
			),
			accessor: (row) => (
				<div className={isModified && row?.margin_price ? styles.changed : ''}>
					{/* {ShowOverflowingNumber(row?.margin_price || ZERO_PRICE, CONCAT_LENGTH, row?.currency) } */}
					{row?.margin_price?.toFixed(TRUNCATED_UPTO) || '-'}
				</div>
			),
		},
		{
			id     : 'exchange_rate',
			Header : (
				<div>Ex. Rate</div>
			),
			accessor: (row) => (
				<div className={isModified && row?.exchange_rate ? styles.changed : ''}>
					{row?.exchange_rate?.toFixed(TRUNCATED_UPTO)}
				</div>
			),
		},
		{
			id     : 'tax_total_price',
			Header : (
				<div>Tax</div>
			),
			accessor: (row) => (
				<div className={isModified && row?.tax_total_price ? styles.changed : ''}>
					{/* {ShowOverflowingNumber(row?.tax_total_price || ZERO_PRICE, CONCAT_LENGTH, row?.currency) } */}
					{row?.tax_total_price?.toFixed(TRUNCATED_UPTO) || '-'}
				</div>
			),
		},
		{
			id     : 'tax_total_price_discounted',
			Header : (
				<div>Total</div>
			),
			accessor: (row) => (
				<div className={isModified && row?.tax_total_price_discounted ? styles.changed : ''}>
					{/* {ShowOverflowingNumber(
						row?.tax_total_price_discounted || ZERO_PRICE,
						CONCAT_LENGTH,

						row?.currency,
					) } */}
					{row?.tax_total_price_discounted?.toFixed(TRUNCATED_UPTO) || '-'}
				</div>
			),
		},

	];

	return columns;
};
export default getServiceColumns;
