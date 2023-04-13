import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';
import VALID_PASSWORD_MAPPINGS from './utils/getValidPasswordMapping';

function PasswordValidator({ password = '', errorMessage = '' }) {
	return (
		<div>
			<div className={styles.error_message}>
				{!isEmpty(errorMessage) ? 'Invalid Password' : null}
			</div>
			<div className={styles.password_validator}>
				<div className="title">Password must contain:</div>

				<div className="list">
					{Object.entries(VALID_PASSWORD_MAPPINGS)?.map(([key, value]) => {
						const { message = '', length = 0, characters = [] } = value;

						// const regex = new RegExp(pattern);

						// const isValid = regex.test(password);

						let isValid = false;
						if (key === 'minLength') {
							isValid = password.length >= length;
						} else {
							isValid = password.split('').some((char) => characters.includes(char));
						}

						return (
							<div className={`item item--${key}}`} style={{ display: 'flex', alignItems: 'center' }}>
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
