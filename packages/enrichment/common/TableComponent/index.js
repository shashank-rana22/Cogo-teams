import LoadingState from '../LoadingState';

import RenderTable from './RenderTable';
import styles from './styles.module.css';

function TableComponent(props) {
	const {
		columns = [],
		list = [],
		loading = false,
		paginationData = {},
		getNextPage = () => {},
	} = props;

	if (loading) {
		return (
			<div className={styles.table_container}>
				<LoadingState />
			</div>
		);
	}

	return (
		<RenderTable
			columns={columns}
			list={list}
			getNextPage={getNextPage}
			paginationData={paginationData}
			loading={loading}
		/>
	);
}

export default TableComponent;
