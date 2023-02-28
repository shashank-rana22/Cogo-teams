import { TabPanel, Tabs } from '@cogoport/components';
// import { useEffect } from 'react';

import Header from './components/Header';
import Response from './components/Response';
import useEnrichmentData from './hooks/useEnrichmentData';

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
			<div style={{ marginTop: 30 }}>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="user" title="Point Of Contacts">

						<Response
							responseData={responseData}
							setResponseData={setResponseData}
							activeTab={activeTab}
							loading={loading}
							showAddPoc={showAddPoc}
							setShowAddPoc={setShowAddPoc}
						/>

					</TabPanel>

					<TabPanel name="address" title="Address">

						<Response
							responseData={responseData}
							setResponseData={setResponseData}
							activeTab={activeTab}
							loading={loading}
							showAddPoc={showAddPoc}
							setShowAddPoc={setShowAddPoc}
						/>

					</TabPanel>
				</Tabs>
			</div>

		</div>

	);
}

export default EnrichmentData;
