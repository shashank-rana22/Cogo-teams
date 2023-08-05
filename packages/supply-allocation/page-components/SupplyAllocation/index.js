import Header from './Header';
import List from './List';
import LocationSelect from './LocationSelect';

function SupplyAllocation() {
	return (
		<>
			<Header />
			<LocationSelect />
			<List source="add" />
			<div>your favourite regions</div>
			<List source="view" />
		</>
	);
}

export default SupplyAllocation;
