import List from './components/List';
import ScopeAndFilters from './components/ScopeAndFilters';
import TabsAndFilters from './components/TabsAndFilters';
import useListShipments from './hooks/useListShipments';

export default function FCLDesk({ stateProps = {} }) {
	const { data, loading } = useListShipments({ stateProps });

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
				<h1>Booking Desk</h1>

				<ScopeAndFilters stateProps={stateProps} />
			</div>

			<TabsAndFilters stateProps={stateProps} />

			<List data={data} loading={loading} stateProps={stateProps} />
		</div>
	);
}
