import { Modal } from '@cogoport/components';

import BackToEnrichment from '../../common/BackToEnrichment';
import TableComponent from '../../common/TableComponent';

import AgentActions from './components/AgentActions';
import Header from './components/Header';
import useUserManagement from './hooks/useUserManagement';
import styles from './styles.module.css';

function UserManagement() {
	const {
		refetch = () => {},
		list = [],
		paginationData = {},
		loading = false,
		getNextPage = () => {},
		columns = [],
		debounceQuery = '',
		searchValue = '',
		setSearchValue = () => {},
		actionModal = {},
		setActionModal = () => {},
		statusToggle = '',
		setStatusToggle = () => {},
	} = useUserManagement();

	return (
		<div>
			<BackToEnrichment />

			<div className={styles.title}>Users (Manage Accounts)</div>

			<Header
				statusToggle={statusToggle}
				setStatusToggle={setStatusToggle}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				setActionModal={setActionModal}
				loading={loading}
			/>

			<TableComponent
				columns={columns}
				list={list}
				loading={loading}
				paginationData={paginationData}
				getNextPage={getNextPage}
			/>

			{actionModal.show && (
				<Modal
					size="md"
					placement="top"
					show={actionModal.show}
					onClose={() => setActionModal(() => ({
						show      : false,
						type      : 'onboard',
						agentData : {},
					}))}
				>
					<AgentActions
						actionModal={actionModal}
						setActionModal={setActionModal}
						refetch={refetch}
					/>
				</Modal>
			)}

		</div>
	);
}

export default UserManagement;
