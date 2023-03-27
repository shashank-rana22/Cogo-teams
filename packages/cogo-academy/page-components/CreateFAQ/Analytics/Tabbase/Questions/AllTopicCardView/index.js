import { Pagination } from '@cogoport/components';

import AnalyticsLoader from '../../../../../../commons/AnalyticsLoader';

import AllTopic from './AllTopics';
import useAllTopicCardView from './useAllTopicCardView';

function AllTopicCardView({ date = '', setDate = () => {} }) {
	const props = useAllTopicCardView({ date, setDate });
	const {
		data, page,
		page_limit,
		total_count,
		setPage = () => {},
		loading,
	} = props;

	if (loading) return <AnalyticsLoader />;

	return (
		<div>
			{(data?.list || []).map((items) => (<AllTopic key={items.id} {...items} />))}
			<div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px' }}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>

			</div>
		</div>
	);
}

export default AllTopicCardView;
