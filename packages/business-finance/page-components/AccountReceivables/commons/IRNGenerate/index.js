import React from 'react';

import FinanceRejectContent from './FinanceRejectContent';

function IRNGenerate({ itemData = {}, refetch = () => {} }) {
	return <FinanceRejectContent itemData={itemData} refetch={refetch} />;
}
export default IRNGenerate;
