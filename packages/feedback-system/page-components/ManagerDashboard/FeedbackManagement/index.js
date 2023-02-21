import { Select, Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import UserTableData from '../../../common/userTableData';
import useListTeamMembers from '../../../hooks/useListTeamMembers';
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
		getUserFeedbackList = () => {},
		setPage,
	} = useListTeamMembers({
		userId,
		searchValue: query,
	});

	const { list: newTeamList = [], pagination_data = {} } = feedbackData;

	const { total_count = '' } = pagination_data;
	const feedbackControls = getFeedBackControls([]);

	const setFilter = (val, type) => {
		setParams({ ...params, filters: { ...(params.filters || {}), [type]: val } });
	};

	const columnsToShow = ['name', 'cogo_id', 'designation', 'month', 'add-kpi'];

	const feedbackManagementColumns = useGetColumns({
		getUserFeedbackList,
		source: 'manager_feedback',
		columnsToShow,
	});

	useEffect(() => {
		debounceQuery(searchValue);
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
					<Select
						value={params.filters?.department}
						onChange={(val) => setFilter(val, 'department')}
						placeholder={feedbackControls.department.placeholder}
						style={{ marginRight: '8px' }}
						options={feedbackControls.department.options}
						isClearable={!params.filters?.designation}
					/>

					<Select
						value={params.filters?.designation}
						onChange={(val) => setFilter(val, 'designation')}
						disabled={!params.filters?.department}
						placeholder={feedbackControls.designation.placeholder}
						style={{ marginRight: '8px' }}
						options={feedbackControls.designation.options}
						isClearable
					/>
					<Select
						value={params.filters?.created_at_year}
						onChange={(val) => setFilter(val, 'created_at_year')}
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
					pagination={params.page}
					setPagination={setPage}
					total_count={total_count}
					page_limit={params.page_limit}
				/>
			</div>

		</div>
	);
}

export default FeedbackManagement;
