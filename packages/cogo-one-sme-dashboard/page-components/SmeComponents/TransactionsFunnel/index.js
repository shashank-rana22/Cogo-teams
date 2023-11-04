import React from 'react';

import CustomerBased from './CustomerBased';
import CustomerInteractionFunnel from './CustomerInteractionFunnel';
import ServiceBased from './ServiceBased';
import ServicesWiseBifurcation from './ServicesWiseBifurcation';

function TransactionsFunnel() {
	return (
		<>
			<CustomerBased />
			<ServiceBased />
			<CustomerInteractionFunnel />
			<ServicesWiseBifurcation />
		</>
	);
}

export default TransactionsFunnel;
