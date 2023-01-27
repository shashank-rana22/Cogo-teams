import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styled from './styles.module.css';
// import { IcCRedCircle } from '@cogoport/icons-react';

interface itemProps {
	status: string;
	urgencyTag: Array<string>;
}
interface Props {
	itemData: itemProps;
}
function RenderViewMoreButton({ itemData }: Props) {
	const router = useRouter();

	const handleChange = (itemData: any) => {
		router.push(
			`/business-finance/coe-finance/${router.query.active_tab}/view-invoices?billId=${itemData?.billId}&billNumber=${itemData?.billNumber}&orgId=${itemData?.organizationId}&jobNumber=${itemData?.jobNumber}&status=${itemData?.status}&billType=${itemData?.billType}&isProforma=${itemData?.isProforma}`,
		);
	};

	return (
		<div className={styled.buttonss}>
			{/* {itemData?.urgencyTag && (
        <div className={styled.Ribbons}>
          <div className={styled.ribbon}>Urgent</div>
        </div>
      )}  */}

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
