import { Pill, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import getFormattedPrice from '../../../commons/utils/getFormattedPrice';

import styles from './styles.module.css';

const receivablesPayablesColumn = () => (
	[
		{
			Header   : 'Document No.',
			id       : 'documentValue',
			accessor : (row) => (
				<>
					<div className={styles.expense_text_style}>
						{row?.documentValue}
					</div>
					<div className={cl`${styles.sentence_case} ${styles.business_text_style}`}>
						<Tooltip
							content={(
								<div className={styles.tooltip_text}>
									{row?.documentType}
								</div>
							)}
							interactive
						>
							<div>
								{(row?.documentType as string).substring(0, 12)}
								...
							</div>
						</Tooltip>

					</div>
				</>
			),
		},
		{
			Header   : 'DOC. DATE',
			id       : 'transactionDate',
			accessor : (row) => (
				<div className={styles.expense_text_style}>
					{(formatDate({
						date       : row?.transactionDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					})) || ''}
				</div>

			),
		},
		{
			Header   : 'PAYMENT DUE DATE',
			id       : 'dueDate',
			accessor : (row) => (

				<div className={styles.expense_text_style}>
					{(formatDate({
						date       : row?.dueDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					})) || ''}
				</div>
			),
		},

		{
			Header   : 'DOC. AMOUNT',
			id       : 'documentAmount',
			accessor : (row) => (

				<div className={styles.expense_text_style}>
					{getFormattedPrice(
						Math.abs(row?.documentAmount),
						(row?.currency),
					)}
				</div>
			),
		},
		{
			Header   : 'TAXABLE AMOUNT',
			id       : 'taxableAmount',
			accessor : (row) => (

				<div className={styles.expense_text_style}>
					{getFormattedPrice(
						Math.abs(row?.taxableAmount),
						(row?.currency),
					)}
				</div>
			),
		},
		{
			Header   : 'Settled TDS',
			id       : 'settledTds',
			accessor : (row) => (
				<div className={styles.expense_text_style}>
					{getFormattedPrice(
						Math.abs(row?.settledTds),
						(row?.currency),
					)}
				</div>
			),
		},
		{
			Header   : 'AMOUNT AFTER TDS',
			id       : 'afterTdsAmount',
			accessor : (row) => (
				<div className={styles.expense_text_style}>
					{getFormattedPrice(
						Math.abs(row?.afterTdsAmount),
						(row?.currency),
					)}
				</div>
			),
		},
		{
			Header   : 'RECEIVED',
			id       : 'settledAmount',
			accessor : (row) => (
				<div className={styles.expense_text_style}>
					{getFormattedPrice(
						Math.abs(row?.settledAmount),
						(row?.currency),
					)}
				</div>
			),
		},
		{
			Header   : 'BALANCE',
			id       : 'currentBalance',
			accessor : (row) => (
				<div className={styles.expense_text_style}>
					{getFormattedPrice(
						Math.abs(row?.currentBalance),
						(row?.currency),
					)}
				</div>
			),
		},
		{
			Header   : 'STATUS',
			id       : 'status',
			accessor : (row) => (
				<div>
					<Pill
						style={{ borderRadius: '6px', marginLeft: '-6px', fontWeight: '500' }}
						size="md"
						color="#C4DC91"
					>
						{startCase(row?.status)}
					</Pill>

				</div>
			),
		},
	]
);

export default receivablesPayablesColumn;
