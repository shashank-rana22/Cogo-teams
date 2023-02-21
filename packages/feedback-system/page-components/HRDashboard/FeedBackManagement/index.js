import { Input, Placeholder } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import EmptyState from '../../../common/EmptyState';
import Filters from '../../../common/Filters';
import UserTableData from '../../../common/userTableData';
import useListUserFeedbacks from '../../../hooks/useListUserFeedbacks';

import styles from './styles.module.css';

function FeedbackManagement() {
	const Router = useRouter();

	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

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
	}, [searchValue]);

	const handleClick = () => {
		Router.push('/feedback-system/hr-dashboard');
	};

	const showLoading = () => (
		<div style={{ margin: '16px' }}>
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 16px" width="100%" height="80px" />
		</div>
	);

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

			<div className={styles.list_header}>
				<div className={styles.heading}>
					<p className={styles.header_text}>
						All Managers List
					</p>
				</div>
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

			{feedbackData?.length === 0 && !loading && <EmptyState />}

			{!loading && (
				<div>
					<UserTableData
						columns={tableColumns}
						list={list}
						loading={loading}
						page_limit={params.page_limit}
						total_count={total_count}
						pagination={params.page}
						setPagination={setPage}
					/>
				</div>
			)}
		</div>
	);
}

export default FeedbackManagement;
