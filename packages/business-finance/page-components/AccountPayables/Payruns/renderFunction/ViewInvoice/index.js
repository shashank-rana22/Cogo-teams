import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ViewInvoices({
	itemData = {}, setSelectedPayrun = () => {},
	selectedPayrun = {},
}) {
	const { push } = useRouter();

	const handleClick = () => {
		if (isEmpty(selectedPayrun)) {
			setSelectedPayrun(itemData);
		} else {
			setSelectedPayrun(null);
		}
	};

	const handleEditPayrun = () => {
		if (itemData?.type === 'OVERSEAS') {
			push(
				`/business-finance/account-payables/invoices/over-seas-agent?organizationId=${itemData?.organization_id}
			&services=${itemData?.service_type}&payrun_type=${itemData?.type}
			&payrun=${itemData?.id}&currency=${itemData?.currency}&entity=${itemData?.entityCode}`,
			);
		} else {
			push(
				`/business-finance/account-payables/invoices/create-pay-run?payrun=${itemData?.id}
				&payrun_type=${itemData?.type}&currency=${itemData?.currency}&entity=${itemData?.entityCode}`,
			);
		}
	};

	if (itemData?.state === 'DRAFT') {
		return (
			<div>
				<Button
					themeType="secondary"
					onClick={handleEditPayrun}
				>
					<IcMEdit height={12} width={12}	/>

					<span className={styles.edit_text}>Edit Payrun</span>
				</Button>
			</div>
		);
	}
	return (
		<div>
			<Button
				themeType="secondary"
				className={styles.view_invoices}
				onClick={handleClick}
			>
				View Invoices
			</Button>
		</div>
	);
}

export default ViewInvoices;
