import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../../../common/EmptyState';

import EventListItem from './EventListItem';
import EventLoadingState from './EventLoadingState';
import styles from './styles.module.css';

function EventList(props) {
	const { t } = useTranslation(['allocation']);

	const { list, setEventListData, loading, listRefetch } = props;

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
					emptyText={t('allocation:events_not_found_label')}
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
					listRefetch={listRefetch}
				/>
			))}
		</div>
	);
}
export default EventList;
