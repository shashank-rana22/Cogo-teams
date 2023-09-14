import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function FooterCard() {
	const { push } = useRouter();

	const backaudit = () => {
		push(
			'/business-finance/account-payables/[active_tab]',
			'/business-finance/account-payables/payruns',
		);
	};
	return (
		<div className={styles.footer_card}>
			<Button
				themeType="secondary"
				onClick={backaudit}
				className={styles.button}
			>
				Cancel
			</Button>

			<Button
				themeType="primary"
				onClick={backaudit}
				className={styles.button}
			>
				Confirm Audit
			</Button>

		</div>
	);
}

export default FooterCard;
