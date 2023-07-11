import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import React from 'react';

function PaymentInitiatedPayrunDownload() {
	return (
		<div>
			<Button themeType="tertiary">
				<IcMDownload height={20} width={20} />
			</Button>
		</div>
	);
}

export default PaymentInitiatedPayrunDownload;
