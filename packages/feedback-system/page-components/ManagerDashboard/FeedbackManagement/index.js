import { Select, Input } from '@cogoport/components';
import { SelectController, useDebounceQuery, useForm } from '@cogoport/forms';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import UserTableData from '../../../common/userTableData';
import useListReportees from '../../../hooks/useListReportees';
import getDepartmentControls from '../../../utils/departmentControls';
import getFeedBackControls from '../../../utils/getFeedbackControls';

import styles from './styles.module.css';

function FeedbackManagement() {
	const Router = useRouter();
	const handleClick = () => {
		Router.push('/feedback-system/manager-dashboard');
	};

	const { profile: { user : { id: userId = '' } } } = useSelector((state) => state);

	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		params,
		setParams,
		feedbackData,
		loading = false,
		setPage,
	} = useListReportees({
		userId,
		searchValue: query,
	});

	const { list: newTeamList = [], pagination_data = {} } = feedbackData;

	const { total_count = '' } = pagination_data;
	const feedbackControls = getFeedBackControls([]);

	const setFilter = (val, type) => {
		setParams({ ...params, [type]: val });
	};

	const columnsToShow = ['name', 'cogo_id', 'designation', 'department', 'month', 'add-kpi'];

	const feedbackManagementColumns = useGetColumns({
		source: 'manager_feedback',
		columnsToShow,
	});

	const { Department = '', Designation = '' } = params;

	const departmentDesignationControls = getDepartmentControls({ Department, Designation });

	const { watch, control } = useForm();
	const department = watch('department');
	const designation = watch('designation');

	useEffect(() => {
		setParams({
			...params,
			Department  : department || undefined,
			Designation : designation || undefined,
			Page        : 1,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [department, designation]);

	useEffect(() => {
		debounceQuery(searchValue);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return (
		<div className={`${styles.container}`}>
			<div className={styles.redirect_container}>
				<div
					className={styles.redirect_header}
					role="button"
					tabIndex={0}
					onClick={() => {
						handleClick();
					}}
				>
					<IcMArrowBack style={{ marginRight: '8px' }} width={16} height={16} />

					<p className={styles.redirect_text}>
						Go Back
					</p>
				</div>
			</div>

			<div className={styles.header}>
				<p className={styles.header_text}>
					Feedback Management
				</p>

				<div className={styles.header_filters}>
					{departmentDesignationControls.map((cntrl) => (
						<SelectController
							{...cntrl}
							control={control}
							style={{ marginRight: '8px' }}
							key={cntrl.name}
						/>
					))}
					<Select
						value={params.FeedbackStatus}
						onChange={(val) => setFilter(val, 'FeedbackStatus')}
						placeholder={feedbackControls.status.placeholder}
						style={{ marginRight: '8px' }}
						options={feedbackControls.status.options}
					/>
					<Input
						size="md"
						value={searchValue}
						onChange={setSearchValue}
						placeholder="Search User..."
						prefix={<IcMSearchlight />}
						type="text"
					/>
				</div>
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
