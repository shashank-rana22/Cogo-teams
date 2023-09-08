import BillingAddress from './BillingAddress';
import CustomerContacts from './CustomerContacts';
import UserOnboard from './UserOnboard';

function VerifyShipperDetails() {
	return (
		<div>
			<UserOnboard />
			<BillingAddress />
			<CustomerContacts />
		</div>

	);
}

export default VerifyShipperDetails;
