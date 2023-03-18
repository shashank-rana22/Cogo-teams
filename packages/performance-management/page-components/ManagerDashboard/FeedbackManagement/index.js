import { Select, Input } from '@cogoport/components';
import { SelectController, useDebounceQuery, useForm } from '@cogoport/forms';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import UserTableData from '../../../common/UserTableData';
import feedbackDataColumns from '../../../constants/feedback-data-columns';
import getDepartmentControls from '../../../hooks/useGetDepartmentControls';
import useListReportees from '../../../hooks/useListReportees';
import feedbackControls from '../../../utils/feedback-controls';

import styles from './styles.module.css';

function FeedbackManagement() {
	const router = useRouter();
	const handleClick = () => {
		router.push('/performance-management/manager-dashboard');
	};

	const [searchValue, setSearchValue] = useState('');
	const [refetchReportees, setRefetchReportees] = useState(false);

	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		params,
		setParams,
		feedbackData,
		loading = false,
		setPage,
		fetchReportees,
	} = useListReportees({
		searchValue: query,
	});

	const { list: newTeamList = [], pagination_data = {} } = feedbackData;

	const { total_count = '' } = pagination_data;

	const setFilter = (val, type) => {
		setParams({ ...params, [type]: val, Page: 1 });
	};

	const columnsToShow = feedbackDataColumns.submitFeedback;

	const feedbackManagementColumns = useGetColumns({
		setRefetchReportees,
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

	useEffect(() => {
		if (refetchReportees) {
			fetchReportees();
		}
		setRefetchReportees(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refetchReportees]);

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

			<div className={styles.header}>
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
						placeholder={feedbackControls.placeholder}
						style={{ marginRight: '8px' }}
						options={feedbackControls.options}
						isClearable
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
