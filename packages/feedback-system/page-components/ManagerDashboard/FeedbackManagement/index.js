import { Select, Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import UserTableData from '../../../common/userTableData';
import useListUserFeedbacks from '../../../hooks/useListUserFeedbacks';
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
		loading,
		getUserFeedbackList = () => {},
		setPage,
	} = useListUserFeedbacks({
		userId,
		searchValue: query,
	});

	const { list: newTeamList = [], designations = [], total_count = '' } = feedbackData || {};

	const feedbackControls = getFeedBackControls(designations);

	const setFilter = (val, type) => {
		setParams({ ...params, filters: { ...(params.filters || {}), [type]: val } });
	};

	const feedbackManagementColumns = useGetColumns({
		getUserFeedbackList,
		source: 'manager_feedback',
	});

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue]);

	return (
		<div className={`${styles.container} ${isEmpty([newTeamList]) ? styles.empty_container : ''}`}>
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
						value={params.filters?.designation}
						onChange={(val) => setFilter(val, 'created_at_year')}
						placeholder={feedbackControls.designation.placeholder}
						style={{ marginRight: '8px' }}
						options={feedbackControls.designation.options}
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
