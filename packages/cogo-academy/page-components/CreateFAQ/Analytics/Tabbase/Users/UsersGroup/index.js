import { Pagination } from '@cogoport/components';

import AnalyticsLoader from '../../../../../../commons/AnalyticsLoader';

import AllUsers from './AllUsers';
import useAllAudience from './useAllAudience';

function UsersGroup({ date = '', setDate = () => {} }) {
	const props = useAllAudience({ date, setDate });
	const {
		data,
		loading,
		page = 1,
		setPage = () => {},
		page_limit = 0,
		total_count = 0,
	} = props;

	if (loading) return <AnalyticsLoader />;

	return (
		<div>
			{data?.list.map((items) => (<AllUsers props={items} />))}

			<Pagination
				style={{
					justifyContent : 'flex-end',
					marginTop      : 12,
				}}
				type="table"
				currentPage={page}
				totalItems={total_count}
				pageSize={page_limit}
				onPageChange={setPage}
			/>

		</div>
	);
}

export default UsersGroup;
