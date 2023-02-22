import { Button, Input, Placeholder } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import EmptyState from '../../../common/EmptyState';
import Filters from '../../../common/Filters';
import UserTableData from '../../../common/userTableData';
import useDownloadCsvFeedbacks from '../../../hooks/useDownloadCsvFeedbacks';
import useListUserFeedbacks from '../../../hooks/useListUserFeedbacks';

import styles from './styles.module.css';

function FeedbackManagement() {
	const Router = useRouter();

	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const { getUserListCsv } = useDownloadCsvFeedbacks({});

	const { profile: { user : { id: userId = '' } } } = useSelector((state) => state);

	const {
		feedbackData = {}, loading = false, params,
		setParams, setPage,
	} = useListUserFeedbacks({ userId, searchValue: query });

	const columnsToShow = ['name', 'cogo_id', 'designation', 'manager', 'score', 'month', 'feedback'];
	const tableColumns = useGetColumns({ source: 'hr_feedback', columnsToShow });

	const { list = [], pagination_data = {} } = feedbackData;

	const { total_count } = pagination_data;

	useEffect(() => {
		debounceQuery(searchValue);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	const handleClick = () => {
		Router.push('/feedback-system/hr-dashboard');
	};

	const showLoading = () => (
		<div style={{ margin: '16px' }}>
			{Array(6).fill('').map((index) => (
				<Placeholder
					margin="0px 0px 16px"
					width="100%"
					height="80px"
					keky={index}
				/>
			))}
		</div>
	);

	const downloadCSV = () => {
		getUserListCsv();
	};

	return (
		<div className={styles.container}>
			<div className={styles.redirect_container}>
				<div
					className={styles.go_back_container}
					role="button"
					tabIndex={0}
					onClick={() => {
						handleClick();
					}}
				>
					<IcMArrowBack style={{ marginRight: '8px' }} width={16} height={16} />
					<p>Go Back</p>
				</div>
			</div>

			<div className={styles.heading}>
				<p className={styles.header_text}>
					Feedback List
				</p>
				<Button size="lg" onClick={() => downloadCSV()}>Download CSV</Button>
			</div>

			<div className={styles.top_container}>
				<div className={styles.filters}>

					<div className={styles.department_select}>
						<Filters setParams={setParams} params={params} />

						<Input value={searchValue} onChange={setSearchValue} placeholder="Search User..." />
					</div>
				</div>

			</div>

			{loading && showLoading()}

			{!loading && (
				<div>
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
			)}
		</div>
	);
}

export default FeedbackManagement;
