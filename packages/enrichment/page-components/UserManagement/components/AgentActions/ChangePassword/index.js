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
		onError = () => { },
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
				/>
				<div className={styles.password_validator}>
					<PasswordValidator errorMessage={errors?.password?.message || patternError} password={password} />
				</div>

			</div>

			<Modal.Footer>
				<Button
					onClick={() => setActionModal({})}
					disabled={apiLoading}
					themeType="tertiary"
					className={styles.cancel_cta}
				>
					CANCEL
				</Button>

				<Button
					disabled={apiLoading || !password}
					onClick={handleSubmit(onCreate, onError)}
					themeType="primary"
				>
					UPDATE
				</Button>

			</Modal.Footer>
		</>
	);
}

export default ChangePassword;
