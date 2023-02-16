import { InputController, MultiselectController, MobileNumberController } from '@cogoport/forms';

import getControls from '../../controls';

import styles from './styles.module.css';

const MAPPING = {
	name                : InputController,
	email               : InputController,
	mobileNumber        : MobileNumberController,
	preferred_languages : MultiselectController,

};

function EditPersonalDetails({
	control,
	errors,
	detailsData,
}) {
	const controls = getControls(detailsData);

	return (
		<div>

			{
				Object.keys(MAPPING).map((key) => {
					const field = controls.find((b) => b.name === key);

					const { name, label, rules } = field || {};

					const DynamicController = MAPPING[key];

					return (
						<div className={styles.layout_container}>
							<div>
								<div className={styles.label}>{label}</div>

								<div className={styles.value}>
									<DynamicController
										{...field}
										control={control}
										name={name}
										rules={rules}
									/>

									{errors.name && (
										<div className={styles.error_text}>
											{errors.name.message}
										</div>
									)}

								</div>

							</div>
						</div>
					);
				})
			}

		</div>
	);
}
export default EditPersonalDetails;
