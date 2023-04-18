import { startCase } from '@cogoport/utils';
import React from 'react';

import taskDisplayNames from '../../../../../configurations/display-name-mappings';
import incoTermMapping from '../../../../../configurations/inco-term-mapping.json';

function TaskContainer({
	children = null,
	loading = false,
	pendingTask,
	actions,
	shipment_data = {},
}) {
	const trade_type = incoTermMapping[shipment_data?.inco_term] || '';

	const taskName = taskDisplayNames(trade_type)[pendingTask?.task]?.display_name
		|| startCase(pendingTask?.task || '');

	return (
		<div>
			<div>
				<div>{taskName}</div>
				{loading ? null : <div>{actions}</div>}
			</div>
			{/* {loading ? <Text align="center">Loading ...</Text> : children} */}
		</div>
	);
}

export default TaskContainer;
