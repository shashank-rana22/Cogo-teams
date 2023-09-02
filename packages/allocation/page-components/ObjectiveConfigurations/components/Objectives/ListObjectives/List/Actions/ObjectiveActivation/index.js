import { Modal, Button } from '@cogoport/components';
import { CheckboxGroupController, DatepickerController, RadioGroupController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import styles from './styles.module.css';
import useActivateObjective from './useActivateObjective';

const MIN_LENGTH = 1;
const MAX_LENGTH = 2;

function ObjectiveActivation(props) {
	const { t } = useTranslation(['allocation']);

	const { objectiveId, setShowActionModal, refetch } = props;

	const {
		loading,
		onSetActivation,
		formState,
	} = useActivateObjective({ objectiveId, setShowActionModal, refetch });

	const { control, handleSubmit, watch, setValue, formState: { errors } } = formState;

	const watchCommunicationDetails = watch('communication_details');

	useEffect(() => {
		if (watchCommunicationDetails?.length < MAX_LENGTH) {
			setValue('communication_operator', '');
		}
	}, [watchCommunicationDetails, setValue]);

	return (
		<>
			<Modal.Header title={t('allocation:set_objective_activation_date')} />

			<form onSubmit={handleSubmit(onSetActivation)}>
				<Modal.Body>
					<p>
						{t('allocation:choose_activation_date')}
					</p>

					<div className={styles.datepicker}>
						<DatepickerController
							name="activation_date"
							control={control}
							showTimeSelect
							placement="right"
							shouldCloseOnSelect
							rules={{
								required: t('allocation:date_rules_required'),
							}}
						/>

						<p className={styles.error}>{errors?.activation_date?.message}</p>
					</div>

					<div className={styles.communication_details}>
						<h4>{t('allocation:communication_details_required')}</h4>

						<CheckboxGroupController
							className={styles.checkbox_group}
							name="communication_details"
							options={[
								{
									name  : 'is_mobile_required',
									value : 'is_mobile_required',
									label : t('allocation:mobile_label'),
								},
								{
									name  : 'is_email_required',
									value : 'is_email_required',
									label : t('allocation:email_label'),
								},
							]}
							control={control}
						/>

						{(!isEmpty(watchCommunicationDetails) && watchCommunicationDetails.length > MIN_LENGTH) && (
							<div className={styles.radio_group}>
								<p className={styles.label}>{t('allocation:conditional_operator')}</p>

								<RadioGroupController
									name="communication_operator"
									options={[
										{ name: 'or', value: 'or', label: t('allocation:or_label') },
										{ name: 'and', value: 'and', label: t('allocation:and_label') },
									]}
									control={control}
								/>
							</div>
						)}
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						type="button"
						themeType="tertiary"
						style={{ marginRight: '12px' }}
						disabled={loading}
						onClick={() => setShowActionModal({})}
					>
						{t('allocation:cancel_button')}
					</Button>

					<Button
						type="submit"
						themeType="accent"
						loading={loading}
					>
						{t('allocation:set_activation')}
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default ObjectiveActivation;
