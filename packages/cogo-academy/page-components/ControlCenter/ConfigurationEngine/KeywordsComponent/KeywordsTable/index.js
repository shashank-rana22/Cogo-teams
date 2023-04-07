import { Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../commons/EmpyState';
import StyledTable from '../../../../../commons/StyledTable';
import LoadingState from '../../commons/LoadingState';

import styles from './styles.module.css';

function KeywordsTable({
	activeTag = '',
	columns = [],
	data = [],
	tagsLoading = true,
	tagCurrentPage,
	setTagCurrentPage = () => {},
	setConfigurationPage = () => {},
	reset,
}) {
	const { list:listKeywordsData = [], total_count } = data || {};
	const router = useRouter();

	if (tagsLoading) {
		return <LoadingState />;
	}

	const renderTable = () => {
		const onClick = () => {
			router.push(
				'/learning/faq/create/configuration?create=tag',
				'/learning/faq/create/configuration?create=tag',
			);
			setConfigurationPage('tag');
			reset();
		};

		if (isEmpty(data?.list)) {
			return (
				activeTag === 'active'
					? (
						<EmptyState
							text="There are no keywords right now. Start by adding a keyword."
							btn_text="Add tag"
							onClick={onClick}
						/>
					) : (
						<EmptyState text="There are no inactive keywords right now." />
					)
			);
		}

		return (
			<div>
				<div>
					<div className={styles.table}>
						<StyledTable columns={columns} data={listKeywordsData} />
					</div>

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

	return (
		<>
			{renderTable()}
		</>
	);
}

export default KeywordsTable;
