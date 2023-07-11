import ManagerApproval from './ManagerApproval';

function ControlledBookingDetails({ refetchCheckout, checkout_approvals }) {
	const { manager_approval_proof } = checkout_approvals?.[0] || [];

	return (
		<div>
			<ManagerApproval
				refetchCheckout={refetchCheckout}
				manager_approval_proof={manager_approval_proof}
				checkout_approvals={checkout_approvals}
			/>
		</div>
	);
}

export default ControlledBookingDetails;
