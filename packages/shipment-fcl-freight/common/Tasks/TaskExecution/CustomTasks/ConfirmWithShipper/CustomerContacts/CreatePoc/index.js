import { Button } from '@cogoport/components';
import { InputController, MobileNumberController } from '@cogoport/forms';

import getControls from './getControls';
import styles from './styles.module.css';

const INPUT_MAPPING = {
	text         : InputController,
	mobileNumber : MobileNumberController,
};

function CreatePoc({
	setShowCreatePoc = () => {},
	control = {},
	errors = {},
	onCreateLeadUser = () => {},
	handleSubmit = () => {},
	createUserLoading = false,
}) {
	const controls = getControls();

	return (
		<div className={styles.form_container}>
			{controls.map((formControl) => {
				const { name = '', label = '', type = '' } = formControl;
				const Element = INPUT_MAPPING[type];

				if (!Element) return null;

				return (
					<div key={name} className={styles.form_item_container}>
						<label className={styles.form_label}>{label}</label>

						<Element
							control={control}
							{...formControl}
						/>

						<div className={styles.errors}>{errors?.name?.message}</div>
					</div>
				);
			})}

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					onClick={handleSubmit(onCreateLeadUser)}
					loading={createUserLoading}
					disabled={createUserLoading}
				>
					Save
				</Button>

				<Button
					themeType="tertiary"
					onClick={() => { setShowCreatePoc(false); }}
					disabled={createUserLoading}
				>
					Cancel
				</Button>
			</div>
		</div>
	);
}

export default CreatePoc;
