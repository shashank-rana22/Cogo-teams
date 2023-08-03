import { Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../commons/EmpyState';
import StyledTable from '../../../../../commons/StyledTable';
import LoadingState from '../../commons/LoadingState';

import styles from './styles.module.css';

function TagTable({
	activeTag = '',
	columns = [],
	data = [],
	tagsLoading = true,
	tagCurrentPage,
	setTagCurrentPage = () => {},
	setConfigurationPage = () => {},
	reset,
}) {
	const { list:listTagsData = [], total_count } = data || {};
	const router = useRouter();

	const onClick = () => {
		router.push(
			'/learning/faq/create/configuration?create=tag',
			'/learning/faq/create/configuration?create=tag',
		);
		setConfigurationPage('tag');
		reset();
	};

	const renderTable = () => {
		if (isEmpty(data?.list)) {
			return (
				activeTag === 'active'
					? (
						<EmptyState
							text="There are no tags right now. Start by adding a tag."
							btn_text="Add tag"
							onClick={onClick}
						/>
					) : (
						<EmptyState text="There are no inactive tags right now." />
					)
			);
		}

		return (
			<div>
				<div className={styles.table}>
					<StyledTable columns={columns} data={listTagsData} />
				</div>

				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={tagCurrentPage}
						totalItems={total_count}
						pageSize={10}
						onPageChange={setTagCurrentPage}
					/>
				</div>
			</div>
		);
	};

	if (tagsLoading) return <LoadingState />;

	return renderTable();
}

export default TagTable;
