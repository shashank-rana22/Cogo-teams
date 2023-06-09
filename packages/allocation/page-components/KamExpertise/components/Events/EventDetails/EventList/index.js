import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';

import EventListItem from './EventListItem';
import EventLoadingState from './EventLoadingState';
import styles from './styles.module.css';

function EventList(props) {
	const { list, setEventListData, loading } = props;

	if (loading) {
		return (
			<EventLoadingState />
		);
	}

	if (isEmpty(list)) {
		return (
			<div className={styles.empty_state_container}>
				<EmptyState
					height="250px"
					width="400px"
					flexDirection="column"
					emptyText="Events not Found"
					textSize="20px"
				/>
			</div>
		);
	}

	return (
		<div>
			{list.map((data, index) => (
				<EventListItem
					key={data.id}
					data={data}
					index={index}
					setEventListData={setEventListData}
				/>
			))}
		</div>
	);
}
export default EventList;
