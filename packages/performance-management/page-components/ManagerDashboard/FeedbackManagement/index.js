import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import Filters from '../../../common/Filters';
import UserTableData from '../../../common/UserTableData';
import feedbackDataColumns from '../../../constants/feedback-data-columns';
import useListReportees from '../../../hooks/useListReportees';

import styles from './styles.module.css';

function FeedbackManagement() {
	const router = useRouter();
	const handleClick = () => {
		router.push('/performance-management/manager-dashboard');
	};

	const [refetchReportees, setRefetchReportees] = useState(false);

	const {
		params,
		setParams,
		feedbackData,
		loading = false,
		setPage,
		fetchReportees,
	} = useListReportees({});

	const { list: newTeamList = [], pagination_data = {} } = feedbackData;

	const { total_count = '' } = pagination_data;

	const columnsToShow = feedbackDataColumns.submitFeedback;

	const feedbackManagementColumns = useGetColumns({
		setRefetchReportees,
		source: 'manager_feedback',
		columnsToShow,
	});

	useEffect(() => {
		if (refetchReportees) {
			fetchReportees();
		}
		setRefetchReportees(false);
	}, [fetchReportees, refetchReportees]);

	return (
		<div className={`${styles.container}`}>
			<div className={styles.redirect_container}>
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

				<div>
					Feedback Management
				</div>
			</div>

			<div className={styles.filters}>
				<Filters params={params} setParams={setParams} source="manager_feedback" />
			</div>

			<div style={{ flex: '1' }}>
				<UserTableData
					columns={feedbackManagementColumns}
					list={newTeamList}
					loading={loading}
					pagination={params.Page}
					setPagination={setPage}
					total_count={total_count}
					page_limit={params.PageLimit}
				/>
			</div>

		</div>
	);
}

export default FeedbackManagement;
