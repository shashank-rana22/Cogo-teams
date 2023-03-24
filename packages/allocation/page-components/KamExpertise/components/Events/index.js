import { IcMArrowBack } from '@cogoport/icons-react';

import useGetEventList from '../../hooks/useGetEventList';

import CreateEvent from './CreateEvent';
import EventDetails from './EventDetails';
import styles from './styles.module.css';

const CONSTANT_KEYS = {
	EVENT_LIST : 'eventList',
	POST_EVENT : 'updateEvent',
};

const { EVENT_LIST, POST_EVENT } = CONSTANT_KEYS;

const EVENTS_COMPONENTS_MAPPING = {
	[EVENT_LIST] : EventDetails,
	[POST_EVENT] : CreateEvent,
};

function Events() {
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
		onClickBack,
		eventListData,
		setEventListData,
	} = useGetEventList();

	const componentProps = {
		[EVENT_LIST]: {
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
			eventListData,
			listRefetch,
			setEventListData,
		},
	};

	const Component = EVENTS_COMPONENTS_MAPPING[eventListData?.toggleEvent] || null;

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

			{Component && (
				<Component
					key={eventListData?.toggleEvent}
					{...(componentProps[eventListData?.toggleEvent] || {})}
				/>
			)}

		</section>
	);
}

export default Events;
