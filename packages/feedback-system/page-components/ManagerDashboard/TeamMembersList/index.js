import { Button, Accordion, Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';

import ListItem from './ListItem';
import styles from './styles.module.css';

function TeamMembersList({
	// columns,
	list = [],
	pagination,
	page_limit,
	setPagination,
	total_count,
	loading = false,
}) {
	const Router = useRouter();

	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={280}
					width={440}
					emptyText="No Feedbacks Found"
					textSize="24px"
					flexDirection="column"
				/>
			</div>
		);
	}

	const columnsMapping = [
		{
			key   : 'feedbacks_given',
			label : 'Feedbacks Given',
			value : '36',
			flex  : 1.7,
		},
		{
			key   : 'below_avg_performance',
			label : 'Below Average Performance',
			value : '12',
			flex  : 2.2,
		},
		{
			key   : 'avg_performance',
			label : 'Average Performance',
			value : '12',
			flex  : 2,
		},
		{
			key   : 'above_avg_performance',
			label : 'Above Average Performance',
			value : '12',
			flex  : 2.2,
		},

	];

	// // router route for the manager feedback....
	// const routeToManagerDetails = (id) => {
	// 	if (id) {
	// 		Router.push(
	// 			'/feedback-system/hr-dashboard/feedback-management/[user_id]?path=/feedback-system/hr-dashboard',
	// 			`/feedback-system/hr-dashboard/feedback-management/${id}?path=/feedback-system/hr-dashboard`,
	// 		);
	// 	}
	// };

	const titleSection = (i) => (
		<div className={styles.accordion_item_container}>
			<div className={styles.user_info}>
				<h3>
					{i.month}
					&nbsp;
					{i.year}
				</h3>

			</div>
			<div className={styles.column_map}>
				{ i.details.length > 0
					? (columnsMapping.map((colDetails) => {
						const { key, label, value, flex } = colDetails;
						return (
							<div key={key} style={{ flex }}>
								{label ? <div className={styles.label}>{label}</div> : null}

								<div className={styles.value}>{value}</div>
							</div>
						);
					}))

					: (
						<div className={styles.details_pending}>
							<div className={styles.details_pending_text}>Pending</div>
						</div>
					)}
			</div>

		</div>
	);

	return (
		<div className={styles.table_container}>

			{list.map((item) => (
				<Accordion id={item.month} title={titleSection(item)}>
					<ListItem item={item} />
				</Accordion>
			))}

			{total_count > 2 && (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={pagination}
						totalItems={total_count || 0}
						pageSize={page_limit || 10}
						onPageChange={setPagination}
					/>
				</div>
			)}
		</div>
	);
}

export default TeamMembersList;
