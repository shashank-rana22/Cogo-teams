import { Modal } from '@cogoport/components';
import { getCookie } from '@cogoport/utils';
import { useState } from 'react';

import AgentActions from './components/AgentActions';
import Header from './components/Header';
import MainComponent from './components/MainComponent';
import useEnrichmentDashboard from './hooks/useEnrichmentDashboard';
import useEnrichmentStats from './hooks/useEnrichmentStats';
import styles from './styles.module.css';

function EnrichmentDashboard() {
	const [secondaryTab, setSecondaryTab] = useState(getCookie('active_enrichment_tab') || 'active');

	const {
		stats = {},
		loading: loadingStats = false,
		refetchStats = () => {},
	} = useEnrichmentStats();

	const {
		refetch,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		columns = [],
		debounceQuery,
		searchValue,
		setSearchValue,
		authRoleId,
		actionModal = {},
		setActionModal = () => {},
	} = useEnrichmentDashboard({ secondaryTab, refetchStats });

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.title}>Enrichment Dashboard</div>

				<Header
					refetch={refetch}
					refetchStats={refetchStats}
					debounceQuery={debounceQuery}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					setParams={setParams}
					primaryTab="manual_enrichment"
					authRoleId={authRoleId}
				/>

			</div>

			<div>
				<MainComponent
					refetch={refetch}
					list={list}
					paginationData={paginationData}
					loading={loading}
					setParams={setParams}
					getNextPage={getNextPage}
					columns={columns}
					primaryTab="manual_enrichment"
					debounceQuery={debounceQuery}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					secondaryTab={secondaryTab}
					setSecondaryTab={setSecondaryTab}
					authRoleId={authRoleId}
					stats={stats}
					loadingStats={loadingStats}
					refetchStats={refetchStats}
				/>
			</div>

			{actionModal.show && (
				<Modal
					size="md"
					placement="top"
					show={actionModal.show}
					onClose={() => setActionModal(() => ({
						show: false,
					}))}
				>
					<AgentActions
						actionModal={actionModal}
						setActionModal={setActionModal}
						refetch={refetch}
						loading={loading}
						refetchStats={refetchStats}
					/>
				</Modal>
			)}

		</div>
	);
}

export default EnrichmentDashboard;
