import { Modal, Button } from '@cogoport/components';
import { InputController } from '@cogoport/forms';

import useChangePassword from '../../../hooks/useChangePassword';
import validatePassword from '../../../utils/validatePassword';

import PasswordValidator from './PasswordValidator';
import styles from './styles.module.css';

function ChangePassword(props) {
	const {
		actionModal = {},
		setActionModal = () => {},
		refetch = () => {},
	} = props;

	const {
		onCreate = () => {},
		onError = () => {},
		loading: apiLoading = false,
		control,
		errors,
		getValues = () => {},
		handleSubmit = () => { },
		patternError,
	} = useChangePassword({
		refetch,
		actionModal,
		setActionModal,
	});

	const { password = '' } = getValues();

	return (
		<>
			<Modal.Header title="Update Password" />

			<form onSubmit={handleSubmit(onCreate, onError)}>
				<Modal.Body>

					<div className={styles.user_container}>

						<div className={styles.flex_container}>
							<span className={styles.label}>Name</span>
							<span className={styles.value}>{actionModal?.agentData?.name || '__'}</span>
						</div>
						<div className={styles.flex_container}>
							<span className={styles.label}>Email</span>
							<span className={styles.value}>{actionModal?.agentData?.email || '__'}</span>
						</div>

						<div className={styles.container}>
							<div className={styles.label}>Enter password</div>

							<InputController
								{...control}
								control={control}
								errors={errors}
								name="password"
								rules={{
									required : true,
									validate : (value) => validatePassword({
										value,
										errorMessage: 'Password is invalid',
									}),
								}}
								size="sm"
							/>
							<div className={styles.password_validator}>
								<PasswordValidator
									errorMessage={errors?.password?.message || patternError}
									password={password}
								/>
							</div>

						</div>

					</div>

				</Modal.Body>

				<Modal.Footer>
					<Button
						onClick={() => setActionModal({})}
						disabled={apiLoading}
						type="button"
						themeType="tertiary"
						className={styles.cancel_cta}
					>
						CANCEL
					</Button>

					<Button
						type="submit"
						disabled={apiLoading || !password}
						themeType="primary"
					>
						UPDATE
					</Button>

				</Modal.Footer>

			</form>
		</>
	);
}

export default ChangePassword;
