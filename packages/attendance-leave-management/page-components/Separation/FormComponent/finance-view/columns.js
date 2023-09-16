import React from 'react';

import styles from './styles.module.css';

const fnfColumns = ({
	errors = {},
}) => ([
	{
		Header   : 'PARTICULAR',
		accessor : (item = {}) => (
			<section className={styles.particular_container}>
				<div>{item?.particular}</div>
				{errors?.item?.particular ? <div className={styles.error}>*Required</div> : null}
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
			<section className={styles.particular_container}>
				{/* <InputController
					control={control}
					placeholder="Type Amount here"
					className={styles.name_input}
					name={`${item.particular}RecoverableAmount`}
					disabled
					value={item?.recoverable_amount}
					size="md"
					type="number"
					rules={{ required: { value: true, message: '*This Field is required' } }}
				/> */}

				{item.recoverable_amount}
			</section>
		),
	},
]);
export default fnfColumns;
