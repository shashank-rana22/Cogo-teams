import { Pill, Tooltip, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import getFormattedPrice from '../../commons/utils/getFormattedPrice';
import GetSortingData from '../Logistics/Profitabillity/profitabilitySorting';

import styles from './styles.module.css';

const profitabillityColumn = (sort, setSort) => [
	{
		Header   : 'SID',
		id       : 'jobNumber',
		accessor : (row) => (
			<div className={styles.jobnumber_text_style}>
				<span className={styles.jobnumber_text}>{row?.jobNumber}</span>
				<span>
					{startCase(row?.shipmentType)}
				</span>
			</div>
		),
	},
	{
		Header   : 'Name',
		id       : 'businessName',
		accessor : (row) => (
			<div
				className={cl`${styles.sentence_case} ${styles.business_text_style}`}
			>
				<Tooltip
					content={(
						<div className={styles.tooltip_text}>
							{row?.businessName}
						</div>
					)}
					interactive
				>
					<div>
						{(row?.businessName as string).substring(0, 12)}
						...
					</div>
				</Tooltip>
			</div>

		),
	},
	{
		Header   : 'Entity',
		id       : 'entity',
		accessor : (row) => (
			<div
				className={cl`${styles.sentence_case} ${styles.entity_text_style}`}
			>
				{row?.entity}
			</div>

		),

	},
	{
		Header   : 'Booked Income',
		id       : 'income',
		accessor : (row) => (
			<div className={styles.expense_text_style}>
				{getFormattedPrice(
					Math.abs(row?.income),
					'INR',
				)}
			</div>
		),

	},
	{
		Header   : 'Booked Expense',
		id       : 'expense',
		accessor : (row) => (
			<div className={styles.expense_text_style}>
				{getFormattedPrice(
					row?.expense,
					'INR',
				)}
			</div>
		),

	},
	{
		Header   : <GetSortingData sort={sort} setSort={setSort} />,
		id       : 'profitability',
		accessor : (row) => (
			<div className={styles.text_weight}>
				{ row?.profitability.toFixed(2) }
				<text>%</text>
			</div>
		),

	},
	{
		Header   : 'Shipment Status',
		id       : 'jobStatus',
		accessor : (row) => (
			<div>
				<Pill
					style={{ borderRadius: '6px', marginLeft: '-6px', fontWeight: '500' }}
					size="md"
					color="#CFEAED"
				>
					{startCase(row?.jobStatus)}
				</Pill>

			</div>
		),
	},
	{
		Header   : 'Milestone',
		id       : 'shipmentMilestone',
		accessor : (row) => (
			<div>
				<Pill
					style={{ borderRadius: '6px', marginLeft: '-6px', fontWeight: '500' }}
					size="md"
					color="#CFEAED"
				>
					{startCase(row?.shipmentMilestone)}
				</Pill>

			</div>

		),
	},
];

export default profitabillityColumn;
