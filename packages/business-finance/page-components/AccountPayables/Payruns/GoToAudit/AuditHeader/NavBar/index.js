import { Breadcrumb } from '@cogoport/components';
import { Link } from '@cogoport/next';

import styles from './styles.module.css';

const AUDIT_INDEX = 3;

function NavBar() {
	const breadcrumbItems = [
		{
			id    : 1,
			label : 'Account Payables',
			href  : '/business-finance/account-payables',
		},
		{
			id    : 2,
			label : 'Pay Runs',
			href  : '/business-finance/account-payables/payruns',
		},
		{
			id    : 3,
			label : 'Audit',
		},
	];

	return (
		<div className={styles.navbar_container}>
			<Breadcrumb>
				{breadcrumbItems.map((item) => (
					<Breadcrumb.Item
						key={item.id}
						className={item.id !== AUDIT_INDEX && styles.text}
						label={item.href ? (
							<Link href={item.href}>
								<div>{item.label}</div>
							</Link>
						) : (
							<div>{item.label}</div>
						)}
					/>
				))}
			</Breadcrumb>
		</div>
	);
}

export default NavBar;
