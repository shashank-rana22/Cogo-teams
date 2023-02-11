import { Input, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowNext, IcMDownload, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetColumns from '../../common/Columns';
import DepartmentSelect from '../../common/DepartmentSelect';
import Filters from '../../common/Filters';
import PerformanceChart from '../../common/PerformanceChart';
import RoleSelect from '../../common/RoleSelect';
import TeamStats from '../../common/TeamStats';
import UserTableData from '../../common/userTableData';
import useDownloadCsvFeedbacks from '../../hooks/useDownloadCsvFeedbacks';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import { getControls } from '../../utils/filterControls';

import CreateQuestions from './CreateQuestions';
import styles from './styles.module.css';
import ViewQuestionPopover from './ViewPreviousQuestions';

function HRDashboard() {
	const Router = useRouter();
	const handleClick = () => {
		Router.push('/feedback-system/hr-dashboard/feedback-management');
	};

	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const [selectedBucket, setSelectedBucket] = useState('');

	const columns = useGetColumns({});
	const { getUserListCsv } = useDownloadCsvFeedbacks({});

	const { params, setParams, feedbackData, loading, setPage } = useListUserFeedbacks({ searchValue: query });

	const { list = [], page_limit, total_count } = feedbackData || {};

	const download = () => {
		getUserListCsv();
	};
	const filterControls = getControls();

	useEffect(() => debounceQuery(searchValue), [searchValue]);

	return (
		<div className={styles.container}>
			<div className={styles.top_container}>
				<div className={styles.question_button_container}>
					<CreateQuestions />

					<ViewQuestionPopover />
				</div>

				<div
					className={styles.redirect_container}
					role="button"
					tabIndex={0}
					onClick={() => {
						handleClick();
					}}
				>
					<p>
						Feedback Management
					</p>
					<IcMArrowNext style={{ marginLeft: '8px' }} width={16} height={16} />
				</div>
			</div>

			<div>
				<div className={styles.stats_container}>
					<PerformanceChart />

					<TeamStats
						selectedBucket={selectedBucket}
						setParams={setParams}
						setSelectedBucket={setSelectedBucket}
					/>
				</div>

				<div className={styles.button_container}>
					<p>
						All Users Feedback List
					</p>

					<div className={styles.filters}>
						<div style={{ marginRight: '16px' }}>
							<Input
								size="md"
								value={searchValue}
								onChange={setSearchValue}
								placeholder="Search User..."
								prefix={<IcMSearchlight />}
								type="text"
							/>
						</div>

						<div className={styles.filter_container}>
							<Filters
								controls={filterControls}
								params={params}
								setParams={setParams}
							/>
						</div>

						<Button
							size="lg"
							themeType="secondary"
							onClick={() => {
								download();
							}}
						>
							<IcMDownload style={{ marginRight: '4px' }} />
							Download CSV
						</Button>
					</div>
				</div>

				<div className={styles.department_select}>
					<DepartmentSelect
						value={params.filters?.department}
						setValue={setParams}
						type="select"
					/>
					{params.filters.department && (
						<RoleSelect
							value={params.filters?.work_scope}
							setValue={setParams}
							department={params.filters.department}
							type="select"
						/>
					)}

				</div>

				<div className={styles.table_section}>
					<UserTableData
						columns={columns}
						list={list}
						loading={loading}
						page_limit={page_limit}
						total_count={total_count}
						pagination={params.page}
						setPagination={setPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default HRDashboard;
