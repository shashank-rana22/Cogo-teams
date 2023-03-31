import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../commons/showOverflowingNumber';
import getFormattedPrice from '../../commons/utils/getFormattedPrice';

import styles from './styles.module.css';

const profitabillityColumn = [
	{
		Header   : 'SID',
		id       : 'jobNumber',
		accessor : (row) => (
			<div style={{
				display       : 'flex',
				flexDirection : 'column',
				marginLeft    : '16px',
			}}
			>
				<span style={{ color: '#F68B21', textDecorationLine: 'underline' }}>{row?.jobNumber}</span>
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
				style={{
					fontWeight : '400',
					fontSize   : '12px',
					marginLeft : '-10px',
				}}
				className={styles.sentence_case}
			>
				{showOverflowingNumber(row?.businessName, 12)}
			</div>

		),
	},
	{
		Header   : 'Entity',
		id       : 'entity',
		accessor : (row) => (

			<div
				style={{
					fontWeight  : '400',
					fontSize    : '12px',
					marginRight : '20px',
				}}
				className={styles.sentence_case}
			>
				{row?.entity}
			</div>

		),

	},
	{
		Header   : 'Booked Income',
		id       : 'income',
		accessor : (row) => (
			<div style={{ marginLeft: '-6px' }}>
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
			<div style={{ marginLeft: '-6px' }}>
				{getFormattedPrice(
					row?.expense,
					'INR',
				)}
			</div>
		),

	},
	{
		Header   : 'Profitability',
		id       : 'profitability',
		accessor : (row) => (
			<div>
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
					style={{ borderRadius: '6px', marginLeft: '-6px' }}
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
					style={{ borderRadius: '6px', marginLeft: '-6px' }}
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
