import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function ConfirmSuccessModal({ confirmSuccess = {}, setConfirmSuccess, handleSubmit, loading, submitHandler }) {
	const { isOpen = false, isConfirm = false, isSuccess = false } = confirmSuccess;

	return (
		<Modal show={isOpen} closeOnOuterClick={isConfirm}>
			<div>
				{isConfirm ? (
					<>
						{' '}
						<h3 className={styles.title}>Are you sure you want to Purchase Insurance?</h3>

						<div className={styles.footer}>
							<Button
								size="sm"
								disabled={loading}
								themeType="secondary"
								className={styles.cancel_btn}
								onClick={() => setConfirmSuccess({ isOpen: false })}
							>
								Cancel
							</Button>

							<Button
								size="sm"
								loading={loading}
								themeType="accent"
								onClick={handleSubmit(submitHandler)}
							>
								Confirm
							</Button>
						</div>
					</>
				) : null}

				{isSuccess ? (
					<>
						<Image src={GLOBAL_CONSTANTS.image_url.mail_sent} width={140} height={140} />

						<h1 className={styles.header}>
							Mail sent successfully
						</h1>
						<Button size="sm" themeType="linkUi">Go To Service Discovery</Button>

					</>
				) : null}
			</div>
		</Modal>
	);
}

export default ConfirmSuccessModal;
