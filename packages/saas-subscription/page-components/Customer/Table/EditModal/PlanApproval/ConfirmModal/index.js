import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function ConfirmModal({ confirm, setConfirm, clickHandler, loading }) {
	const { t } = useTranslation(['saasSubscription']);

	const closeModalHandler = () => {
		setConfirm({ open: false });
	};

	return (
		<Modal show={confirm.open} onClose={closeModalHandler}>
			<div className={styles.container}>
				<h2>{`${t('saasSubscription:sure')} ${confirm.action} ${t('saasSubscription:plan')}`}</h2>
				<div className={styles.row}>
					<Button
						disabled={loading}
						themeType="secondary"
						onClick={closeModalHandler}
					>
						{t('saasSubscription:no')}

					</Button>
					<Button
						disabled={loading}
						onClick={() => clickHandler(confirm.action)}
					>
						{t('saasSubscription:yes')}

					</Button>
				</div>
			</div>

		</Modal>
	);
}

export default ConfirmModal;
