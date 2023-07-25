import { Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getColumns from './getColumns';
import ManagerApproval from './ManagerApproval';
import styles from './styles.module.css';

function ControlledBookingDetails({ refetchCheckout, checkout_approvals, servicesApplicable = [] }) {
	const { manager_approval_proof } = checkout_approvals?.[GLOBAL_CONSTANTS.zeroth_index] || [];

	const columns = getColumns();

	return (
		<div className={styles.container}>
			<Table
				columns={columns}
				data={servicesApplicable}
			/>

			<ManagerApproval
				refetchCheckout={refetchCheckout}
				manager_approval_proof={manager_approval_proof}
				checkout_approvals={checkout_approvals}
			/>
		</div>
	);
}

export default ControlledBookingDetails;
