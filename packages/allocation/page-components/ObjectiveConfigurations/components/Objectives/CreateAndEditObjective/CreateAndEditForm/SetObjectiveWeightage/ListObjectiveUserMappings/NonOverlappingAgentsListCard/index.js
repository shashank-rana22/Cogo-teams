import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ObjectiveAccordian from '../ObjectiveAccordian';

import AgentsList from './AgentsList';
import styles from './styles.module.css';
import useGetNonOverlappingList from './useGetNonOverlappingList';

function NonOverlappingAgentsListCard(props) {
	const { formValues, control } = props;

	const { list, loading, getNextPage, paginationData } = useGetNonOverlappingList({ formValues });

	const { page = 1, page_limit = 0, total_count = 0 } = paginationData || {};

	if (isEmpty(list)) return null;

	return (
		<div className={styles.card_container}>
			<h4>Users</h4>

			<AgentsList
				loading={loading}
				list={list}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					pageSize={page_limit}
					totalItems={total_count}
					onPageChange={getNextPage}
				/>
			</div>

			<ObjectiveAccordian
				currentObjective
				formValues={formValues}
				objective={formValues.generalConfiguration}
				control={control}
				defaultWeightage={100}
			/>
		</div>
	);
}

export default NonOverlappingAgentsListCard;
