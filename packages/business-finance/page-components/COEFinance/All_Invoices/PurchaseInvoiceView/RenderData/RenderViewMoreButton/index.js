import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styled from './styles.module.css';

function RenderViewMoreButton({ itemData = {}, searchValue = '' }) {
	const router = useRouter();

	const handleChange = (item) => {
		router.push(
			`/business-finance/audit-function/${router.query.active_tab}/view-invoices?billId=${item?.billId}
			&billNumber=${item?.billNumber}&orgId=${item?.organizationId}&jobNumber=${item?.jobNumber}
			&status=${item?.status}&billType=${item?.billType}&isProforma=${item?.isProforma}&jobType=${item?.jobType}
			&searchValue=${searchValue}`,
		);
	};

	return (
		<div className={styled.buttonss}>
			<div>
				<Button
					style={{ height: '30px', fontSize: '12px' }}
					themeType="secondary"
					onClick={() => {
						handleChange(itemData);
					}}
				>
					View Invoice
				</Button>
			</div>
		</div>
	);
}

export default RenderViewMoreButton;
