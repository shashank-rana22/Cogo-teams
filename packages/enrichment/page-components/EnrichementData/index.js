import Header from './components/Header';
import PrimaryTabs from './components/PrimaryTabs';
import useEnrichmentData from './hooks/useEnrichmentData';

function EnrichmentData() {
	const { activeTab, setActiveTab } = useEnrichmentData({});
	return (

		<div>

			<Header />

			<PrimaryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>

	);
}

export default EnrichmentData;
