import useAllocationConfigurations from '../../../hooks/useAllocationConfiguration';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Configurations() {
	const {
		list,
	} = useAllocationConfigurations();

	return (
		<div className={styles.container}>
			<Header />

			<List list={list} />
		</div>
	);
}

export default Configurations;
