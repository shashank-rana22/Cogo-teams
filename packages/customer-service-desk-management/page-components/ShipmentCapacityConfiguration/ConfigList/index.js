import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../EmptyState';
import ConfigListItem from '../ConfigListItem';

import styles from './styles.module.css';

function ConfigList({ list = [], loading = false, pageData = {}, page = 1, setPage = () => {} }) {
	if (isEmpty(list) && !loading) {
		return <EmptyState />;
	}

	return (
		<>
			{list.map((item) => <ConfigListItem key={item.id} data={item} />)}

			{(pageData?.total_count || 0) > 10 ? (
				<div className={styles.pagination_container}>
					<Pagination
						className="md"
						totalItems={pageData?.total_count || 0}
						currentPage={page || 1}
						pageSize={pageData?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			) : null}

		</>

	);
}

export default ConfigList;
