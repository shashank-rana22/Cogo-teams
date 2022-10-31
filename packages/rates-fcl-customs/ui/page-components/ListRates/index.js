import { FluidContainer } from '@cogoport/components';
import { useRouter } from 'next/router';
import React from 'react';

function ListRates() {
	const { push } = useRouter();
	const handleClick = () => {
		push(`${process.env.URL_RATES_FCL_FREIGHT}/rates/customs/locations`);
	};

	return (
		<FluidContainer>
			<p>
				Customs fcl list rate page $
				{process.env.URL_RATES_FCL_CUSTOMS}
			</p>
			<button onClick={handleClick}>get custom rate button</button>
		</FluidContainer>
	);
}

export default ListRates;
