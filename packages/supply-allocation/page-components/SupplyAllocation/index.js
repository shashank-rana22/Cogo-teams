import Header from './Header';
import List from './List';
import LocationSelect from './LocationSelect';

function SupplyAllocation() {
	return (
		<>
			<Header />
			<LocationSelect />
			<List />
			<div>your favourite regions</div>
			<List />
		</>
	);
}

export default SupplyAllocation;
