import { Modal } from '@cogoport/components';

import useListAllocationConfigurations from '../../../hooks/useListAllocationConfiguration';

import Header from './Header';
import List from './List';
import CreateConfigurationModal from './List/ListItem/Actions/CreateConfiguration';
import styles from './styles.module.css';

function Configurations() {
	const {
		list,
		params,
		setParams,
		loading,
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
				disabled={loading}
			/>

			<List
				list={list}
				loading={loading}
				paginationData={paginationData}
				getNextPage={getNextPage}
				listRefetch={listRefetch}
			/>

			{showCreateConfig && (
				<Modal
					size="md"
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
