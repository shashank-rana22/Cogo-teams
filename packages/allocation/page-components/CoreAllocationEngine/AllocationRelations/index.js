import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import useAllocationRelations from '../../../hooks/useAllocationRelations';

import CreateRelationModal from './CreateRelationModal';
import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Relations() {
	const {
		list, showCreateRelationModal, setShowCreateRelationModal,
		fetchList, setParams = () => {}, loading,
	} = useAllocationRelations();

	return (
		<div className={styles.container}>
			<Header setShowCreateRelationModal={setShowCreateRelationModal} setParams={setParams} />

			{(!loading && isEmpty(list)) ? (
				<div className={styles.empty_container}>
					<EmptyState
						height={280}
						width={440}
						emptyText="No records found"
						textSize="24px"
						flexDirection="column"
					/>
				</div>

			) : <List list={list} />}

			{showCreateRelationModal && (
				<CreateRelationModal
					showCreateRelationModal={showCreateRelationModal}
					setShowCreateRelationModal={setShowCreateRelationModal}
					fetchList={fetchList}
				/>
			)}
		</div>
	);
}

export default Relations;
