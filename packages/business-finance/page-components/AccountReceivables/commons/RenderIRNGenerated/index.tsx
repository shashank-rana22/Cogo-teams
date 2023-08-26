import React from 'react';

import IRNCancel from '../IRNCancel';
import IRNGenerate from '../IRNGenerate';

const IS_ELIGIBLE_CHECK = ['FINANCE_ACCEPTED', 'POSTED', 'IRN_FAILED'];
const IS_CANCELLABLE_CHECK = ['IRN_GENERATED', 'POSTED', 'FAILED', 'IRN_CANCELLED'];

function RenderIRNGenerated({ itemData = { invoiceStatus: '' }, refetch = () => {} }) {
	return (
		<>
			{IS_ELIGIBLE_CHECK.includes(itemData?.invoiceStatus)
				? <IRNGenerate itemData={itemData} refetch={refetch} /> : null}
			{IS_CANCELLABLE_CHECK.includes(itemData?.invoiceStatus)
				? <IRNCancel itemData={itemData} refetch={refetch} /> : null}
		</>
	);
}

export default RenderIRNGenerated;
