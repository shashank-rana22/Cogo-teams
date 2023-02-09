import { Button, Input } from '@cogoport/components';
import {
	IcMArrowRotateDown,
	IcMArrowRotateUp,
	IcMDownload,
	IcMNotifications,
	IcMSearchlight,
} from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetColumns from '../../../../common/Columns';
import UserTableData from '../../../../common/userTableData';
import useDownloadCsvFeedbacks from '../../../../hooks/useDownloadCsvFeedbacks';
import useListUserFeedbacks from '../../../../hooks/useListUserFeedbacks';

import Calculation from './Calculation';
import styles from './styles.module.css';

function ManagersListCard({
	item = {},
	showUserId = '',
	setShowUserId = () => {},
}) {
	const [show, setShow] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const columns = useGetColumns();

	const {
		name = '',
		manager_id = '',
		email = '',
		feedback_given = '',
		feedbacks_pending = '',
	} = item || {};

	const {
		feedbackData,
		pagination,
		loading,
		setPagination,
		getUserFeedbackList,
	} = useListUserFeedbacks({
		userId : manager_id,
		key    : 'users_under_manager',
		searchValue,
	});

	const { getUserListCsv } = useDownloadCsvFeedbacks({
		userId : manager_id,
		key    : 'users_under_manager',
	});

	const { page_limit, total_count, list } = feedbackData || {};

	const handleClick = () => {
		setShowUserId(manager_id);
		setShow(!show);

		if (!show) return getUserFeedbackList();

		return null;
	};

	const handleChange = (e) => {
		setSearchValue(e?.target?.value);
	};

	const download = async () => {
		await getUserListCsv();
	};

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<div className={styles.name}>
					<div className={styles.column_content}>
						<div className={styles.column_name}>Name</div>

						<div className={styles.content}>
							{startCase(name)}
						</div>
					</div>
				</div>

				<div className={styles.email}>
					<div className={styles.column_content}>
						<div className={styles.column_name}>E-Mail</div>

						<div className={styles.content}>
							{email}
						</div>
					</div>
				</div>

				<div className={styles.feedback_given}>
					<div className={styles.column_content}>
						<div className={styles.column_name}>Feedbacks Given</div>

						<div className={styles.content}>
							{feedback_given}
						</div>
					</div>
				</div>

				<div className={styles.feedback_pending}>
					<div className={styles.column_content}>
						<div className={styles.column_name}>Feedbacks Pending</div>

						<div className={styles.content}>
							{feedbacks_pending}
						</div>
					</div>
				</div>

				<div className={styles.show_more}>
					<div
						className={styles.show_more_container}
						role="button"
						tabIndex={0}
						onClick={() => {
							handleClick();
						}}
					>
						<div className={`${show && showUserId === manager_id ? styles.opened : null}`}>
							<IcMArrowRotateUp />
						</div>

					</div>
				</div>
			</div>

			{show && showUserId === manager_id && (
				<div className={styles.table_user_content}>
					<div className={styles.table_user}>
						<div>
							<div className={styles.heading}>All Users List</div>
						</div>
						<div className={styles.search_container}>
							<div style={{ marginRight: '16px' }}>
								<Input
									size="sm"
									value={searchValue}
									onChange={(e) => handleChange(e)}
									placeholder="Search Users.."
									prefix={<IcMSearchlight />}
									type="text"
								/>
							</div>

							{/* <Calculation
								manager_id={manager_id}
								getUserFeedbackList={getUserFeedbackList}
							/> */}

							<Button
								themeType="secondary"
								onClick={() => {
									download();
								}}
								style={{
									marginLeft: '16px ',
								}}
							>
								<IcMDownload style={{ marginRight: '4px' }} />
								Download CSV
							</Button>
						</div>
					</div>

					<div className={styles.table_container}>
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
			)}
		</div>
	);
}

export default ManagersListCard;
