import { DatepickerController, InputController, SelectController, TextAreaController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

function FeedbackComponent({
	feedbackData = {},
	remove = () => {},
	index = 0,
	control,
	setValue = () => {},
	errors,
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
					name={`feedback.${index}.feedback_type`}
					rules={{ required: true }}
					options={[
						{ label: 'General Feedback', value: 'general_feedback' },
						{ label: 'Credit Controller Feedback', value: 'credit_controller_feedback' },
					]}
				/>
				<div className={styles.errors}>
					{errors?.feedback?.[index]?.feedback_type
						? '*required' : null}
				</div>
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
										rules={{ required: true }}
										name={`feedback.${index}.call_feedback`}
										options={[
											{ label: 'Positive', value: 'positive' },
											{ label: 'Negative', value: 'negative' },
										]}
									/>
								</div>
								<div className={styles.errors}>
									{errors?.feedback?.[index]?.call_feedback
										? '*required' : null}
								</div>
							</div>
							<div className={styles.single_input_section}>
								<h4>Next follow up date</h4>
								<div>
									<DatepickerController
										control={control}
										rules={{ required: true }}
										name={`feedback.${index}.reminder_date`}
									/>
								</div>
								<div className={styles.errors}>
									{errors?.feedback?.[index]?.reminder_date
										? '*required' : null}
								</div>
							</div>

							<div className={styles.single_input_section} style={{ width: '180px' }}>
								<h4>Payment Commitment</h4>
								<div>
									<SelectController
										control={control}
										placeholder="Yes/No"
										name={`feedback.${index}.payment_commitment`}
										rules={{ required: true }}
										options={[
											{ label: 'Yes', value: 'yes' },
											{ label: 'No', value: 'no' },
										]}
									/>
								</div>
								<div className={styles.errors}>
									{errors?.feedback?.[index]?.payment_commitment
										? '*required' : null}
								</div>
							</div>

							{feedbackData?.payment_commitment === 'yes' && (
								<div style={{ display: 'flex' }}>
									<div className={styles.single_input_section}>
										<h4>Commitment amount</h4>
										<div style={{ display: 'flex' }}>
											<div>
												<SelectController
													control={control}
													placeholder="Currency"
													name={`feedback.${index}.currency`}
													rules={{ required: true }}
													options={currencyOptions}
													onChange={(val) => {
														setValue('currency', val);
													}}
													style={{ width: '100px', marginRight: '8px' }}
												/>
												<div className={styles.errors}>
													{errors?.feedback?.[index]?.currency
														? '*required' : null}
												</div>
											</div>
											<div>
												<InputController
													control={control}
													type="number"
													name={`feedback.${index}.price`}
													rules={{ required: true }}
													onChange={(val) => {
														setValue('price', val);
													}}
													style={{ width: '180px', marginRight: '8px' }}
												/>
												<div className={styles.errors}>
													{errors?.feedback?.[index]?.price
														? '*required' : null}
												</div>
											</div>

										</div>

									</div>
									<div className={styles.single_input_section}>
										<h4>Commitment date</h4>
										<div>
											<DatepickerController
												control={control}
												name={`feedback.${index}.commitment_date`}
												rules={{ required: true }}
											/>
										</div>
										<div className={styles.errors}>
											{errors?.feedback?.[index]?.commitment_date
												? '*required' : null}
										</div>
									</div>
								</div>
							)}
						</div>
						<div>
							<h4>Obstacles Faced</h4>
							<TextAreaController
								control={control}
								name={`feedback.${index}.obstacle_faced`}
								size="md"
								style={{ height: '80px' }}
								rules={{ required: true }}
							/>
							<div className={styles.errors}>
								{errors?.feedback?.[index]?.obstacle_faced
									? '*required' : null}
							</div>
						</div>
					</div>
				)}
				{feedbackData?.feedback_type === 'general_feedback' && (
					<div>
						<h4>General Feedback</h4>
						<TextAreaController
							control={control}
							name={`feedback.${index}.general_feedback_text`}
							size="md"
							style={{ height: '80px' }}
							rules={{ required: true }}
						/>
						<div className={styles.errors}>
							{errors?.feedback?.[index]?.general_feedback_text
								? '*required' : null}
						</div>
					</div>
				)}
			</div>

		</div>
	);
}

export default FeedbackComponent;
