import { Modal, Button } from '@cogoport/components';
import { CheckboxGroupController, DatepickerController, RadioGroupController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';
import useActivateObjective from './useActivateObjective';

const MIN_LENGTH = 1;
const MAX_LENGTH = 2;

function ObjectiveActivation(props) {
	const { objectiveId, setShowActionModal, refetch } = props;

	const {
		loading,
		onSetActivation,
		formState,
	} = useActivateObjective({ objectiveId, setShowActionModal, refetch });

	const { control, handleSubmit, watch, setValue } = formState;

	const watchCommunicationDetails = watch('communication_details');

	useEffect(() => {
		if (watchCommunicationDetails?.length < MAX_LENGTH) {
			setValue('communication_operator', '');
		}
	}, [watchCommunicationDetails, setValue]);

	return (
		<>
			<Modal.Header title="Set Objective Activation Date" />

			<form onSubmit={handleSubmit(onSetActivation)}>
				<Modal.Body>
					<p>
						Choose the date from which the Objective should be active and ready to be used.
					</p>

					<div className={styles.datepicker}>
						<DatepickerController
							name="activation_date"
							control={control}
						/>
					</div>

					<div className={styles.communication_details}>
						<h4>Communication Details Required</h4>

						<CheckboxGroupController
							className={styles.checkbox_group}
							name="communication_details"
							options={[
								{ name: 'is_mobile_requied', value: 'is_mobile_requied', label: 'Mobile' },
								{ name: 'is_email_required', value: 'is_email_required', label: 'Email' },
							]}
							control={control}
						/>

						{(!isEmpty(watchCommunicationDetails) && watchCommunicationDetails.length > MIN_LENGTH) && (
							<div className={styles.radio_group}>
								<p className={styles.label}>Conditional Operator : </p>

								<RadioGroupController
									name="communication_operator"
									options={[
										{ name: 'or', value: 'or', label: 'OR' },
										{ name: 'and', value: 'and', label: 'AND' },
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
						Cancel
					</Button>

					<Button
						type="submit"
						themeType="accent"
						loading={loading}
					>
						Set Activation
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default ObjectiveActivation;
