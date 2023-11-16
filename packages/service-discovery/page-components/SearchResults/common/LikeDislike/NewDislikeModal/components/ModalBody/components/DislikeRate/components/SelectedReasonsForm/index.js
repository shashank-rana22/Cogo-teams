import { Button, Toast, cl } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
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

function SelectedReasonsForm({
	selectedReasons = [],
	formProps = {},
	allControls = [],
	setSelectedSevice = () => {},
	rate = {},
}) {
	const { control, handleSubmit = () => {}, formState:{ errors = {} } } = formProps;

	const [{ loading = false }, trigger] = useRequest({
		method : 'POST',
		url    : '/validate_rate_feedback',
	}, { manual: true });

	const onSubmit = (values) => {
		console.log('values', values);

		try {
			trigger({
				data: {
					feedbacks : selectedReasons,
					rate_id   : rate.id,
				},
			});
		} catch (error) {
			console.log('error', error);
			Toast.error(getApiErrorString(error.response?.data));
		}
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
								const {
									label,
									elementStyles = {},
									divWidth = 'calc(50% - 12px',
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

			<div className={cl`${styles.container} ${styles.commodity_description}`} style={{ paddingTop: '20px' }}>
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
					<Button
						type="button"
						themeType="secondary"
						onClick={() => setSelectedSevice({})}
					>
						Discard
					</Button>

					<Button
						type="submit"
						themeType="accent"
						disabled={isEmpty(selectedReasons)}
						loading={loading}
					>
						Submit Feedback for Service
					</Button>
				</div>
			</div>
		</form>
	);
}

export default SelectedReasonsForm;
