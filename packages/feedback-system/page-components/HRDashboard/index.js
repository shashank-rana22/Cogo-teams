import { Input, Button } from '@cogoport/components';
import { IcMArrowNext, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import DepartmentSelect from '../../common/DepartmentSelect';
import PerformanceChart from '../../common/PerformanceChart';
import RoleSelect from '../../common/RoleSelect';
import UserTableData from '../../common/userTableData';
import useDownloadCsvFeedbacks from '../../hooks/useDownloadCsvFeedbacks';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';

import useGetColumns from './Columns';
import CreateQuestions from './CreateQuestions';
import Filters from './Filters';
import styles from './styles.module.css';
import TeamStats from './TeamStats';
import ViewQuestionPopover from './ViewPreviousQuestions';

function HRDashboard() {
	const [searchValue, setSearchValue] = useState('');

	const [selectedBucket, setSelectedBucket] = useState('');
	const [params, setParams] = useState({ filters: {}, page: 1 });

	const columns = useGetColumns();
	const { getUserListCsv } = useDownloadCsvFeedbacks({});

	const { feedbackData, pagination, loading, setPagination } = useListUserFeedbacks({
		params,
		searchValue,
	});

	const { list = [], page_limit, total_count } = feedbackData || {};

	const handleChange = (e) => {
		setSearchValue(e?.target?.value);
	};

	const download = () => {
		getUserListCsv();
	};

	const Router = useRouter();
	const handleClick = () => {
		Router.push('/feedback-hr-dashboard/feedback-management');
	};

	return (
		<div className={styles.container}>
			<div className={styles.top_container}>
				<div className={styles.question_button_container}>
					<CreateQuestions />

					<ViewQuestionPopover searchValue={searchValue} />
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
								onChange={(e) => handleChange(e)}
								placeholder="Search by Name/ Email "
								prefix={<IcMSearchlight style={{ marginTop: '6px' }} />}
								type="text"
							/>
						</div>

						<div className={styles.filter_container}>
							<Filters
								params={params}
								setParams={setParams}
							/>
						</div>

						<Button
							className="secondary sm "
							onClick={() => {
								download();
							}}
						>
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
						pagination={pagination}
						setPagination={setPagination}
					/>
				</div>
			</div>
		</div>
	);
}

export default HRDashboard;
