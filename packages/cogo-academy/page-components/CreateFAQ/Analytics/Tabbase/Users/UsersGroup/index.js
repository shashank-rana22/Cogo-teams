import { Pagination } from '@cogoport/components';

import AllUsers from './AllUsers';
import useAllAudience from './useAllAudience';

function UsersGroup({ date = '', setDate = () => {} }) {
	const props = useAllAudience({ date, setDate });
	const { data, page = 1, setPage = () => {} } = props;
	const { page_limit = 0, total = 0, total_count = 0 } = props;

	return (
		<div>
			{data?.list.map((items) => (<AllUsers props={items} />))}
			<Pagination
				style={{ justifyContent: 'flex-end' }}
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
