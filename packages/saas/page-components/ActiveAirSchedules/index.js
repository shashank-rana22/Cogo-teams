/* eslint-disable no-nested-ternary */
// import { Flex, Text, Popover, Button, Modal, DateRangePicker } from '@cogoport/components';
// import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useFetchScheduleDetails from './hooks/useFetchScheduleDetails';

function ActiveAirSchedules() {
	const {
		schedule_id,

	} = useSelector(({ general }) => ({
		schedule_id: general.query.schedule_id,
	}));
	console.log(schedule_id, 'hey');
	const {
		loading,
	} = useFetchScheduleDetails({ pageLimit: 5, id: schedule_id });
	console.log(loading);
	return (
		<div>
			<p>hello</p>
		</div>
	);
}

export default ActiveAirSchedules;
