import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import usePaymentInitiatedDownload from '../../hooks/usePaymentInitiatedDownload';
import usePostDownloadPayrunHistory from '../../hooks/usePostDownloadPayrunHistory';

function PaymentInitiatedPayrunDownload({ itemData = {} }) {
	const { downloadPayrunHistory } = usePostDownloadPayrunHistory();
	const { downloadPayrun } = usePaymentInitiatedDownload();

	return (
		<div>
			<Button
				themeType="tertiary"
				onClick={() => (itemData.type === 'OVERSEAS'
					? downloadPayrunHistory(itemData?.id)
					: downloadPayrun(itemData))}
			>
				<IcMDownload height={20} width={20} />
			</Button>
		</div>
	);
}

export default PaymentInitiatedPayrunDownload;
