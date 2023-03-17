import { Pagination } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useGetEventList from '../../hooks/useGetEventList';

import CreateEvent from './CreateEvent';
import EventList from './EventList';
import Header from './Header';
import styles from './styles.module.css';

function Events() {
	const router = useRouter();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};

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

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	const [toggleEvent, setToggleEvent] = useState('eventList');
	const [eventListData, setEventListData] = useState({});
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
			(toggleEvent === 'eventList') && (
				<>
					<Header
						setToggleEvent={setToggleEvent}
						debounceQuery={debounceQuery}
						loading={loading}
						setSearchValue={setSearchValue}
						searchValue={searchValue}
						expertise={expertise}
						setExpertise={setExpertise}
					/>
					<div>
						<EventList
							list={list}
							setEventListData={setEventListData}
							setToggleEvent={setToggleEvent}
							loading={loading}
						/>
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={getNextPage}
							/>
						</div>
					</div>
				</>

			)
}

			{(toggleEvent === 'createNew') && (
				<CreateEvent
					setToggleEvent={setToggleEvent}
					listRefetch={listRefetch}

				/>
			)}

			{(toggleEvent === 'updateEvent') && (
				<CreateEvent
					setToggleEvent={setToggleEvent}
					updateEventListData={eventListData}
					listRefetch={listRefetch}

				/>
			)}

		</section>
	);
}

export default Events;
