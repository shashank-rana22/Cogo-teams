import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image, useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function ConfirmSuccessModal({ confirmSuccess = {}, setConfirmSuccess, handleSubmit, loading = false, submitHandler }) {
	const { isOpen = false, isConfirm = false, isSuccess = false } = confirmSuccess || {};

	const { push } = useRouter();

	const { t } = useTranslation(['cargoInsurance']);

	return (
		<Modal show={isOpen} closeOnOuterClick={isConfirm}>

			{isConfirm ? (
				<>
					{' '}
					<h3 className={styles.title}>{t('cargoInsurance:confirm_title')}</h3>

					<div className={styles.footer}>
						<Button
							size="sm"
							disabled={loading}
							themeType="secondary"
							className={styles.cancel_btn}
							onClick={() => setConfirmSuccess({ isOpen: false })}
						>
							{t('cargoInsurance:cancel')}
						</Button>

						<Button
							size="sm"
							loading={loading}
							themeType="accent"
							onClick={handleSubmit(submitHandler)}
						>
							{t('cargoInsurance:confirm')}
						</Button>
					</div>
				</>
			) : null}

			{isSuccess ? (
				<div className={styles.body}>
					<Image src={GLOBAL_CONSTANTS.image_url.mail_sent} width={140} height={140} />

					<h1 className={styles.header}>{t('cargoInsurance:success_mail')}</h1>

					<Button size="sm" themeType="linkUi" onClick={() => push('/service-discovery')}>
						{t('cargoInsurance:service_discovery_cta')}
					</Button>
				</div>
			) : null}

		</Modal>
	);
}

export default ConfirmSuccessModal;
