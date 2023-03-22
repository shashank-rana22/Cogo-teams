import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';

import EventListItem from './EventListItem';
import EventLoadingState from './EventLoadingState';

function EventList(props) {
	const { list, setEventListData, loading } = props;

	if (loading) {
		return (
			<EventLoadingState />
		);
	}

	if (isEmpty(list)) {
		return (
			<div
				style={{
					padding    : '48px 0',
					background : '#fff',
					margin     : '0 0 60px 0',
				}}
			>
				<EmptyState height="400px" width="600px" flexDirection="column" />
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
