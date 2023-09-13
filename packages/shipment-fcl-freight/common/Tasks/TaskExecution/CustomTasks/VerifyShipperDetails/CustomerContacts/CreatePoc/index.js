import { Button } from '@cogoport/components';
import { InputController, MobileNumberController } from '@cogoport/forms';

import styles from './styles.module.css';

function CreatePoc({
	setShowCreatePoc = () => {},
	control = {},
	onCreateLeadUser = () => {},
	handleSubmit = () => {},
}) {
	return (
		<div className={styles.form_container}>
			<div className={styles.form_item_container}>
				<label className={styles.form_label}>Name</label>

				<InputController
					size="sm"
					name="new_name"
					control={control}
					placeholder="Enter Name"
				/>
			</div>

			<div className={styles.form_item_container}>
				<label className={styles.form_label}>Email</label>

				<InputController
					size="sm"
					name="new_email"
					control={control}
					placeholder="Enter Email Address"
				/>
			</div>

			<div className={styles.form_item_container}>
				<label className={styles.form_label}>Mobile Number</label>

				<MobileNumberController
					size="sm"
					name="new_mobile_number"
					control={control}
					placeholder="Enter Mobile Number"
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					onClick={handleSubmit(onCreateLeadUser)}
				>
					Save
				</Button>

				<Button
					themeType="tertiary"
					onClick={() => { setShowCreatePoc(false); }}
				>
					Cancel
				</Button>
			</div>
		</div>
	);
}

export default CreatePoc;
