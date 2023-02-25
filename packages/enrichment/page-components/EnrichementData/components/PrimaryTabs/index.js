import { TabPanel, Tabs } from '@cogoport/components';

import Response from '../../common/Response';

function PrimaryTabs({
	activeTab = '',
	setActiveTab = () => {},
	responseData = [],
	loading = false,
	setResponseData = () => {},
	showAddPoc = false,
	setShowAddPoc = () => {},

}) {
	return (
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
	);
}

export default PrimaryTabs;
