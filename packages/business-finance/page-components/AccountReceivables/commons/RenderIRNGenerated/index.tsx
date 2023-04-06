import { getByKey } from '@cogoport/utils';
import React from 'react';

import IRNCancel from '../IRNCancel';
import IRNGenerate from '../IRNGenerate';

function RenderIRNGenerated({ itemData, refetch }) {
	const isEligibleCheck = ['FINANCE_ACCEPTED', 'IRN_FAILED'];
	const isCancellableCheck = ['IRN_GENERATED', 'POSTED', 'FAILED'];
	const render = () => {
		if (isEligibleCheck.includes((getByKey(itemData, 'invoiceStatus') as string))) {
			return <IRNGenerate itemData={itemData} refetch={refetch} />;
		}
		if (isCancellableCheck.includes((getByKey(itemData, 'invoiceStatus') as string))) {
			return <IRNCancel itemData={itemData} />;
		}
		return null;
	};
	return (
		render()
	);
}

export default RenderIRNGenerated;
