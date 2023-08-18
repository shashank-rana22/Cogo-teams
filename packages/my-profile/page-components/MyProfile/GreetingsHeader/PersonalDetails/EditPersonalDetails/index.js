import { InputController, MultiselectController } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';

import getControls from '../controls';

import styles from './styles.module.css';

const FIRST_ELEMENT = 1;
const SECOND_ELEMENT = 2;

function EditPersonalDetails({
	control,
	errors,
	editNameModal,
	detailsData,
}) {
	const { t } = useTranslation(['profile']);

	const controls = getControls(detailsData, t);

	return (
		<div>

			{editNameModal.from === 'name' && (
				<div>
					<div className={styles.label}>{t('profile:name')}</div>

					<div className={styles.value}>
						<InputController
							{...controls[FIRST_ELEMENT]}
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
					<div className={styles.label}>{t('profile:preferred_languages')}</div>
					<div className={styles.value}>
						<MultiselectController
							key={controls[SECOND_ELEMENT].name}
							{...controls[SECOND_ELEMENT]}
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
