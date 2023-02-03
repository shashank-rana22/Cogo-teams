import useAllocationConfigurations from '../../../hooks/useAllocationConfiguration';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Configurations() {
	const {
		list, params, setParams,
	} = useAllocationConfigurations();

	return (
		<div className={styles.container}>
			<Header
				params={params}
				setParams={setParams}
			/>

			<List list={list} />
		</div>
	);
}

export default Configurations;
