import { Button } from '@cogoport/components';

import useCancelSubscription from '../../../../../hooks/useCancelSubscription';
import styles from '../styles.module.css';

function CancelSub({ cancelHandler, subscriptionId = '' }) {
	const { loading, cancelSubscriptionHandler } = useCancelSubscription();
	return (
		<div className={styles.cancel_container}>
			<h3>Are you sure you want to cancel subscription?</h3>
			<div className={styles.button_container}>
				<Button themeType="secondary" size="sm" loading={loading} onClick={cancelHandler}>No</Button>
				<Button
					themeType="accent"
					size="sm"
					className={styles.save_btn}
					onClick={() => cancelSubscriptionHandler(subscriptionId)}
					loading={loading}
				>
					Yes
				</Button>
			</div>
		</div>
	);
}

export default CancelSub;
