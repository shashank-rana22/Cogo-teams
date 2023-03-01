import { TabPanel, Tabs } from '@cogoport/components';

import Header from './components/Header';
import Response from './components/Response';
import useEnrichmentResponse from './hooks/useEnrichmentResponse';
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

function EnrichmentResponse() {
	const {
		locale,
		refetch,
		loading,
		activeTab,
		partner_id,
		setActiveTab,
		setResponseData,
		paginationData,
		responseData,
		showAddPoc,
		setShowAddPoc,

	} = useEnrichmentResponse();

	return (

		<section>
			<Header
				locale={locale}
				partner_id={partner_id}
			/>

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
								refetch={refetch}
								paginationData={paginationData}
							/>

						</TabPanel>
					))}

				</Tabs>
			</div>
		</section>

	);
}

export default EnrichmentResponse;
