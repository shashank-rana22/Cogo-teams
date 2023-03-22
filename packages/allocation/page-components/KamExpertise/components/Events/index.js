import { Pagination } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetEventList from '../../hooks/useGetEventList';

import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';
import styles from './styles.module.css';

const CONSTANT_KEYS = {
	EVENT_LIST : 'eventList',
	// CREATE_EVENT : 'createNew',
	POST_EVENT : 'updateEvent',
};

const { EVENT_LIST, POST_EVENT } = CONSTANT_KEYS;

const EVENTS_COMPONENTS_MAPPING = {
	[EVENT_LIST] : EventDetails,
	// [CREATE_EVENT] : CreateMastery,
	[POST_EVENT] : CreateEvent,
};

function Events() {
	const router = useRouter();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};

	const [toggleEvent, setToggleEvent] = useState('eventList');
	const [eventListData, setEventListData] = useState({});

	const {
		list = [],
		loading,
		paginationData,
		getNextPage,
		debounceQuery,
		setSearchValue,
		searchValue,
		expertise,
		setExpertise,
		listRefetch,
	} = useGetEventList();

	const componentProps = {
		[EVENT_LIST]: {
			setToggleEvent,
			setEventListData,
			debounceQuery,
			loading,
			setSearchValue,
			searchValue,
			expertise,
			setExpertise,
			list,
			paginationData,
			getNextPage,
		},
		[POST_EVENT]: {
			setToggleEvent,
			eventListData,
			listRefetch,
		},
	};

	const Component = EVENTS_COMPONENTS_MAPPING[toggleEvent] || null;

	return (
		<section className={styles.main}>
			<div className={styles.back_container} role="presentation" onClick={onClickBack}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>
				<div className={styles.back_text}>
					Back to Dashboard
				</div>
			</div>

			{

			// (toggleEvent === 'eventList') && (
			// 	<>
			// 		{/* <Header
			// 			setToggleEvent={setToggleEvent}
			// 			setEventListData={setEventListData}
			// 			debounceQuery={debounceQuery}
			// 			loading={loading}
			// 			setSearchValue={setSearchValue}
			// 			searchValue={searchValue}
			// 			expertise={expertise}
			// 			setExpertise={setExpertise}
			// 		/>

			// 		<div>
			// 			<EventList
			// 				list={list}
			// 				setEventListData={setEventListData}
			// 				setToggleEvent={setToggleEvent}
			// 				loading={loading}
			// 			/>

			// 			<div className={styles.pagination_container}>
			// 				<Pagination
			// 					type="table"
			// 					currentPage={page}
			// 					totalItems={total_count}
			// 					pageSize={page_limit}
			// 					onPageChange={getNextPage}
			// 				/>
			// 			</div>
			// 		</div> */}
			// 	</>

			// )
}

			{/* {(toggleEvent === 'createNew') && (
				<CreateEvent
					setToggleEvent={setToggleEvent}
					listRefetch={listRefetch}

				/>
			)} */}

			{/* {((toggleEvent === 'updateEvent')) && (
				<CreateEvent
					setToggleEvent={setToggleEvent}
					updateEventListData={eventListData}
					listRefetch={listRefetch}

				/>
			)} */}

			{Component && (
				<Component
					key={toggleEvent}
					{...(componentProps[toggleEvent] || {})}
				/>
			)}

		</section>
	);
}

export default Events;
