import { Button, cl } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import getElementController from '../../../../../../../../../../../configs/getElementController';

import styles from './styles.module.css';

const NAME_MAPPING = {
	unsatisfactory_rate                  : 'RATE NOT SATISFACTORY',
	unsatisfactory_destination_detention : 'DETENTION NOT SATISFACTORY',
	has_additional_line_items            : 'HAS ADDITIONAL LINE ITEMS',
	has_missing_line_items               : 'THERE ARE MISSING LINE ITEMS',
};

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

function SelectedReasonsForm({ selectedReasons = [], formProps = {}, allControls = [] }) {
	const { control, handleSubmit = () => {}, formState:{ errors = {} } } = formProps;

	const onSubmit = (values) => {
		console.log('values', values);
	};

	return (
		<form className={styles.main_container} onSubmit={handleSubmit(onSubmit)}>
			{selectedReasons.map((reason) => {
				const selectedControls = allControls[reason] || [];

				if (isEmpty(selectedControls)) {
					return null;
				}

				const title = NAME_MAPPING[reason] || startCase(reason);

				const currErrros = errors[reason] || {};

				return (
					<div key={reason} className={styles.container}>
						<div className={styles.title}>{title}</div>

						<div className={styles.form_container}>
							{selectedControls.map((item) => {
								const { label, span = 6, elementStyles = {}, ...restProps } = item;

								const { name, type = '', rules } = restProps;

								const ActiveElement = getElementController(type);

								const [, controlName] = name.split('.');

								return (
									<div
										key={name}
										className={styles.ind_container}
										style={{ width: `${(span / 12) * 100}%` }}
									>
										<div className={styles.label}>
											{label}
											{rules ? <sup className={styles.superscipt}>*</sup> : null}
										</div>

										<div className={cl`${styles.element} ${styles[type]}`} style={elementStyles}>
											<ActiveElement
												control={control}
												{...restProps}
												type={type === 'upload' ? 'input' : type}
											/>

											{currErrros?.[controlName] && (
												<div className={styles.error_message}>
													{getErrorMessage(currErrros[controlName] || {}, controlName)}
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}

			<div className={styles.container} style={{ paddingTop: '20px' }}>
				<div className={styles.label}>
					Commodity Description
					<span className={styles.second_text}>
						(Write carefully, this cannot be edited and will be used for the other services as well)
					</span>
				</div>

				<InputController
					placeholder="You may give description to get accurate Rate Revert"
					control={control}
					name="commodity_description"
				/>
			</div>

			<div className={styles.buttons}>
				<div className={styles.button_container}>
					<Button type="button" themeType="secondary">Discard</Button>

					<Button
						type="submit"
						themeType="accent"
						disabled={isEmpty(selectedReasons)}
					>
						Submit Feedback for Service
					</Button>
				</div>
			</div>
		</form>
	);
}

export default SelectedReasonsForm;
