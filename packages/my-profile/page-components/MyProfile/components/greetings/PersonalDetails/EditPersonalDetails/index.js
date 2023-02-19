import { InputController } from '@cogoport/forms';

import styles from './styles.module.css';

function EditPersonalDetails({
	control,
	errors,
}) {
	return (
		<div>

			<div className={styles.label}>Name</div>

			<div className={styles.value}>
				<InputController
					{...control}
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
	);
}
export default EditPersonalDetails;
