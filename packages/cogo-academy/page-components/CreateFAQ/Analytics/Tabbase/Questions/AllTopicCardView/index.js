import { Pagination } from '@cogoport/components';

import AllTopic from './AllTopics';
import useAllTopicCardView from './useAllTopicCardView';

function AllTopicCardView({ date = '', setDate = () => {} }) {
	const props = useAllTopicCardView({ date, setDate });
	const {
		data, page,
		page_limit,
		total_count,
		setPage = () => {},
	} = props;
	return (
		<div>
			{data?.list?.map((items) => (<AllTopic props={items} />))}
			<div style={{ float: 'right' }}>
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
