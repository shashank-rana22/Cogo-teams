import { Pill, RadioGroup, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import getElementController from '../../../../../../../../../../../configs/getElementController';
import getPayload from '../../../../../../utils/getPayload';

import styles from './styles.module.css';

const getErrorMessage = (error, name) => {
	if (!['preferred_freight_rate'].includes(name)) {
		return error.message || 'This is Required';
	}

	if (isEmpty(error)) {
		return null;
	}

	if (error.price?.type === 'min') {
		return 'price should be greater than 0';
	}

	return `${startCase(Object.keys(error)[GLOBAL_CONSTANTS.zeroth_index])} is Required`;
};

function FormComponent({
	currErrros = {},
	control = () => {},
	selectedControls = [],
	prefilledData = {},
	reason = '',
	unsatisfiedFeedbacks = {},
	createTrigger = () => {},
	getSpotSearchRateFeedback = () => {},
}) {
	const { feedbacks = [], serial_id = '', unsatisfactory_free_days = {}, unsatisfactory_rate = {} } = prefilledData;

	const { preferred_freight_rate = 0, preferred_freight_rate_currency = '' } = unsatisfactory_rate;

	const { destination_detention = 0, origin_detention = 0 } = unsatisfactory_free_days;

	const {
		data = {},
		values,
		details,
		rate,
		selectedSevice,
		spot_search_id,
	} = unsatisfiedFeedbacks;

	if (Object.keys(data).includes(reason)) {
		return (
			<div className={styles.card_container}>
				<div className={styles.custom_shape}>BEST PRICE</div>

				<div className={styles.validate_text}>
					<b> This is the best available rate for this Port Pair.</b>
					{' '}
					Are you satisfied with the rate available?
				</div>

				<RadioGroup
					size="sm"
					options={[{ label: 'Yes', name: 'yes', value: 'yes' }, { label: 'No', name: 'no', value: 'no' }]}
					onChange={async (value) => {
						if (value === 'yes') {
							const finalPayload = getPayload({
								satisfiedfeedbacks: [reason],
								values,
								details,
								rate,
								selectedSevice,
								spot_search_id,
							});

							await createTrigger({ data: finalPayload });

							getSpotSearchRateFeedback();
						}
					}}
				/>
			</div>
		);
	}

	if (feedbacks.includes(reason)) {
		return (
			<div className={styles.container}>
				<div className={styles.text_container}>
					<IcCFtick />

					<div className={styles.text}>
						You have just submitted a Feedback for this Reason for Basic Freight
					</div>
				</div>

				{['unsatisfactory_free_days', 'unsatisfactory_rate'].includes(reason) ? (
					<div className={styles.feedback_details}>
						<Pill
							size="sm"
							color="#fff"
							style={{ border: '1px solid #ACDADF', marginBottom: '0' }}
						>
							Feedback ID: #
							{serial_id}
						</Pill>

						{reason === 'unsatisfactory_free_days'
							? (
								<div className={styles.text}>
									Preferred Origin Detention Days:

									<b className={styles.value}>{origin_detention}</b>
								</div>
							) : null}

						{reason === 'unsatisfactory_free_days'
							? (
								<div className={styles.text}>
									Preferred Dest. Detention Days:

									<b className={styles.value}>{destination_detention}</b>
								</div>
							) : null}

						{reason === 'unsatisfactory_rate'
							? (
								<div className={styles.text}>
									Indicative Rate:

									<b className={styles.value}>
										{formatAmount({
											amount   : preferred_freight_rate,
											currency : preferred_freight_rate_currency,
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'symbol',
												maximumFractionDigits : 2,
											},
										})}

									</b>
								</div>
							) : null}
					</div>
				) : null}
			</div>
		);
	}

	return (
		<div className={styles.form_container}>
			{selectedControls.map((item) => {
				const {
					label,
					elementStyles = {},
					divWidth = 'calc(50% - 12px)',
					...restProps
				} = item;

				const { name, type = '', rules } = restProps;

				const ActiveElement = getElementController(type);

				const [, controlName] = name.split('.');

				return (
					<div
						key={name}
						className={styles.ind_container}
						style={{ width: divWidth }}
					>
						<div className={styles.label}>
							{label}
							{rules ? (
								<sup className={styles.superscipt}>*</sup>
							) : null}
						</div>

						<div
							className={cl`${styles.element} ${styles[type]}`}
							style={elementStyles}
						>
							<ActiveElement
								control={control}
								{...restProps}
								type={type === 'upload' ? 'input' : type}
							/>

							{currErrros?.[controlName] && (
								<div className={styles.error_message}>
									{getErrorMessage(
										currErrros[controlName] || {},
										controlName,
									)}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default FormComponent;
