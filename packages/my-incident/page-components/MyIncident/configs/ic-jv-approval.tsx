import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { getByKey, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const IcJvApproval = [
	{
		Header   : <div>JV Number</div>,
		id       : 'jv_number',
		accessor : (row) => (
			<div>
				<div className={styles.reference_id}>
					{getByKey(row, 'jvNum') as string}
				</div>
			</div>
		),
	},
	{
		Header   : <div>Entity</div>,
		id       : 'entity',
		accessor : (row) => (
			<div>
				<div>
					{getByKey(row, 'entityCode') as string}
				</div>
			</div>
		),
	},
	{
		Header   : <div>Business Partner</div>,
		id       : 'business_partner',
		accessor : (row) => (
			<div>
				<div>
					{startCase(getByKey(row, 'tradePartyName') as string)}
				</div>
			</div>
		),
	},
	{
		Header   : <div>Category</div>,
		id       : 'category',
		accessor : (row) => (
			<div>
				<div>
					{getByKey(row, 'category') as string}
				</div>
			</div>
		),
	},
	{
		Header   : <div>Type</div>,
		id       : 'type',
		accessor : (row) => (
			<div>
				<div>
					{startCase(getByKey(row, 'type') as string)}
				</div>
			</div>
		),
	},

	{
		Header   : 'Currency',
		id       : 'currency',
		accessor : (row) => (
			<div>
				{getByKey(row, 'currency') as string}
			</div>
		),
	},

	{
		Header   : 'Exc. Rate',
		id       : 'exc_rate',
		accessor : (row) => (
			<div>
				{getByKey(row, 'exchangeRate') as string}
			</div>

		),
	},
	{
		Header   : 'Amount',
		id       : 'amount',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'amount') as number, getByKey(row, 'currency') as string)}</div>
			</div>

		),
	},
	{
		Header   : 'Description',
		id       : 'description',
		accessor : (row) => (
			<div>
				{getByKey(row, 'description') as string}

			</div>

		),
	},

];
export default IcJvApproval;
