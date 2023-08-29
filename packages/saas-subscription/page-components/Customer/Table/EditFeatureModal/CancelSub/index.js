import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useCancelSubscription from '../../../../../hooks/useCancelSubscription';
import styles from '../styles.module.css';

function CancelSub({ subscriptionId = '', modalChangeHandler }) {
	const { t } = useTranslation(['saasSubscription']);

	const { loading = false, cancelSubscriptionHandler } = useCancelSubscription({ modalChangeHandler });
	return (
		<div className={styles.cancel_container}>
			<h3>{t('saasSubscription:cancel_sub_text')}</h3>
			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					type="button"
					size="sm"
					loading={loading}
					onClick={() => modalChangeHandler(false)}
				>
					{t('saasSubscription:no')}
				</Button>
				<Button
					themeType="accent"
					type="button"
					size="sm"
					className={styles.save_btn}
					onClick={() => cancelSubscriptionHandler(subscriptionId)}
					loading={loading}
				>
					{t('saasSubscription:yes')}
				</Button>
			</div>
		</div>
	);
}

export default CancelSub;
