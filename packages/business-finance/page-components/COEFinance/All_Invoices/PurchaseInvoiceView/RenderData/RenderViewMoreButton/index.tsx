import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styled from './styles.module.css';

interface Props {
	itemData?: any;
	searchValue?: string;
}

interface ItemTypes {
	billNumber?:string;
	billId?:string;
	organizationId?:string;
	status?:string;
	billType?:string;
	jobNumber?:string;
	isProforma?:string;
	jobType?:string
}
function RenderViewMoreButton({ itemData = {}, searchValue = '' }: Props) {
	const router = useRouter();

	const handleChange = (item: ItemTypes) => {
		router.push(
			`/business-finance/coe-finance/${router.query.active_tab}/view-invoices?billId=${item?.billId}
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
