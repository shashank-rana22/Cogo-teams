import { Button, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import useUpdateConsolidation from '../../../hooks/useUpdateConsolidation';

import styles from './styles.module.css';

const CONSOLIDATION_OPTIONS = [
	{
		label : 'No',
		value : 'auto',
	},
	{
		label : 'Yes',
		value : 'manual',
	},
];

function Consolidation(props) {
	const {
		shipment_data = {},
		setShowModal = () => {},
		servicesList = [],
		refetch = () => {},
	} = props;
	const approvalType = shipment_data?.all_services?.[GLOBAL_CONSTANTS.zeroth_index]
		?.invoice_approval_type;

	const [invoiceApprovalType, setInvoiceApprovalType] = useState(approvalType);

	const { loading, updateDetails } = useUpdateConsolidation({
		allServices : servicesList,
		callback    : () => {
			refetch();
			setShowModal();
		},
	});

	return (
		<div>
			<Select
				options={CONSOLIDATION_OPTIONS}
				value={invoiceApprovalType}
				onChange={(val) => setInvoiceApprovalType(val)}
				size="sm"
			/>
			<div className={styles.button_wrapper}>
				<Button
					themeType="secondary"
					size="md"
					onClick={() => setShowModal(false)}
					disabled={loading}
					className={styles.cancel}
				>
					Cancel
				</Button>
				<Button
					themeType="primary"
					size="md"
					disabled={loading}
					onClick={() => updateDetails(invoiceApprovalType)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default Consolidation;
