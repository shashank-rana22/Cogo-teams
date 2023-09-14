import { Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useListAllocationConfigurations from '../../hooks/useListAllocationConfiguration';

import CreateConfigurationModal from './Actions/CreateConfiguration';
import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Configurations() {
	const { t } = useTranslation(['allocation']);

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
		columns,
		listItem,
		workflowName,
		setWorkflowName,
	} = useListAllocationConfigurations({ t });

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
				listRefetch={listRefetch}
				paginationData={paginationData}
				getNextPage={getNextPage}
				columns={columns}
				listItem={listItem}
				workflowName={workflowName}
				setWorkflowName={setWorkflowName}
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
