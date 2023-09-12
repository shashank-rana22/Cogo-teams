// /* eslint-disable no-nested-ternary */
// // import { Flex, Text, Popover, Button, Modal, DateRangePicker } from '@cogoport/components';
// // import { useRouter } from '@cogoport/next';
// import { useSelector } from '@cogoport/store';
// import React from 'react';

// import useFetchScheduleDetails from './hooks/useFetchScheduleDetails';

// function ActiveAirSchedules() {
// 	const {
// 		schedule_id,

// 	} = useSelector(({ general }) => ({
// 		schedule_id: general.query.schedule_id,
// 	}));
// 	const {
// 		loading,
// 		data,
// 	} = useFetchScheduleDetails({ pageLimit: 5, id: schedule_id });

// 	return (
// 		<div>
// 			<div>
// 				<div>
// 					<p className="origin">
// 						{data?.origin_airport?.name || 'Origin'}
// 					</p>

// 					<p className="origin">
// 						{data?.destination_airport?.name || 'Destination'}
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default ActiveAirSchedules;
