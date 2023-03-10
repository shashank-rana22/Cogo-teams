import { Button, Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import Filters from '../../../common/Filters';
import UserTableData from '../../../common/UserTableData';
import feedbackDataColumns from '../../../constants/feedback-data-columns';
import useDownloadCsvFeedbacks from '../../../hooks/useDownloadCsvFeedbacks';
import useListUserFeedbacks from '../../../hooks/useListUserFeedbacks';

import styles from './styles.module.css';

function FeedbackManagement() {
	const router = useRouter();

	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		feedbackData = {}, loading = false, params,
		setParams, setPage,
	} = useListUserFeedbacks({ searchValue: query });

	const { getUserListCsv } = useDownloadCsvFeedbacks({ params });

	const columnsToShow = feedbackDataColumns.allFeedbacks;
	const tableColumns = useGetColumns({ source: 'hr_feedback', columnsToShow });

	const { list = [], pagination_data = {} } = feedbackData;

	const { total_count } = pagination_data;

	useEffect(() => {
		debounceQuery(searchValue);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	const handleClick = () => {
		router.push('/performance-management/hr-dashboard');
	};

	return (
		<div className={styles.container}>
			<div className={styles.redirect_container}>
				<div className={styles.go_back_container}>
					<div
						style={{ cursor: 'pointer' }}
						role="button"
						tabIndex={0}
						onClick={() => {
							handleClick();
						}}
					>
						<IcMArrowBack style={{ marginRight: '8px' }} width={16} height={16} />
					</div>
					<p>Feedback List</p>
				</div>
			</div>

			<div className={styles.top_container}>
				<div className={styles.filters}>
					<div className={styles.department_select}>
						<Filters setParams={setParams} params={params} source="hr_feedback" />

						<Input
							value={searchValue}
							onChange={setSearchValue}
							placeholder="Search User..."
						/>
					</div>
				</div>

				<Button size="lg" onClick={() => getUserListCsv()}>Download CSV</Button>
			</div>

			<UserTableData
				columns={tableColumns}
				list={list}
				loading={loading}
				page_limit={params.PageLimit}
				total_count={total_count}
				pagination={params.Page}
				setPagination={setPage}
			/>
		</div>
	);
}

export default FeedbackManagement;
