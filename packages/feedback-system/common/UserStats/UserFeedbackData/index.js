import { SelectController, useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import useListUserFeedbacks from '../../../hooks/useListUserFeedbacks';
import getMonthControls from '../../../utils/monthControls';
import useGetColumns from '../../Columns';
import UserTableData from '../../userTableData';

import styles from './styles.module.css';

function UserFeedbackData({ userId = '' }) {
	const monthControls = getMonthControls();

	const formProps =	useForm();
	const { watch: watchDateFilter, control } = formProps;

	const monthFilter = watchDateFilter('created_at_month');
	const yearFilter = watchDateFilter('created_at_year');
	const ratingFilter = watchDateFilter('rating');

	const { params, setParams, feedbackData, loading, setPage } = useListUserFeedbacks({
		userId,
	});

	const { list: FeedbackList, page_limit, total_count } = feedbackData || {};

	useEffect(() => setParams((pv) => ({
		...pv,
		filters: {
			...(pv.filters),
			created_at_month : monthFilter || undefined,
			created_at_year  : yearFilter || undefined,
			rating           : ratingFilter || undefined,
		},
	})), [monthFilter, yearFilter, ratingFilter]);

	const columnsToShow = ['name', 'role', 'rating', 'feedback', 'month'];

	const columns = useGetColumns({ columnsToShow });

	return (
		<>
			<div className={styles.header}>
				<p className={styles.list_header}>Feedback List</p>

				<div className={styles.filter_container}>
					<div className={styles.month_container}>
						<div>
							<SelectController
								{...monthControls.created_at_month}
								control={control}
								formProps={formProps}
							/>
						</div>
					</div>
					<div className={styles.month_container}>
						<div>
							<SelectController
								{...monthControls.created_at_year}
								control={control}
								formProps={formProps}
							/>
						</div>
					</div>
					<div className={styles.month_container}>
						<div>
							<SelectController
								{...monthControls.rating}
								control={control}
								formProps={formProps}
							/>
						</div>
					</div>
				</div>
			</div>

			<UserTableData
				columns={columns}
				list={FeedbackList}
				page_limit={page_limit}
				total_count={total_count}
				loading={loading}
				pagination={params.page}
				setPagination={setPage}
			/>
		</>
	);
}

export default UserFeedbackData;
