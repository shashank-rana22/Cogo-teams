import { InputController } from '@cogoport/forms';

import getControls from '../../controls';

import styles from './styles.module.css';

function EditPersonalDetails({
	control,
	errors,
}) {
	const controls = getControls();
	return (
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
	);
}
export default EditPersonalDetails;
