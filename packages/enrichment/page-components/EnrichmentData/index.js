import { TabPanel, Tabs } from '@cogoport/components';

import Header from './components/Header';
import Response from './components/Response';
import useEnrichmentData from './hooks/useEnrichmentData';
import styles from './styles.module.css';

const tabPanelMapping = {
	user: {
		name  : 'user',
		title : 'Point Of Contacts',
	},
	address: {
		name  : 'address',
		title : 'Address',
	},

};

function EnrichmentData() {
	const {
		loading,
		activeTab,
		setActiveTab,
		setResponseData,
		responseData,
		showAddPoc,
		setShowAddPoc,
	} = useEnrichmentData();

	return (

		<div>
			<Header />

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>

					{Object.values(tabPanelMapping).map((item) => (
						<TabPanel name={item.name} title={item.title}>

							<Response
								responseData={responseData}
								setResponseData={setResponseData}
								activeTab={activeTab}
								loading={loading}
								showAddPoc={showAddPoc}
								setShowAddPoc={setShowAddPoc}
							/>

						</TabPanel>
					))}

				</Tabs>
			</div>
		</div>

	);
}

export default EnrichmentData;
