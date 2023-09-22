import PurchaseInvoicing from '@cogoport/purchase-invoicing/page-components';
import React from 'react';

import OverviewManageServices from '../Overview/OverviewManageServices';

function Purchase(props) {
	return (
		<div>
			<OverviewManageServices {...props} isPurchaseTab />
			<PurchaseInvoicing {...props} />
		</div>
	);
}

export default Purchase;
