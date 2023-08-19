/* eslint-disable max-len */
import { DatepickerController, InputController, SelectController, TextAreaController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

function FeedbackComponent({
	feedbackData = {}, remove = () => {}, index = 0, control,
	setValue = () => {}, register = () => {},
}) {
	const currencyOptions = Object.values(GLOBAL_CONSTANTS.currency_code).map((item) => ({
		label : item,
		value : item,
	}));

	useEffect(() => {
		if (feedbackData?.payment_commitment === 'no') {
			setValue(`feedback.${index}.currency`, undefined);
			setValue(`feedback.${index}.price`, undefined);
			setValue(`feedback.${index}.commitment_date`, undefined);
		}
	}, [feedbackData?.payment_commitment, index, setValue]);

	return (
		<div
			className={styles.container}
			style={{
				background: !isEmpty(feedbackData?.feedback_type) ? '#fdebe9' : 'inherit',
			}}
		>
			<div className={styles.delete}>
				<IcMDelete
					height={20}
					width={20}
					onClick={() => {
						remove(index);
					}}
				/>
			</div>

			<div className={styles.feedback_type}>
				<div>Select Feedback Type</div>
				<SelectController
					control={control}
					{...register(`feedback.${index}.feedback_type`)}
					options={[
						{ label: 'General Feedback', value: 'general_feedback' },
						{ label: 'Credit Controller Feedback', value: 'credit_controller_feedback' },
					]}
					onChange={(val) => {
						setValue('feedback_type', val);
					}}
				/>
			</div>

			<div className={styles.feedback_data}>
				{feedbackData?.feedback_type === 'credit_controller_feedback' && (
					<div>
						<div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
							<div className={styles.single_input_section}>
								<h4>Call feedback</h4>
								<div>
									<SelectController
										control={control}
										placeholder="Positive/Negative"
										{...register(`feedback.${index}.call_feedback`)}
										options={[
											{ label: 'Positive', value: 'positive' },
											{ label: 'Negative', value: 'negative' },
										]}
										onChange={(val) => {
											setValue('call_feedback', val);
										}}
									/>
								</div>
							</div>
							<div className={styles.single_input_section}>
								<h4>Next follow up date</h4>
								<div>
									<DatepickerController
										control={control}
										{...register(`feedback.${index}.reminder_date`)}
										onChange={(val) => {
											setValue('reminder_date', val);
										}}
									/>
								</div>
							</div>

							<div className={styles.single_input_section} style={{ width: '180px' }}>
								<h4>Payment Commitment</h4>
								<div>
									<SelectController
										control={control}
										placeholder="Yes/No"
										{...register(`feedback.${index}.payment_commitment`)}
										options={[
											{ label: 'Yes', value: 'yes' },
											{ label: 'No', value: 'no' },
										]}
										onChange={(val) => {
											setValue('payment_commitment', val);
										}}
									/>
								</div>
							</div>

							{feedbackData?.payment_commitment === 'yes' && (
								<div style={{ display: 'flex' }}>
									<div className={styles.single_input_section}>
										<h4>Commitment amount</h4>
										<div style={{ display: 'flex' }}>
											<SelectController
												control={control}
												placeholder="Currency"
												{...register(`feedback.${index}.currency`)}
												options={currencyOptions}
												onChange={(val) => {
													setValue('currency', val);
												}}
												style={{ width: '100px', marginRight: '8px' }}
											/>
											<InputController
												control={control}
												type="number"
												{...register(`feedback.${index}.price`)}
												onChange={(val) => {
													setValue('price', val);
												}}
												style={{ width: '180px', marginRight: '8px' }}
											/>

										</div>

									</div>
									<div className={styles.single_input_section}>
										<h4>Commitment date</h4>
										<div>
											<DatepickerController
												control={control}
												{...register(`feedback.${index}.commitment_date`)}
												onChange={(val) => {
													setValue('commitment_date', val);
												}}
											/>
										</div>
									</div>
								</div>

							)}

						</div>
						<div>
							<h4>Obstacles Faced</h4>
							<TextAreaController
								control={control}
								{...register(`feedback.${index}.obstacle_faced`)}
								size="md"
								style={{ height: '80px' }}
								onChange={(e) => {
									setValue(`feedback.${index}.obstacle_faced`, e);
								}}
							/>
						</div>
					</div>
				)}
				{feedbackData?.feedback_type === 'general_feedback' && (
					<div>
						<h4>General Feedback</h4>
						<TextAreaController
							control={control}
							{...register(`feedback.${index}.general_feedback_text`)}
							size="md"
							style={{ height: '80px' }}
							onChange={(e) => {
								setValue(`feedback.${index}.general_feedback_text`, e);
							}}
						/>
					</div>
				)}
			</div>

		</div>
	);
}

export default FeedbackComponent;
