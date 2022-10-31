import { FluidContainer } from '@cogoport/components';
import { useRouter } from 'next/router';
import React from 'react';

function ListRates() {
	const { push } = useRouter();
	const handleClickFreight = () => {
		push(`${process.env.URL_RATES_FCL_FREIGHT}/rates/fcl-freight/locations`);
	};

	const handleClickCustoms = () => {
		push(`${process.env.URL_RATES_FCL_CUSTOMS}/rates/fcl-customs/locations`);
	};

	return (
		<FluidContainer>
			<p>
				Customs fcl list rate page $
				{process.env.URL_RATES_FCL_CUSTOMS}
			</p>
			<button onClick={handleClickFreight}>go to freight locations</button>
			<button onClick={handleClickCustoms}>go to customs locations</button>
		</FluidContainer>
	);
}

export default ListRates;
