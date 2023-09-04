import { Collapse, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../../../../../common/EmptyState';

import ActionModal from './ActionModal';
import ListHeader from './ListHeader';
import styles from './styles.module.css';
import useList from './useList';

const ONE = 1;

function List(props) {
	const { t } = useTranslation(['allocation']);

	const {
		LIST_COLUMN_MAPPING,
		objectiveList,
		activeObjectiveId,
		setActiveObjectiveId,
		listObjectiveParams,
		total_count,
		page_limit,
		handlePageChange,
		showModal,
		setShowModal,
		refetchListObjectives,
	} = useList({ ...props, t });

	if (isEmpty(objectiveList)) {
		return (
			<EmptyState
				height="400px"
				width="600px"
				flexDirection="column"
				emptyText={t('allocation:objectives_list_not_found')}
			/>
		);
	}

	return (
		<section>
			<ListHeader LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING} />

			<div className={styles.collapse}>
				<Collapse
					panels={objectiveList}
					type="card"
					activeKey={activeObjectiveId}
					setActive={setActiveObjectiveId}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					currentPage={listObjectiveParams?.page || ONE}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(v) => handlePageChange(v)}
				/>
			</div>

			<ActionModal
				showModal={showModal}
				setShowModal={setShowModal}
				refetchListObjectives={refetchListObjectives}
			/>
		</section>
	);
}

export default List;
