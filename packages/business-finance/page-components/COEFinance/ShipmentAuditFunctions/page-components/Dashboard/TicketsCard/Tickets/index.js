import { Table } from '@cogoport/components';
import React from 'react';

function Tickets() {
	const data = [{ ticketId: '123', ticketStatus: 'Done' },
		{ ticketId: '456', ticketStatus: 'Done' }, { ticketId: '678', ticketStatus: 'Done' },
		{ ticketId: '987', ticketStatus: 'Done' }, { ticketId: '954678', ticketStatus: 'Done' }];
	const columns = [{
		Header   : 'Id',
		accessor : 'ticketId',
	},
	{
		Header   : 'Status',
		accessor : 'ticketStatus',
	},
	{
		Header   : 'Raised to',
		accessor : 'raisedTo',
	},
	{
		Header   : 'Raised from',
		accessor : 'raisedFrom',
	},
	];
	return (
		<div style={{ width: '1270px' }}>
			<Table columns={columns} data={data} />
		</div>
	);
}

export default Tickets;
