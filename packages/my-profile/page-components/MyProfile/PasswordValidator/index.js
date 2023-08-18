import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';
import getValidPasswordMappings from './utils/getValidPasswordMapping';

function PasswordValidator({ password = '', errorMessage = '' }) {
	const { t } = useTranslation(['profile']);

	const validPasswordMappings = getValidPasswordMappings(t);

	return (
		<div>
			<div className={styles.error_message}>
				{!isEmpty(errorMessage) ? t('profile:invalid_password_message') : null}
			</div>
			<div className={styles.password_validator}>
				<div className="title">
					{t('profile:password_validation_title')}
				</div>

				<div className="list">
					{Object.entries(validPasswordMappings)?.map(([key, value]) => {
						const { message = '', length = 0, characters = [] } = value;

						let isValid = false;
						if (key === 'minLength') {
							isValid = password.length >= length;
						} else {
							isValid = password.split('').some((char) => characters.includes(char));
						}

						return (
							<div
								key={key}
								className={`item item--${key}}`}
								style={{ display: 'flex', alignItems: 'center' }}
							>
								<div className={`icon icon--${isValid ? 'tick' : 'dot'}`}>
									{isValid ? (
										<img
											alt="tick"
											src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tick.svg"
										/>
									) : (
										<img
											alt="dot"
											src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/dot.svg"
										/>
									)}
								</div>

								<div className="message">{message}</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default PasswordValidator;
