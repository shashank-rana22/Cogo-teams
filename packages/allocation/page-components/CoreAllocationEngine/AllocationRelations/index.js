import useAllocationRelations from '../../../hooks/useAllocationRelations';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Relations() {
	const { list } = useAllocationRelations();

	return (
		<div className={styles.container}>
			<Header />

			<List list={list} />
		</div>
	);
}

export default Relations;
