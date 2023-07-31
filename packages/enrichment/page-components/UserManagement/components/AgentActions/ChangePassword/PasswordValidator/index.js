import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import VALID_PASSWORD_MAPPINGS from '../../../../utils/getValidPasswordMapping';

import styles from './styles.module.css';

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
											src={GLOBAL_CONSTANTS.image_url.password_validator_tick}
										/>
									) : (
										<img
											alt="dot"
											src={GLOBAL_CONSTANTS.image_url.password_validator_dot}
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
