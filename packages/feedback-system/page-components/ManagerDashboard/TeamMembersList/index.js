import { Accordion, Pagination } from '@cogoport/components';
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
	const columns = columnsMapping({ columnsToShow: ['total_feedbacks', 'BelowAverage', 'Average', 'GoodPerforming'] });

	const titleSection = (i) => (
		<div className={styles.accordion_item_container}>
			<div className={styles.user_info}>
				<h3>
					{i.month}
					{' '}
					{i.year}
				</h3>

			</div>
			<div className={styles.column_map}>
				{columns.map((colDetails) => {
					const { key, label, flex } = colDetails;
					return (
						<div key={key} style={{ flex }}>
							{label ? <div className={styles.label}>{label}</div> : null}

							<div className={styles.value}>{i[key] || i.stats[key]}</div>
						</div>
					);
				})}
			</div>

		</div>
	);

	return (
		<div className={styles.table_container}>

			{!loading && list.map((item, i) => (
				<Accordion key={item.month + { i }} id={item.month} title={titleSection(item)}>
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
