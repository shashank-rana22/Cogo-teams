import { Input } from '@cogoport/components';
import { useDebounceQuery, useForm } from '@cogoport/forms';
import SelectController from '@cogoport/forms/page-components/Controlled/SelectController';
import { IcMArrowNext, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect, useState } from 'react';

import useGetColumns from '../../common/Columns';
import Filters from '../../common/Filters';
import PerformanceChart from '../../common/PerformanceChart';
import TeamStats from '../../common/TeamStats';
import UserTableData from '../../common/userTableData';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import getUserFilterControls from '../../utils/getUserFilterControls';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';

function ManagerDashboard() {
	const [searchValue, setSearchValue] = useState('');
	const [selectedBucket, setSelectedBucket] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const feedbackColumns = useGetColumns({ source: 'manager_dashboard' });

	const monthControls = getMonthControls();
	const filterControls = getUserFilterControls();

	const { watch: watchDateFilter, control } =	useForm();

	const monthFilter = watchDateFilter('created_at_month');
	const yearFilter = watchDateFilter('created_at_year');

	const { params, setParams, data, loading, setPage } = useListUserFeedbacks({
		searchValue: query,
	});

	const { list: newTeamList, page_limit, total_count } = data || {};

	const Router = useRouter();
	const handleClick = () => {
		Router.push('/feedback-system/manager-dashboard/feedback-management');
	};

	useEffect(() => setParams((pv) => ({
		...pv,
		filters: {
			...(pv.filters || {}),
			created_at_month : monthFilter || undefined,
			created_at_year  : yearFilter || undefined,
		},
	})), [monthFilter, yearFilter]);

	useEffect(() => debounceQuery(searchValue), [searchValue]);

	return (
		<div className={styles.container}>
			<div className={styles.header_section}>
				<p className={styles.header_text}>
					Manager Dashboard
				</p>

				<div
					className={styles.redirect_container}
					role="button"
					tabIndex={0}
					onClick={() => {
						handleClick();
					}}
				>
					<p className={styles.redirect_text}>
						Feedback Management
					</p>

					<IcMArrowNext
						style={{ marginLeft: '8px' }}
						width={16}
						height={16}
					/>
				</div>
			</div>

			<div className={styles.stats_section}>
				<PerformanceChart />

				<TeamStats
					setParams={setParams}
					selectedBucket={selectedBucket}
					setSelectedBucket={setSelectedBucket}
				/>
			</div>

			<div className={styles.list_section}>
				<div className={styles.list_header}>
					<p className={styles.list_header_text}>
						Team Members Feedback List
					</p>

					<div className={styles.list_header_filters}>
						<div style={{ marginRight: '16px' }}>
							<Input
								size="md"
								value={searchValue}
								onChange={setSearchValue}
								placeholder="Search User.."
								prefix={<IcMSearchlight />}
								type="text"
							/>
						</div>
						<div className={styles.month_container}>
							<SelectController {...monthControls.created_at_month} control={control} />
						</div>
						<div className={styles.month_container}>
							<SelectController {...monthControls.created_at_year} control={control} />
						</div>
						<div><Filters controls={filterControls} params={params} setParams={setParams} /></div>
					</div>
				</div>

				<UserTableData
					columns={feedbackColumns}
					list={newTeamList}
					loading={loading}
					page_limit={page_limit}
					total_count={total_count}
					pagination={params.page}
					setPagination={setPage}
				/>
			</div>
		</div>
	);
}

export default ManagerDashboard;
