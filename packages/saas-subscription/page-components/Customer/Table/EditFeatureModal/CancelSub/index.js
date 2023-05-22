import { Button } from '@cogoport/components';

import useCancelSubscription from '../../../../../hooks/useCancelSubscription';
import styles from '../styles.module.css';

function CancelSub({ subscriptionId = '', modalChangeHandler }) {
	const { loading = false, cancelSubscriptionHandler } = useCancelSubscription({ modalChangeHandler });
	return (
		<div className={styles.cancel_container}>
			<h3>Are you sure you want to cancel subscription?</h3>
			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					type="submit"
					size="sm"
					loading={loading}
					onClick={modalChangeHandler}
				>
					No
				</Button>
				<Button
					themeType="accent"
					type="submit"
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
