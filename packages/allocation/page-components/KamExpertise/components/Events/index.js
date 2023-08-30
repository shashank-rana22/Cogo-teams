import { Breadcrumb } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['allocation']);

	const {
		list = [],
		loading = false,
		paginationData = {},
		getNextPage = () => {},
		debounceQuery,
		setSearchValue = () => {},
		searchValue = '',
		expertise = '',
		setExpertise = () => {},
		listRefetch = () => {},
		eventListData = {},
		setEventListData = () => {},
		locale = '',
		partner_id = '',
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
			listRefetch,
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
			<Breadcrumb className={styles.breadcrumb}>
				<Breadcrumb.Item
					label={(
						<a href={`/v2/${locale}/${partner_id}/allocation/kam-expertise/`}>
							{t('allocation:dashboard_label')}
						</a>
					)}
				/>

				{ (eventListData.toggleEvent === EVENT_LIST) && (
					<Breadcrumb.Item label={(
						<b>
							{t('allocation:all_events_label')}
						</b>
					)}
					/>
				) }

				{ (eventListData.toggleEvent === POST_EVENT)
					&& (
						<Breadcrumb.Item
							label={(
								<a href={`/v2/${locale}/${partner_id}/allocation/kam-expertise/events`}>
									{t('allocation:all_events_label')}
								</a>
							)}
						/>
					)}

				{ (eventListData.toggleEvent === POST_EVENT) && (
					<Breadcrumb.Item label={(
						<b>
							{t('allocation:add_event_label')}
						</b>
					)}
					/>
				)}
			</Breadcrumb>

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
