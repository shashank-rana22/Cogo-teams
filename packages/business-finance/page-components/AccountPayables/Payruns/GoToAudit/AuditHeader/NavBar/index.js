import { Breadcrumb } from '@cogoport/components';
import { Link } from '@cogoport/next';

import styles from './styles.module.css';

function NavBar() {
	return (
		<div className={styles.navbar_container}>
			<Breadcrumb>
				<Breadcrumb.Item
					className={styles.text}
					label={(
						<Link
							href="/business-finance/account-payables"
						>
							<div>Account Payables</div>
						</Link>
					)}
				/>
				<Breadcrumb.Item
					className={styles.text}
					label={(
						<Link
							href="/business-finance/account-payables/payruns"
						>
							<div>Pay Runs</div>
						</Link>
					)}
				/>
				<Breadcrumb.Item label="Audit" />
			</Breadcrumb>
		</div>
	);
}

export default NavBar;
