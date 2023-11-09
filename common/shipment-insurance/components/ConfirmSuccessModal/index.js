import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcAUserchat, IcAMail } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useEffect } from 'react';

import styles from './styles.module.css';

function ConfirmSuccessModal({
	handleSubmit,
	submitHandler = () => {},
	loading = false,
	pocDetails = {},
	setConfirmSuccess,
	confirmSuccess = {},
	onCancel = () => {},
	refetch = () => {},
}) {
	const { isOpen = false, isConfirm = false, isSuccess = false } = confirmSuccess || {};
	const { email, insuredFirstName, insuredLastName } = pocDetails || {};

	useEffect(() => {
		let timeout;

		if (isSuccess) {
			timeout = setTimeout(() => {
				refetch();
				onCancel();
			}, 2500);
		}

		return () => {
			clearTimeout(timeout);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	return (
		<Modal show={isOpen} closeOnOuterClick>

			{isConfirm ? (
				<>
					<div className={styles.header}>
						<h3>Please verify the recipient&apos;s information</h3>
					</div>

					<div className={styles.modal_body}>
						<div className={styles.user_container}>
							<div style={{ marginRight: 24 }} className={styles.row}>
								<IcAUserchat width={24} height={24} />
								<p>{`${insuredFirstName} ${insuredLastName}`}</p>
							</div>
							<div className={styles.row}>
								<IcAMail width={20} height={20} />
								<p>{email}</p>
							</div>
						</div>

						<p className={styles.sub_text}>
							The following user is required to confirm and complete the payment
							from the link  provided in the email in order to complete the purchase
						</p>
					</div>

					<div className={styles.footer}>
						<Button
							disabled={loading}
							themeType="secondary"
							className={styles.cancel_btn}
							onClick={() => setConfirmSuccess({ isOpen: false })}
						>
							Cancel
						</Button>

						<Button
							loading={loading}
							themeType="accent"
							onClick={handleSubmit(submitHandler)}
						>
							Send
						</Button>
					</div>
				</>
			) : null}

			{isSuccess ? (
				<div className={styles.body}>
					<Image src={GLOBAL_CONSTANTS.image_url.mail_sent} width={140} height={140} />

					<h1 className={styles.success_header}>Mail Sent Successfully</h1>
				</div>

			) : null}

		</Modal>
	);
}

export default ConfirmSuccessModal;
