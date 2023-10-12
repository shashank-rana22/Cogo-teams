import React from 'react';

import FinanceRejectContent from './FinanceRejectContent';

type Itemdata = {
	id?: string;
	invoiceStatus?: string;
	entityCode?: string;
	daysLeftForAutoIrnGeneration?: string;
	isFinalPosted?: boolean;
	invoiceType?: string;
};
interface IRNGeneration {
	itemData?: Itemdata;
	refetch?: Function;
}

function IRNGenerate({ itemData = {}, refetch = () => {} }: IRNGeneration) {
	return <FinanceRejectContent itemData={itemData} refetch={refetch} />;
}
export default IRNGenerate;
