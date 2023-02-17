import { Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import useGetColumns from '../../../common/Columns';
import Filters from '../../../common/Filters';
import UserTableData from '../../../common/userTableData';
import useListUserFeedbacks from '../../../hooks/useListUserFeedbacks';
import getUserFilterControls from '../../../utils/getUserFilterControls';

import styles from './styles.module.css';

function FeedbackManagement() {
	const Router = useRouter();
	const handleClick = () => {
		Router.push('/feedback-system/manager-dashboard');
	};

	const { profile: { user : { id: userId = '' } } } = useSelector((state) => state);

	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const filterControls = getUserFilterControls();

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

	const feedbackManagementColumns = useGetColumns({
		getUserFeedbackList,
		source: 'manager_feedback',
	});

	const { list: newTeamList = [], total_count = '', page_limit } = feedbackData || {};

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue]);

	return (
		<div className={styles.container}>
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
					<div style={{ marginRight: '16px' }}>
						<Input
							size="md"
							value={searchValue}
							onChange={setSearchValue}
							placeholder="Search Member.."
							prefix={<IcMSearchlight />}
							type="text"
						/>
					</div>
					<div>
						<Filters controls={filterControls} params={params} setParams={setParams} />
					</div>
				</div>
			</div>

			<UserTableData
				columns={feedbackManagementColumns}
				list={newTeamList}
				loading={loading}
				pagination={params.page}
				setPagination={setPage}
				total_count={total_count}
				page_limit={page_limit}
			/>
		</div>
	);
}

export default FeedbackManagement;
