import { Pagination } from '@cogoport/components';

import useListContracts from '../../hooks/useListContracts';

import Header from './Header';
import List from './List';
import Loader from './Loader';
import styles from './styles.module.css';

function PageView() {
	const {
		data, loading, filters, setFilters,
	} = useListContracts();

	let content = [...Array(10)].map(() => <Loader />);

	if (data?.list && !loading) {
		content = (
			<>
				<List data={data} filters={filters} />
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={data?.page}
						totalItems={data?.total_count}
						pageSize={10}
						handlePageChange={(val) => {
							setFilters({ ...filters, page: val });
						}}
					/>
				</div>
			</>
		);
	}

	return (
		<div className={styles.container}>
			<Header filters={filters} setFilters={setFilters} />
			{content}
		</div>
	);
}

export default PageView;
