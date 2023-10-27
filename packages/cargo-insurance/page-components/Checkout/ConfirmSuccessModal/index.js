import { Modal, Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcAUserchat, IcAMail, IcCWhatsapp } from '@cogoport/icons-react';
import { Image, useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function ConfirmSuccessModal({
	confirmSuccess = {},
	setConfirmSuccess, handleSubmit,
	pocDetails = {}, loading = false, submitHandler,
}) {
	const { isOpen = false, isConfirm = false, isSuccess = false, paymentLink = '' } = confirmSuccess || {};
	const { email, insuredFirstName, insuredLastName } = pocDetails || {};

	const { push } = useRouter();

	const { t } = useTranslation(['cargoInsurance']);

	const copyLinkHandler = () => {
		navigator.clipboard.writeText(paymentLink);
		Toast.success(t('cargoInsurance:pay_link_copy'));
	};

	return (
		<Modal show={isOpen} closeOnOuterClick>

			{isConfirm ? (
				<>
					<div className={styles.header}>
						<h3>{t('cargoInsurance:verify_recipient')}</h3>
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
							{t('cargoInsurance:user_confirm')}
						</p>
					</div>

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
							{t('cargoInsurance:send')}
						</Button>
					</div>
				</>
			) : null}

			{isSuccess ? (
				<>
					<div className={styles.body}>
						<Image src={GLOBAL_CONSTANTS.image_url.mail_sent} width={140} height={140} />

						<h1 className={styles.success_header}>{t('cargoInsurance:success_mail')}</h1>
						<p style={{ margin: 0 }} className={styles.sub_text}>
							{t('cargoInsurance:pay_link_1')}
							{' '}
							<IcCWhatsapp />
							{' '}
							{t('cargoInsurance:pay_link_2')}
						</p>

						<Button onClick={copyLinkHandler} size="sm" themeType="linkUi">
							{t('cargoInsurance:copy_link')}
						</Button>
					</div>

					<div className={styles.footer}>
						<Button size="sm" themeType="linkUi" onClick={() => push('/service-discovery')}>
							{t('cargoInsurance:service_discovery_cta')}
						</Button>
					</div>
				</>

			) : null}

		</Modal>
	);
}

export default ConfirmSuccessModal;
