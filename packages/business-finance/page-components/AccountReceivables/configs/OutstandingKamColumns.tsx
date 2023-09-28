import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { getByKey } from '@cogoport/utils';

import formatCurrency from '../Utils/amountFormat';

import styles from './styles.module.css';

export const outstandingKamColumn = ({ entityCode, t }) => [

	{
		Header   : t('KAM_name_column'),
		accessor : (row) => (

			<div>

				{	(getByKey(row, 'kam_owners') as string).length > 15 ? (
					<Tooltip
						placement="top"
						content={getByKey(row, 'kam_owners') as string}
					>
						<text className={styles.wrapper}>
							{`${(getByKey(row, 'kam_owners') as string).substring(
								0,
								20,
							)}...`}
						</text>
					</Tooltip>
				)

					: (
						<div className={styles.styled_name}>
							{getByKey(row, 'kam_owners') as string}
						</div>
					)}
			</div>

		),
		id: 'kam_owners',
	},
	{
		Header   : t('amount'),
		accessor : (row) => (
			<div>
				<Tooltip content={(
					<div className={styles.wrapper}>
						{formatAmount({
							amount   : getByKey(row, 'open_invoice_amount') as any,
							currency :	GLOBAL_CONSTANTS.cogoport_entities[entityCode]?.currency,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						})}
					</div>
				)}
				>
					<div className={styles.styled_name}>
						{
						formatCurrency(
							GLOBAL_CONSTANTS.cogoport_entities[entityCode]?.currency,
							getByKey(row, 'open_invoice_amount') as any,
						)
						}
					</div>

				</Tooltip>

			</div>
		),
		id: 'open_invoice_amount',
	},
	{
		Header   : t('outstanding_amount_column'),
		accessor : (row) => (
			<div>

				<Tooltip content={(
					<div className={styles.wrapper}>
						{formatAmount({
							amount   : getByKey(row, 'total_outstanding_amount') as any,
							currency :	GLOBAL_CONSTANTS.cogoport_entities[entityCode]?.currency,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						})}
					</div>
				)}
				>
					<div className={styles.styled_name}>
						{
						formatCurrency(
							GLOBAL_CONSTANTS.cogoport_entities[entityCode]?.currency,
							getByKey(row, 'total_outstanding_amount') as any,
						)
						}
					</div>

				</Tooltip>

			</div>
		),
		id: 'total_outstanding_amount',
	},
];

export const OutstandingManagerColumn = [
	{
		Header   : 'Manager Name',
		accessor : 'name',
		id       : 'name',
	},
	{
		Header   : 'Amount',
		accessor : 'amount',
		id       : 'amount',
	},
	{
		Header   : 'Team Member',
		id       : 'teamMember',
		accessor : 'teamMember',

	},
];
