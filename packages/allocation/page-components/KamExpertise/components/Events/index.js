import { Pagination } from '@cogoport/components';
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
	} = useGetEventList();

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	const [toggleNewEvent, setToggleNewEvent] = useState(true);
	const [eventListData, setEventListData] = useState({});

	// console.log('list:::', list);
	// console.log('paginationData', paginationData);
	// if (loading) {
	// 	return (
	// 		<div>loading...</div>
	// 	);
	// }
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
			<Header setToggleNewEvent={setToggleNewEvent} toggleNewEvent={toggleNewEvent} />

			{toggleNewEvent
				?		(
					<div>
						{
						(isEmpty(list) && !loading) ? <EmptyState />

							: list.map((data, index) => {
								console.log(data);
								return (
									<EventListItem
										data={data}
										index={index}
										loading={loading}
										setEventListData={setEventListData}
										setToggleNewEvent={setToggleNewEvent}

									/>
								);
							})
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
				)
				:	(
					<CreateNewEvent
						setToggleNewEvent={setToggleNewEvent}
						eventListData={eventListData}
					/>
				)}

			{/* <EventListItem /> */}
		</>
	);
}

export default Events;
