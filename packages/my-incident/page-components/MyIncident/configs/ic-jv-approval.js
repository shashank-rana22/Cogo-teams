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
					{getByKey(row, 'jvNum')}
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
					{getByKey(row, 'entityCode')}
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
					{startCase(getByKey(row, 'tradePartyName'))}
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
					{getByKey(row, 'category')}
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
					{startCase(getByKey(row, 'type'))}
				</div>
			</div>
		),
	},

	{
		Header   : 'Currency',
		id       : 'currency',
		accessor : (row) => (
			<div>
				{getByKey(row, 'currency')}
			</div>
		),
	},

	{
		Header   : 'Exc. Rate',
		id       : 'exc_rate',
		accessor : (row) => (
			<div>
				{getByKey(row, 'exchangeRate')}
			</div>

		),
	},
	{
		Header   : 'Amount',
		id       : 'amount',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'amount'), getByKey(row, 'currency'))}</div>
			</div>

		),
	},
	{
		Header   : 'Description',
		id       : 'description',
		accessor : (row) => (
			<div>
				{getByKey(row, 'description')}

			</div>

		),
	},

];
export default IcJvApproval;
