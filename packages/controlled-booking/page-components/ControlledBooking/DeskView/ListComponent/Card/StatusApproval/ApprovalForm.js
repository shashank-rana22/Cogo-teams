import {
	ChipsController, InputController, RadioGroupController, SelectController,
} from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function ApprovalForm({ errors, control, formValues }) {
	return (
		<>
			<div className={styles.label}>Advance Payment</div>
			<div className={styles.form_element}>
				<RadioGroupController
					name="advance_payment"
					control={control}
					size="md"
					mutiple={false}
					options={[{
						label: 'Required', value: 'required',
					},
					{
						label: 'Not Required', value: 'not_requried',
					},
					]}
					className={styles.checkbox_controller}
					rules={{ required: 'This field is required' }}
				/>
				{errors?.advance_payment
					? <div className={styles.error_message}>{errors?.advance_payment?.message}</div> : null}
			</div>

			{formValues?.advance_payment === 'required' ? (
				<>

					<div className={styles.amountLabel}> Amount </div>
					<div className={styles.amount}>
						<div className={styles.select}>
							<SelectController
								name="amount_currency"
								control={control}
								size="md"
								placeholder="Select"
								options={[{
									label: 'USD', value: 'usd',
								}, {	label: 'INR', value: 'inr' }]}
								rules={{ required: 'This field is required' }}
							/>
						</div>
						<div className={styles.input}>
							<InputController
								name="amount"
								control={control}
								size="md"
								placeholder="Enter amount"
								rules={{ required: 'This field is required' }}
							/>
						</div>

					</div>
					{errors?.amount
						? <div className={styles.error_message}>{errors?.amount_currency?.message}</div> : null}
				</>
			) : null}

			<div className={styles.bookingLabel}> Booking to be placed on </div>

			<ChipsController
				control={control}
				name="booking_placed_on"
				type="chips"
				options={[
					{ value: 'ff', label: 'Freight Forwarder' },
					{ value: 'nvocc', label: 'NVOCC' },
					{ value: 'sl', label: 'Shipping Line' },
				]}
				rules={{ required: 'Required' }}
				multiple={false}
			/>
			{formValues?.booking_placed_on === 'nvocc' ? (
				<div style={{ fontSize: 10, marginTop: 4 }}>
					*NVOCC: non-vessel operating common carrier
				</div>
			) : null}
			{errors?.booking_placed_on
				? <div className={styles.error_message}>{errors?.booking_placed_on?.message}</div> : null}

		</>
	);
}

export default ApprovalForm;
