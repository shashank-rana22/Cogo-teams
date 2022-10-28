import { FluidContainer } from '@cogoport/components';
import { useRouter } from 'next/router';
import React from 'react';

function ListRates() {
	const { push } = useRouter();
	const handleClick = () => {
		push('/[id]', '/2134');
	};
	return (
		<FluidContainer>
			<p>Customs fcl list rate page</p>
			<button onClick={handleClick}>get custom rate button</button>
		</FluidContainer>
	);
}

export default ListRates;
