import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function range(start, stop) {
	const startCharCode = start.charCodeAt(0);
	const endCharCode = stop.charCodeAt(0);

	const result = [];

	for (let charCode = startCharCode; charCode <= endCharCode; charCode += 1) {
		result.push(String.fromCharCode(charCode));
	}

	return result;
}

const VALID_PASSWORD_MAPPINGS = {
	lowercase: {
		characters : range('a', 'z'),
		message    : 'at least one lowercase character.',
	},
	uppercase: {
		characters : range('A', 'Z'),
		message    : 'at least one uppercase character.',
	},
	digit: {
		characters : range('0', '9'),
		message    : 'at least one digit.',
	},
	special: {
		characters : '!@#$%^&*'.split(''),
		message    : 'at least one special character.',
	},
	minLength: {
		length  : 8,
		message : 'minimum 8 characters.',
	},
};

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
