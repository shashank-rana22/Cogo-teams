import { Input, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetColumns from '../../../../common/Columns';
import UserTableData from '../../../../common/UserTableData';
import feedbackDataColumns from '../../../../constants/feedback-data-columns';
import useDownloadCsvFeedbacks from '../../../../hooks/useDownloadCsvFeedbacks';

import styles from './styles.module.css';
import useManagerListItem from './useManagerListItem';

function ListItem({ item, params: pageParams = {} }) {
	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		data: { list = [], pagination_data = {} } = {},
		loading, params, setPage,
	} = useManagerListItem({ item, searchValue: query, pageParams });

	const { total_count = '' } = pagination_data;

	const { getUserListCsv = () => {}, loading: downloadLoading = false } = useDownloadCsvFeedbacks({ params });

	const columnsToShow = feedbackDataColumns.feedbacksByManager;

	const managerListItemColumns = useGetColumns({ source: 'hr_dashboard', columnsToShow });

	useEffect(() => debounceQuery(searchValue), [debounceQuery, searchValue]);
	return (
		<div className={styles.overall_baselist}>
			<div className={styles.list_header}>
				Feedbacks
			</div>

			<section className={styles.inner_list}>
				<Input
					size="sm"
					prefix={<IcMSearchlight />}
					placeholder="Search By Name, Email, Mob Number"
					className={styles.search}
					value={searchValue}
					onChange={setSearchValue}
				/>

				<Button
					size="md"
					themeType="tertiary"
					onClick={() => getUserListCsv()}
					disabled={isEmpty(list)}
					loading={downloadLoading}
				>
					Download CSV
				</Button>
			</section>

			<UserTableData
				list={list}
				columns={managerListItemColumns}
				loading={loading}
				total_count={total_count}
				page_limit={params.PageLimit}
				pagination={params.Page}
				setPagination={setPage}
			/>
		</div>
	);
}

export default ListItem;
