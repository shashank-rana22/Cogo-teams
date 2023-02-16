import { Accordion, Pagination } from '@cogoport/components';

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
	if (list?.length === 0 && !loading) {
		return <EmptyState />;
	}

	const columnsMapping = [
		{
			key   : 'team_size',
			label : 'Team Size',
			value : '20000',
			flex  : 2.5,
		},
		{
			key   : 'feedbacks_pending',
			label : 'Feedbacks Pending',
			value : '1200',
			flex  : 1.9,
		},
		{
			key   : 'latest_kpi',
			label : 'Latest KPI',
			value : '200',
			flex  : 1.7,
		},

	];

	const titleSection = (i) =>	(
		<div className={styles.accordion_item_container}>
			<div className={styles.user_info}>
				<h3 style={{ color: '#ED3726' }}>{i.user_name}</h3>

				Employee Id: &nbsp;
				<b>{i.employee_id}</b>

			</div>
			<div className={styles.column_map}>
				{columnsMapping.map((colDetails) => {
					const { key, label, value, flex } = colDetails;
					return (
						<div key={key} style={{ flex }}>
							{label ? <div className={styles.label}>{label}</div> : null}

							<div className={styles.value}>{value}</div>
						</div>

					);
				})}
				<span className={styles.details}>View details</span>
			</div>

		</div>
	);

	return (
		<div className={styles.table_container}>

			{list.map((item) => (
				<Accordion id={item.user_name} title={titleSection(item)}>
					<ListItem item={item} />
				</Accordion>
			))}

			{total_count > 10 && (
				<div className={styles.pagination_container}>
					<Pagination
						className="md"
						pageRange={3}
						pageLimit={page_limit || 10}
						total={total_count || 0}
						pagination={pagination}
						setPagination={setPagination}
					/>
				</div>
			)}
		</div>
	);
}

export default TeamMembersList;
