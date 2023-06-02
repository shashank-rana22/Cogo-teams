import { InputController, MultiselectController } from '@cogoport/forms';

import getControls from '../../controls';

import styles from './styles.module.css';

function EditPersonalDetails({
	control,
	errors,
	editNameModal,
}) {
	const controls = getControls();
	return (
		<div>

			{editNameModal.from === 'name' && (
				<div>
					<div className={styles.label}>Name</div>

					<div className={styles.value}>
						<InputController
							{...controls[1]}
							control={control}
							name="name"
						/>

						{errors?.name && (
							<div className={styles.error_text}>
								{errors.name?.message}
							</div>
						)}

					</div>
				</div>
			)}
			{editNameModal.from === 'language' && (
				<div>
					<div className={styles.label}>Preferred Languages</div>
					<div className={styles.value}>
						<MultiselectController
							{...controls[2]}
							placeholder={controls[2].placeholder}
							options={controls[2].options}
							isClearable
							control={control}
							key={controls[2].name}
						/>
					</div>
				</div>
			)}

		</div>
	);
}

export default EditPersonalDetails;
