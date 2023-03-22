import { TabPanel, Tabs } from '@cogoport/components';

import { RESPONSE_TABS_MAPPING } from '../../constants/tab-panel-mapping';

import Header from './components/Header';
import List from './components/List';
import useEnrichmentResponse from './hooks/useEnrichmentResponse';
import styles from './styles.module.css';

function EnrichmentResponse() {
	const {
		list,
		refetch,
		loading,
		activeTab,
		setActiveTab,
		showAddPoc,
		setShowAddPoc,
	} = useEnrichmentResponse();

	return (

		<section>
			<Header />

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					{Object.values(RESPONSE_TABS_MAPPING).map((item) => (

						<TabPanel key={item.name} name={item.name} title={item.title}>

							<List
								activeTab={activeTab}
								loading={loading}
								showAddPoc={showAddPoc}
								setShowAddPoc={setShowAddPoc}
								refetch={refetch}
								list={list}
							/>
						</TabPanel>
					))}

				</Tabs>
			</div>
		</section>

	);
}

export default EnrichmentResponse;
