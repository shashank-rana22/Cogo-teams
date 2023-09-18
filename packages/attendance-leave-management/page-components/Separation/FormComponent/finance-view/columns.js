import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const fnfColumns = ({
	errors = {},
	deleteItemUpdateStatus = () => {},
}) => ([
	{
		Header   : 'PARTICULAR',
		accessor : (item = {}) => (
			<section className={styles.particular_container}>
				<div>{item?.particular}</div>
				{errors?.item?.particular ? <div className={styles.error}>*required</div> : null}
			</section>
		),
	},
	{
		Header   : 'CATEGORY',
		accessor : 'category',
	},
	{
		Header   : 'RECOVERABLE AMOUNT',
		accessor : (item) => (
			<section className={styles.recover_container}>
				{formatAmount({
					amount   : item?.recoverable_amount,
					currency : 'INR',
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})}
				<div
					className={styles.delete}
					onClick={() => { deleteItemUpdateStatus(item.id); }}
					aria-hidden
				>
					<IcMDelete
						width={22}
						height={22}
					/>
				</div>
			</section>
		),
	},
]);
export default fnfColumns;
