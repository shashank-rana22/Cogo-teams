import useListDocumentDesk from '../../hooks/useListDocumentDesk';

import DeskTabs from './DeskTabs';
import ShipmentList from './ShipmentList';

function FTL() {
	const { data, loading } = useListDocumentDesk();

	const tabData = data?.pending_tasks_stats;
	return (
		<div>
			<DeskTabs tabData={tabData} />
			<ShipmentList
				loading={loading}
				data={data}
			/>
		</div>

	);
}

export default FTL;
