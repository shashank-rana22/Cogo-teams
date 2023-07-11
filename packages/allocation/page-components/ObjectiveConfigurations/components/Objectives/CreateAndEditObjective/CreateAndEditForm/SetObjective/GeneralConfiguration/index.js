import { Button, cl } from '@cogoport/components';
import { RadioGroupController, useForm } from '@cogoport/forms';
import { IcMEdit } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';
import getGeneralConfiguratioFormControls from '../../../../../../configurations/general-configuration-form-controls';
import LIFECYCLE_STAGE_OPTIONS from '../../../../../../configurations/lifecycle-stage-options';

import styles from './styles.module.css';

function GeneralConfiguration() {
	const { control, watch } = useForm();

	const watchPartner = watch('partner');
	const watchChannel = watch('channel');

	const controls = getGeneralConfiguratioFormControls({ watchPartner, watchChannel });

	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>General Configuration</h3>

			<form className={styles.form_container}>
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
							</div>
						);
					})}

					<div className={cl`${styles.element_container} ${styles.button_container}`}>
						<Button
							className={styles.button}
							size="lg"
							themeType="secondary"
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
		</div>
	);
}

export default GeneralConfiguration;
