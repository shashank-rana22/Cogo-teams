import React from 'react';

import pendingColumns from '../../configs/pending-table';
import StyledTable from '../Table';

function StatusComponent({ heading }: { heading: string }) {
	const data = [
		{
			firstName : 'tanner',
			lastName  : 'linsley',
			age       : 24,
			visits    : 100,
			status    : 'In Relationship',
			progress  : 50,
			gender    : 'male',
		},
		{
			firstName : 'tandy',
			lastName  : 'miller',
			age       : 40,
			visits    : 40,
			status    : 'Single',
			progress  : 80,
			gender    : 'male',
		},
		{
			firstName : 'joe',
			lastName  : 'dirte',
			age       : 45,
			visits    : 20,
			status    : 'Complicated',
			progress  : 10,
			gender    : 'male',
		},
	];
	return (
		<>
			<div>{heading}</div>
			<StyledTable data={data} columns={pendingColumns} />
		</>
	);
}

export default StatusComponent;
