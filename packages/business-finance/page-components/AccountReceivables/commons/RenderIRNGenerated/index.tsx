import { getByKey } from '@cogoport/utils';
import React from 'react';

import IRNCancel from '../IRNCancel';
import IRNGenerate from '../IRNGenerate';

const IS_ELIGIBLE_CHECK = ['FINANCE_ACCEPTED', 'POSTED', 'IRN_FAILED'];
const IS_CANCELLABLE_CHECK = ['IRN_GENERATED', 'POSTED', 'FAILED'];

function RenderIRNGenerated({ itemData, refetch }) {
	const render = () => {
		if (IS_ELIGIBLE_CHECK.includes((getByKey(itemData, 'invoiceStatus') as string))) {
			return <IRNGenerate itemData={itemData} refetch={refetch} />;
		}
		if (IS_CANCELLABLE_CHECK.includes((getByKey(itemData, 'invoiceStatus') as string))) {
			return <IRNCancel itemData={itemData} />;
		}
		return null;
	};
	return (
		render()
	);
}

export default RenderIRNGenerated;
