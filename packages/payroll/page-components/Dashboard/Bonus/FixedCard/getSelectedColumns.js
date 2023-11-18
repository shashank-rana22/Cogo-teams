import { InputController, SelectController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const getSelectedColumns = ({
	control = () => {},
	setValue = () => {},
	errors = {},
	watch = () => {},
}) => {
	const OPTIONS = [
		{ label: 'YES', value: 'yes' },
		{ label: 'NO', value: 'no' },
	];

	return	([

		{
			Header   : 'NAME',
			accessor : (item = {}) => (
				<div>
					<div className={styles.name}>{item?.name}</div>
				</div>
			),
			id: 'name',
		},
		{
			Header   : 'AMOUNT DUE(₹)',
			accessor : (item = {}) => (
				<div>
					<div>{startCase(item?.amount_due) || '-'}</div>
				</div>
			),
			id: 'amount_due',
		},
		{
			Header   : 'PAYMENT TYPE',
			accessor : (item = {}) => (
				<div>
					<div>{startCase(item?.payment_type)}</div>
				</div>
			),
			id: 'payment_type',
		},
		{
			Header   : 'DEFER PENDING PAYMENT',
			accessor : (item = {}) => (
				<>
					<div>
						<SelectController
							placeholder="Status"
							name={`defer_pending&${item.id}`}
							options={OPTIONS}
							onChange={(val) => {
								if (val === 'no') {
									setValue(`pay_now&${item.id}`, '100');
								} else {
									setValue(`pay_now&${item.id}`, '');
								}
							}}
							rules={{ required: 'this is required' }}
							size="md"
							control={control}
						/>
					</div>
					<div className={styles.error}>{errors?.[`defer_pending&${item.id}`] ? '*required' : null}</div>
				</>
			),
			id: 'defer_pending_payment',
		},
		{
			Header   : 'PAY NOW %',
			accessor : (item = {}) => (
				<>
					<div>
						<InputController
							name={`pay_now&${item.id}`}
							type="number"
							control={control}
							size="md"
							placeholder="Type here"
							rules={{
								required : 'this is required',
								max      : {
									value   : 100,
									message : 'Value should not exceed 100',
								},
							}}
							disabled={watch(`defer_pending&${item.id}`) === 'no'}
						/>
					</div>
					<div className={styles.error}>
						{errors?.[`pay_now&${item.id}`]
							? '*required value less than or equal to 100' : null}

					</div>
				</>
			),
			id: 'pay_now_percent',
		},

		{
			Header   : 'STATUS',
			accessor : (item = {}) => (
				<div className={item?.payment_status === 'Not Due' ? styles.status_bg : styles.status_due_bg}>
					<span>{(item?.payment_status)}</span>
				</div>
			),
			id: 'payment_status',
		}]);
};

export default getSelectedColumns;
