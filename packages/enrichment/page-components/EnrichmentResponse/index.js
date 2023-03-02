import { TabPanel, Tabs } from '@cogoport/components';

import { RESPONSE_TABS_MAPPING } from '../../constants/tab-panel-mapping';

import Header from './components/Header';
import Response from './components/Response';
import useEnrichmentResponse from './hooks/useEnrichmentResponse';
import styles from './styles.module.css';

function EnrichmentResponse() {
	const {
		locale,
		refetch,
		loading,
		activeTab,
		partner_id,
		setActiveTab,
		list,
		paginationData,
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

					{Object.values(RESPONSE_TABS_MAPPING).map((item) => (
						<TabPanel key={item.name} name={item.name} title={item.title}>

							<Response
								activeTab={activeTab}
								loading={loading}
								showAddPoc={showAddPoc}
								setShowAddPoc={setShowAddPoc}
								refetch={refetch}
								paginationData={paginationData}
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
