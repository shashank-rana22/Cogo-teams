import { Button, Toast, cl } from '@cogoport/components';
import { RadioGroupController } from '@cogoport/forms';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';
import LIFECYCLE_STAGE_OPTIONS from '../../../../../../configurations/lifecycle-stage-options';

import EditApplicableAgentsModal from './EditApplicableAgentsModal';
import styles from './styles.module.css';
import useSetGeneralConfiguration from './useSetGeneralConfigurations';

function GeneralConfiguration(props) {
	const { formValues, setFormValues, onSaveCallback } = props;

	const {
		selectedRoles,
		showEditAgentsModal,
		setShowEditAgentsModal,
		control,
		errors,
		handleSubmit,
		controls,
		onSave,
	} = useSetGeneralConfiguration({ setFormValues, onSaveCallback });

	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>General Configuration</h3>

			<form className={styles.form_container} onSubmit={handleSubmit(onSave)}>
				<div className={styles.upper_form}>
					{controls.map((formElement) => {
						const { name, label, type, ...rest } = formElement;

						const Element = getFieldController(type);

						if (!Element) return null;

						return (
							<div key={name} className={styles.element_container}>
								<p>{label}</p>

								<Element
									size="md"
									key={name}
									control={control}
									name={name}
									{...rest}
								/>

								{!isEmpty(errors) ? (
									<div className={styles.error_message}>
										{errors[name]?.message}
									</div>
								) : null}
							</div>
						);
					})}

					<div className={cl`${styles.element_container} ${styles.button_container}`}>
						<Button
							className={styles.edit_button}
							size="lg"
							themeType="secondary"
							onClick={() => {
								if (isEmpty(selectedRoles)) {
									return Toast.error('Please Select a role first');
								}
								return setShowEditAgentsModal(true);
							}}
						>
							<IcMEdit style={{ marginRight: '4px' }} />
							Edit Applicable Agents
						</Button>
					</div>
				</div>

				<div className={styles.lower_form}>
					<RadioGroupController
						control={control}
						name="lifecycle_stage"
						options={LIFECYCLE_STAGE_OPTIONS}
					/>

					<Button
						type="submit"
						themeType="secondary"
						size="md"
					>
						Save
					</Button>
				</div>
			</form>

			{showEditAgentsModal && (
				<EditApplicableAgentsModal
					showEditAgentsModal={showEditAgentsModal}
					setShowEditAgentsModal={setShowEditAgentsModal}
					selectedRoles={selectedRoles}
					formValues={formValues}
					setFormValues={setFormValues}
				/>
			)}
		</div>
	);
}

export default GeneralConfiguration;
