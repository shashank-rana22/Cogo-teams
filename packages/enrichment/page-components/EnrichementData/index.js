import { useEffect } from 'react';

import Header from './components/Header';
import PrimaryTabs from './components/PrimaryTabs';
import useEnrichmentData from './hooks/useEnrichmentData';

function EnrichmentData() {
	const {

		// paginationData,
		// refetch,
		loading,
		// setParams,
		activeTab = '',
		setActiveTab = () => {},
		setResponseData = () => {},
		responseData = [],
		showAddPoc = false,
		setShowAddPoc = () => {},
	} = useEnrichmentData();

	useEffect(() => {

	}, [responseData]);

	return (

		<div>

			<Header />

			<PrimaryTabs
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				loading={loading}
				responseData={responseData}
				setResponseData={setResponseData}
				showAddPoc={showAddPoc}
				setShowAddPoc={setShowAddPoc}
			/>

		</div>

	);
}

export default EnrichmentData;
