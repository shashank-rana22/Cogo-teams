import useAllocationConfigurations from '../../../hooks/useAllocationConfiguration';

import CreateConfigurationModal from './CreateConfigurationModal';
import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Configurations() {
	const {
		list,
		params,
		setParams,
		showCreateConfig,
		setShowCreateConfig,
		listRefresh,
	} = useAllocationConfigurations();

	return (
		<div className={styles.container}>
			<Header
				params={params}
				setParams={setParams}
				setShowCreateConfig={setShowCreateConfig}
			/>

			<List list={list} />

			{showCreateConfig && (
				<CreateConfigurationModal
					viewType="create"
					showCreateConfig={showCreateConfig}
					setShowCreateConfig={setShowCreateConfig}
					listRefresh={listRefresh}
				/>
			)}
		</div>
	);
}

export default Configurations;
