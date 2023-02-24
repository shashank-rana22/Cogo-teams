import { Button, Accordion, Pagination } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import columnsMapping from '../../../constants/columns-mapping-card';

import ListItem from './ListItem';
import styles from './styles.module.css';

function TeamMembersList({
	list = [],
	pagination,
	page_limit,
	setPagination,
	total_count,
	loading = false,
}) {
	const router = useRouter();

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
	const columns = columnsMapping({ columnsToShow: ['team_count', 'pending_count', 'rating'] });

	const routeToManagerDetails = (id) => {
		if (id) {
			router.push(
				'/feedback-system/hr-dashboard/feedback-management/[user_id]?path=/feedback-system/hr-dashboard',
				`/feedback-system/hr-dashboard/feedback-management/${id}?path=/feedback-system/hr-dashboard`,
			);
		}
	};

	const titleSection = (i) =>	(
		<div className={styles.accordion_item_container}>
			<div className={styles.user_info}>
				<h3 style={{ color: '#ED3726' }}>{i.name}</h3>

				Employee Id:
				{' '}
				<b>{i.cogo_id}</b>
			</div>
			<div className={styles.column_map}>
				{columns.map((colDetails) => {
					const { key, label, flex } = colDetails;
					return (
						<div key={key} style={{ flex }}>
							{label ? <div className={styles.label}>{label}</div> : null}

							<div className={styles.value}>{i[key]}</div>
						</div>

					);
				})}
				<Button
					themeType="link"
					className={styles.details}
					onClick={(e) => {
						e.stopPropagation();
						routeToManagerDetails(i.manager_id);
					}}
				>
					View details

				</Button>
			</div>

		</div>
	);

	return (
		<div className={styles.table_container}>

			{!loading && list.map((item) => (
				<Accordion id={item.cogo_id} title={titleSection(item)}>
					<ListItem item={item} id={item.cogo_id} />
				</Accordion>
			))}

			{total_count > page_limit && (
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
