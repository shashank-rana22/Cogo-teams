import { Accordion, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';

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
			flex  : 1.7,
		},
		{
			key   : 'below_avg_performance',
			label : 'Below Average Performance',
			flex  : 2.2,
		},
		{
			key   : 'avg_performance',
			label : 'Average Performance',
			flex  : 2,
		},
		{
			key   : 'above_avg_performance',
			label : 'Above Average Performance',
			flex  : 2.2,
		},

	];

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
				{columnsMapping.map((colDetails) => {
					const { key, label, flex } = colDetails;
					return (
						<div key={key} style={{ flex }}>
							{label ? <div className={styles.label}>{label}</div> : null}

							<div className={styles.value}>{i[key]}</div>
						</div>
					);
				})}
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
