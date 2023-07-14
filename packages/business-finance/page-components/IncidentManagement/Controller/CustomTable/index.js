import React from 'react';

import ColumnCard from './ColumnCard';
import { CONTROLLER_CONFIG } from './Config/controller-config';
import Header from './Header';

// const DEFAULT_LOADER = [1, 2, 3, 4, 5, 6, 7];

function CustomTable({ list = [], refetch = () => { } }) {
	return (
		<div>
			<Header config={CONTROLLER_CONFIG} />
			{(list || []).map((item) => (
				<ColumnCard
					key={item?.id}
					config={CONTROLLER_CONFIG}
					item={item}
					refetch={refetch}
				/>
			))}
		</div>
	);
}

export default CustomTable;
