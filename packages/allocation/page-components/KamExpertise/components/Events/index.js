import { Pagination, Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useGetEventList from '../../hooks/useGetEventList';

import CreateNewEvent from './CreateNewEvent';
import EventListItem from './EventList';
import Header from './Header';
import styles from './styles.module.css';

// const DummyList = [
// 	{
// 		id             : 'hgf',
// 		status         : 'jhgf',
// 		expertise_type : 'Customer_Expertise',
// 		condition_name : 'Re-Activation',
// 		description    : 'dfghjk',
// 		trigger        : 'Shipment Creation',
// 		params         : 'Greater than 120 days',
// 		rules          : [{ id: 'ertyui', name: 'Reactivation', rule_type: 'Account' }],
// 	},
// 	{
// 		id             : 'hgf',
// 		status         : 'jhgf',
// 		expertise_type : 'cus',
// 		condition_name : 'sdfghj',
// 		description    : 'dfghjk',
// 		trigger        : 'cfvghjk',
// 		params         : 'dfghjk',
// 		rules          : [{ id: 'ertyui', name: 'dfghj', rule_type: 'account' },
// 			{ id: 'ertyui', name: 'dfghj', rule_type: 'account' },
// 			{ id: 'ertyui', name: 'dfghj', rule_type: 'account' }],
// 	},
// 	{
// 		id             : 'hgf',
// 		status         : 'jhgf',
// 		expertise_type : 'cus',
// 		condition_name : 'sdfghj',
// 		description    : 'dfghjk',
// 		trigger        : 'cfvghjk',
// 		params         : 'dfghjk',
// 		rules          : [{ id: 'ertyui', name: 'dfghj', rule_type: 'account' }],
// 	},
// ];
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
	} = useGetEventList();

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	const [toggleEvent, setToggleEvent] = useState('eventList');
	const [eventListData, setEventListData] = useState({});

	// console.log('toggleEvent::', toggleEvent);

	if (loading) {
		return (
			<>
				<div className={styles.back_container} role="presentation" onClick={onClickBack}>
					<div className={styles.icon_container}>
						<IcMArrowBack width={16} height={16} />
					</div>
					<div className={styles.back_text}>
						Back to Dashboard
					</div>
				</div>

				<Header
					setToggleEvent={setToggleEvent}
					toggleEvent={toggleEvent}
					debounceQuery={debounceQuery}
					setSearchValue={setSearchValue}
					searchValue={searchValue}
					setExpertise={setExpertise}
					expertise={expertise}
				/>

				<section className={styles.list_item_container}>

					<div className={styles.top_div}>

						<Placeholder width="20px" style={{ marginBottom: '4px' }} />

					</div>

					<div>

						<p className={styles.info_tag}>

							<Placeholder width="160px" style={{ marginBottom: '4px' }} />

						</p>

						<div className={styles.info_tag}>

							<Placeholder width="120px" style={{ marginBottom: '12px' }} />

						</div>

						<p className={styles.info_tag}>

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

						</p>

					</div>

					<div className={styles.rule}>

						<p className={styles.rule_head}>

							<Placeholder width="100px" height="20px" style={{ marginBottom: '4px' }} />

						</p>

						<div className={styles.rule_body}>

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

						</div>

					</div>

					<div className={styles.rule_end}>

						<Placeholder width="160px" style={{ marginBottom: '4px' }} />

					</div>

				</section>
				<section className={styles.list_item_container}>

					<div className={styles.top_div}>

						<Placeholder width="20px" style={{ marginBottom: '4px' }} />

					</div>

					<div>

						<p className={styles.info_tag}>

							<Placeholder width="160px" style={{ marginBottom: '4px' }} />

						</p>

						<div className={styles.info_tag}>

							<Placeholder width="120px" style={{ marginBottom: '12px' }} />

						</div>

						<p className={styles.info_tag}>

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

						</p>

					</div>

					<div className={styles.rule}>

						<p className={styles.rule_head}>

							<Placeholder width="100px" height="20px" style={{ marginBottom: '4px' }} />

						</p>

						<div className={styles.rule_body}>

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

						</div>

					</div>

					<div className={styles.rule_end}>

						<Placeholder width="160px" style={{ marginBottom: '4px' }} />

					</div>

				</section>
				<section className={styles.list_item_container}>

					<div className={styles.top_div}>

						<Placeholder width="20px" style={{ marginBottom: '4px' }} />

					</div>

					<div>

						<p className={styles.info_tag}>

							<Placeholder width="160px" style={{ marginBottom: '4px' }} />

						</p>

						<div className={styles.info_tag}>

							<Placeholder width="120px" style={{ marginBottom: '12px' }} />

						</div>

						<p className={styles.info_tag}>

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

						</p>

					</div>

					<div className={styles.rule}>

						<p className={styles.rule_head}>

							<Placeholder width="100px" height="20px" style={{ marginBottom: '4px' }} />

						</p>

						<div className={styles.rule_body}>

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

							<Placeholder width="120px" style={{ marginBottom: '4px' }} />

						</div>

					</div>

					<div className={styles.rule_end}>

						<Placeholder width="160px" style={{ marginBottom: '4px' }} />

					</div>

				</section>
			</>
		);
	}

	return (
		<>
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
						toggleEvent={toggleEvent}
						debounceQuery={debounceQuery}
						setSearchValue={setSearchValue}
						searchValue={searchValue}
					/>
					<div>
						{
						(isEmpty(list) && !loading)
							? (
								<div style={{ padding: '48px 0', backgroundColor: '#fff', marginBottom: '12px' }}>

									<EmptyState height="400px" width="600px" flexDirection="column" />

								</div>
							)

							: list.map((data, index) =>
								// console.log(data);
								// console.log('loading::::::::', loading);
								(
									<EventListItem
										data={data}
										index={index}
										// loading={loading}
										setEventListData={setEventListData}
										setToggleEvent={setToggleEvent}

									/>
								))
						}
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
				<CreateNewEvent
					setToggleEvent={setToggleEvent}
					eventListData={{}}
				/>
			)}

			{(toggleEvent === 'updateEvent') && (
				<CreateNewEvent
					setToggleEvent={setToggleEvent}
					eventListData={eventListData}

				/>
			)}

		</>
	);
}

export default Events;
