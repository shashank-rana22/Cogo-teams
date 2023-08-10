import { InputController, MultiselectController } from '@cogoport/forms';

import getControls from '../controls';

import styles from './styles.module.css';

function EditPersonalDetails({
	control,
	errors,
	editNameModal,
	detailsData,
}) {
	const controls = getControls(detailsData);

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
							key={controls[2].name}
							{...controls[2]}
							control={control}
							value={detailsData.preferred_languages}
						/>
					</div>
				</div>
			)}

		</div>
	);
}

export default EditPersonalDetails;
