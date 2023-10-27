import { cl, Input } from '@cogoport/components';
import { IcMTick, IcMAppDelete, IcMEdit, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import useListCogooneCalendars from '../../../../../../hooks/useListCogooneCalendars';
import ActionModal from '../ActionModal';
import EmptyList from '../EmptyList';
import LoadingState from '../LoadingState';

import ListCard from './ListCard';
import styles from './styles.module.css';

const ZERO_COUNT = 0;

function UserEvents({
	selectedEventData = {}, getEvents = () => {},
	month = '', actionModal = {}, setActionModal = () => {},
	setAddEvents = () => {}, handleClose = () => {},
	setActiveTab = () => {},
	activeTab = '',
	schedulesLoading = false,
}) {
	const [searchValue, setSearchValue] = useState('');

	const {
		calendersLoading = false,
		calendersData = {},
		getListCalenders = () => {},
	} = useListCogooneCalendars({ searchValue, month });

	const { list: calendarList = [], total_count = 0 } = calendersData || {};

	const { eventsList: markedEvents = [] } = selectedEventData || {};

	const eventsCount = markedEvents?.length || ZERO_COUNT;

	const TABS = [
		{
			title : 'schedules',
			count : eventsCount,
		},
		{
			title : 'calendars',
			count : total_count,
		},
	];

	const handleSelect = ({ singleEvent = {}, key = '' }) => {
		setActionModal((prevEventDetails) => ({
			...prevEventDetails,
			status       : key !== 'edit',
			value        : singleEvent,
			actionStatus : key,
		}));
	};

	const handleEdit = ({ singleEvent = {}, key = '' }) => {
		setActionModal((prevEventDetails) => ({
			...prevEventDetails,
			status       : key === 'edit',
			value        : singleEvent,
			actionStatus : key,
		}));
	};

	const actions = ({ category = '' }) => [
		{
			key    : 'completed',
			icon   : <IcMTick width={20} height={20} fill="#27ae60" />,
			action : ({ singleEvent = {}, key = '' }) => { handleSelect({ singleEvent, key }); },
			show   : activeTab === 'schedules' && category === 'reminder',
		},
		{
			key    : 'edit',
			icon   : <IcMEdit width={14} height={14} fill="#34495e" />,
			action : ({ singleEvent = {}, key = '' }) => {
				if (activeTab === 'calendars') {
					handleSelect({ singleEvent, key });
					setAddEvents((p) => !p);
				} else {
					handleEdit({ singleEvent, key });
				}
			},
			show: true,
		},
		{
			key    : 'inactive',
			icon   : <IcMAppDelete width={16} height={16} fill="#e74c3c" />,
			action : ({ singleEvent = {}, key = '' }) => { handleSelect({ singleEvent, key }); },
			show   : true,
		},
	];

	const finalList = activeTab === 'schedules' ? markedEvents : calendarList;

	return (
		<>
			<div className={styles.tabs}>
				{(TABS || []).map((itm) => (
					<div
						key={itm?.title}
						className={cl`${styles.tab} ${activeTab === itm?.title ? styles.active_tab : ''}`}
						onClick={() => setActiveTab(itm?.title)}
						role="presentation"
					>
						<div className={styles.tab_content}>
							{startCase(itm?.title)}
							{' '}

							{itm.count > ZERO_COUNT
								? (
									<span className={styles.count}>
										{itm?.count}
									</span>
								) : ''}
						</div>

					</div>
				))}
			</div>

			{activeTab === 'calendars' ? (
				<Input
					size="sm"
					prefix={<IcMSearchlight width={18} height={18} />}
					placeholder="Search here..."
					value={searchValue}
					onChange={(val) => setSearchValue(val)}
				/>
			) : null}
			<div className={cl`${styles.container} ${activeTab === 'calendars' ? styles.is_calendar : ''}`}>

				{(calendersLoading || schedulesLoading) ? <LoadingState /> : null}

				{!calendersLoading && isEmpty(finalList) ? (
					<div className={styles.empty_container}>
						<EmptyList />
					</div>
				) : null}

				{!calendersLoading && !isEmpty(finalList) ? (
					<ListCard
						finalList={finalList}
						activeTab={activeTab}
						actions={actions}
					/>
				) : null}
			</div>

			<ActionModal
				actionModal={actionModal}
				getEvents={getEvents}
				month={month}
				handleClose={handleClose}
				activeTab={activeTab}
				handleCallApi={getListCalenders}
			/>
		</>
	);
}

export default UserEvents;
