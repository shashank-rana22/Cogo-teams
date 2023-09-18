import { Table } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import { columns } from '../configurations/ocean-tracking-columns';

// import PriceDetail from './ContainerData';

function OceanTracking({

	loading,
	list,

}) {
	const column = columns({
	});

	return (
		<div>

			<Table columns={column} data={list || []} loading={loading} />

		</div>
	);
}

export default OceanTracking;
