import useAllocationRelations from '../../../hooks/useAllocationRelations';

import CreateRelationModal from './CreateRelationModal';
import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Relations() {
	const { list, showCreateRelationModal, setShowCreateRelationModal, fetchList } = useAllocationRelations();

	return (
		<div className={styles.container}>
			<Header setShowCreateRelationModal={setShowCreateRelationModal} />

			<List list={list} />

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
