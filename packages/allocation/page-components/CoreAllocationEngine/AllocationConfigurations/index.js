import { Modal } from '@cogoport/components';

import useListAllocationConfigurations from '../../../hooks/useListAllocationConfiguration';

import CreateConfigurationModal from './CreateConfiguration';
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
		listRefetch,
		paginationData,
		getNextPage,
	} = useListAllocationConfigurations();

	return (
		<div className={styles.container}>
			<Header
				params={params}
				setParams={setParams}
				setShowCreateConfig={setShowCreateConfig}
			/>

			<List
				list={list}
				paginationData={paginationData}
				getNextPage={getNextPage}
				listRefetch={listRefetch}
			/>

			{showCreateConfig && (
				<Modal
					size="lg"
					show={showCreateConfig}
					onClose={() => setShowCreateConfig(false)}
					closeOnOuterClick={false}
					placement="center"
				>
					<CreateConfigurationModal
						viewType="create"
						setShow={setShowCreateConfig}
						listRefetch={listRefetch}
					/>
				</Modal>
			)}
		</div>
	);
}

export default Configurations;
