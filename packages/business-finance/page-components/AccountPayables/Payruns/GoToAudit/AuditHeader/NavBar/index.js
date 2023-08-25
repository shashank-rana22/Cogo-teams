import { Breadcrumb } from '@cogoport/components';
import { Link } from '@cogoport/next';

function NavBar() {
	return (
		<Breadcrumb>
			<Breadcrumb.Item label={(
				<Link
					href="/business-finance/account-payables"
				>
					<div>Account Payables</div>
				</Link>
			)}
			/>
			<Breadcrumb.Item label={(
				<Link
					href="/business-finance/account-payables/payruns"
				>
					<div>Pay Runs</div>
				</Link>
			)}
			/>
			<Breadcrumb.Item label="Audit" />
		</Breadcrumb>
	);
}

export default NavBar;
