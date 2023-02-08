// import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/components';
import React from 'react';

import PasswordValidator from '../PasswordValidator';

import styles from './styles.module.css';
import updatePasswordControls from './update-password-control';
import useChangePassword from './useChangePassword';

function ChangePassword({
	refetch,
	personDetails = {},
	setShowModal = () => {},
}) {
	const {
		// controls = [],
		formProps = {},
		// error = {},
		onCreate = () => {},
		onError = () => {},
		loading = false,
	} = useChangePassword({
		refetch,
		personDetails,
		updatePasswordControls,
		setShowModal,
	});
	const {
		// fields = {},
		handleSubmit = () => {},
		getValues = () => {},
	} = formProps;

	const { password = '' } = getValues();

	return (
		<div className={styles.container}>
			<div className={styles.header_text}>Update Password</div>

			{/* <Layout
				fields={fields}
				controls={controls}
				errors={error}
				id_prefix="partnerUser"
			/> */}

			<PasswordValidator password={password} />

			<div className={styles.button_container}>
				<div
					className={styles.primary_button}

				>
					<div className={styles.cancel_button}>
						<Button onClick={() => setShowModal(false)} disabled={loading}>
							CANCEL
						</Button>
					</div>

				</div>

				<div className={styles.primary_button}>
					<Button
						disabled={loading}
						onClick={handleSubmit(onCreate, onError)}
					>
						UPDATE

					</Button>

				</div>
			</div>
		</div>
	);
}

export default ChangePassword;
