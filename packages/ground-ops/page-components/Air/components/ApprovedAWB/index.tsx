import React from 'react';

import List from '../../commons/List';
import { ApprovedAWBFields } from '../../configurations/approved_awb';

function ApprovedAWB({ data, loading }) {
	const { fields } = ApprovedAWBFields;
	return (
		<List
			fields={fields}
			data={data}
			loading={loading}
		/>
	);
}

export default ApprovedAWB;
