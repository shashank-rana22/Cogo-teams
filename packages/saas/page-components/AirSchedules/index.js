import { SaasContext } from '@cogoport/context';
import React, { useContext } from 'react';

import useFetchLocations from './hooks/useFetchLocations';

function Schedules() {
	const { schedulesList } = useContext(SaasContext);
	const { list } = useFetchLocations();
	console.log(list, schedulesList);
	return (

		<div>hello</div>
	// <div>
	// 	<MetaTags
	// 		description="Cogoport - Air Schedules"
	// 		keywords="flight timings ,Logistics schedules ,Air shipment schedules"
	// 	/>
	// 	<div>
	// 		{!isMobile && <SearchCard refectSchedules={refectSchedules} />}
	// 		{isMobile && (
	// 			<Flex alignItems="center" marginBottom="16px" marginTop="16px">
	// 				<Text color="white" size="18px">
	// 					Air Schedule Explorer
	// 				</Text>
	// 			</Flex>
	// 		)}
	// 		{loading ? (
	// 			<FlexContainer>
	// 				<SchedulesCardSkeleton key={1} />
	// 				<SchedulesCardSkeleton key={2} />
	// 			</FlexContainer>
	// 		) : schedulesList.length > 0 ? (
	// 			<>
	// 				<FlexContainer>
	// 					{schedulesList.map((schedule, i) => (schedule.status !== 'canceled' ? (
	// 						<ScheduleCard
	// 							schedule={schedule}
	// 							key={schedule.id}
	// 							events={handleDelete}
	// 							id={`${i}_air_sch_card`}
	// 						/>
	// 					) : null))}
	// 				</FlexContainer>
	// 				<Pagination
	// 					pagination={pagination}
	// 					setPagination={setPagination}
	// 					total={airSchedules?.total_count}
	// 					pageLimit={10}
	// 				/>
	// 			</>
	// 		) : (
	// 			<EmptySchedulesCard />
	// 		)}
	// 		{isMobile && (
	// 			<FloatingAddButton
	// 				variant="secondary"
	// 				size="lg"
	// 				onClick={() => handleSchedulesModal()}
	// 				id="air_sch_add_schedule"
	// 			>
	// 				+
	// 			</FloatingAddButton>
	// 		)}
	// 		{isDeleteModalOpen && (
	// 			<DisableAirScheduleModal
	// 				type="delete"
	// 				key="delete"
	// 				isOpen={isDeleteModalOpen}
	// 				handleModal={handleDelete}
	// 				onDeleteCallback={() => {}}
	// 				saasSubscriptionId={deleteId}
	// 				handleRefresh={handleRefresh}
	// 			/>
	// 		)}
	// 	</div>
	// </div>
	);
}

export default (Schedules);
