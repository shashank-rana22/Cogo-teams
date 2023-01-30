import useAllocationConfigurations from '../../../hooks/useAllocationConfiguration';

import Header from './Header';
import styles from './styles.module.css';

function AllocationConfigurations() {
	const {
		list = [],
	} = useAllocationConfigurations();

	console.log('list :: ', list);

	return (
		<div className={styles.container}>
			<Header />
		</div>
	);
}

export default AllocationConfigurations;
