import { Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../commons/EmpyState';
import StyledTable from '../../../../../commons/StyledTable';
import LoadingState from '../../commons/LoadingState';

import styles from './styles.module.css';

function AudianceTable({
	columns = [],
	data = [],
	audianceLoading = true,
	audienceCurrentPage,
	activeAudience,
	setAudienceCurrentPage = () => {},
	setConfigurationPage = () => {},
}) {
	const { list:listTagsData = [], total_count } = data || {};
	const router = useRouter();

	const onClick = () => {
		router.push(
			'/learning/faq/create/configuration?create=audience',
			'/learning/faq/create/configuration?create=audience',
		);
		setConfigurationPage('audience');
	};

	if (audianceLoading) return <LoadingState />;

	const renderTable = () => {
		if (isEmpty(data?.list)) {
			return (
				activeAudience === 'active' ? (
					<EmptyState
						text="There are no audience groups right now. Start by adding an audience group."
						btn_text="Add Audience Aroup"
						onClick={onClick}
					/>
				) : (
					<EmptyState
						text="There are no inactive audience groups right now."
					/>
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
						currentPage={audienceCurrentPage}
						totalItems={total_count}
						pageSize={10}
						onPageChange={setAudienceCurrentPage}
					/>
				</div>
			</div>
		);
	};

	return renderTable();
}

export default AudianceTable;
