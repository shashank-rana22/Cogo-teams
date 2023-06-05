import InventoryCard from './InventoryCard';

const existing_inventory = [
	['Single Booking Note to use', 'single_booking_notes'],
	['Merge Booking Note', 'mergeable_booking_notes'],
	['Split Booking Note', 'splitable_booking_notes'],
];

function Docs({ data, preferences, setPreferences }) {
	return (
		<div>
			<div>Existing Inventory</div>
			{existing_inventory.map((type) => (
				<InventoryCard
					type={type}
					data={data}
					expanded
					key={type}
					preferences={preferences}
					setPreferences={setPreferences}
				/>
			))}
		</div>
	);
}
export default Docs;
