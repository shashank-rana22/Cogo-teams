import InventoryCard from './InventoryCard';

const existing_inventory = [
	['Single Booking Note to use', 'single_booking_notes'],
	['Merge Booking Note', 'mergeable_booking_notes'],
	['Split Booking Note', 'splitable_booking_notes'],
];

function Docs({ data, preferences, setPreferences }) {
	return (
		<div style={{ backgroundColor: '#fff', marginTop: '18px', padding: '20px' }}>
			<div style={{ fontSize: '20px', fontWeight: '600', color: '#4F4F4F' }}>Existing Inventory</div>
			{existing_inventory.map((type) => (
				<div key={type} style={{ marginTop: '10px' }}>
					<InventoryCard
						type={type}
						data={data}
						expanded
						preferences={preferences}
						setPreferences={setPreferences}
					/>
				</div>
			))}
		</div>
	);
}
export default Docs;
