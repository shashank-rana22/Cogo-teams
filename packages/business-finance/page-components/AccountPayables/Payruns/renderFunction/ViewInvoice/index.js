import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import useGetPermission from '@cogoport/request/hooks/useGetPermission';
import { isEmpty, snakeCase } from '@cogoport/utils';
import React from 'react';

import CC from '../../utils/conditionConstants';

import styles from './styles.module.css';

function ViewInvoices({
	itemData = {}, setSelectedPayrun = () => {},
	selectedPayrun = {},
}) {
	const { isConditionMatches } = useGetPermission();

	const isCreatePayrunAllowed = isConditionMatches(
		CC.SEE_CREATE_PAYRUN_ALLOWED,
	);

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
			&services=${snakeCase(itemData?.service_type)}&payrun_type=${itemData?.type}
			&payrun=${itemData?.id}&currency=${itemData?.currency}&entity=${itemData?.entityCode}`,
			);
		} else {
			push(
				`/business-finance/account-payables/invoices/create-pay-run?payrun=${itemData?.id}
				&payrun_type=${itemData?.type}&currency=${itemData?.currency}&entity=${itemData?.entityCode}`,
			);
		}
	};

	if (itemData?.state === 'DRAFT' && isCreatePayrunAllowed) {
		return (
			<Button
				themeType="secondary"
				onClick={handleEditPayrun}
			>
				<span className={styles.edit_text}>Edit Payrun</span>
				<IcMEdit height={10} width={10}	/>
			</Button>
		);
	}
	return (
		<Button
			themeType="secondary"
			className={styles.view_invoices}
			onClick={handleClick}
		>
			View Invoices
		</Button>
	);
}

export default ViewInvoices;
