import styles from './styles.module.css';

const VALID_PASSWORD_MAPPINGS = {
	lowercase: {
		pattern : /[a-z]/gm,
		message : 'at least one lowercase character.',
	},
	uppercase: {
		pattern : /[A-Z]/gm,
		message : 'at least one uppercase character.',
	},
	digit: {
		pattern : /[0-9]/gm,
		message : 'at least one digit.',
	},
	special: {
		pattern : /[!@#$%^&*]/gm,
		message : 'at least one special character.',
	},
	minLength: {
		pattern : /[a-zA-Z0-9!@#$%^&*]{8,}/gm,
		message : 'minimum 8 characters.',
	},
};

function PasswordValidator() {
	return (

		<div className={styles.password_validator}>
			<div className="title">Password must contain:</div>

			<div className="list">
				{Object.entries(VALID_PASSWORD_MAPPINGS)?.map(([key, value]) => {
					const { message = '' } = value;

					// const regex = new RegExp(pattern);

					// const isValid = regex.test(password);

					return (
						<div className={`item item--${key}}`} style={{ display: 'flex', alignItems: 'center' }}>
							{/* <div className={`icon icon--${isValid ? 'tick' : 'dot'}`}>
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
							</div> */}

							<div className="icon icon--dot">
								<img
									alt="dot"
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/dot.svg"
								/>
							</div>

							<div className="message">{message}</div>
						</div>
					);
				})}
			</div>
		</div>

	);
}

export default PasswordValidator;
