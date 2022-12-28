import CardList from './CardList';
import fields from './fields';

function List({
	list, loading, filters, hookSetters, setRfq,
}) {
	return (
		<CardList
			fields={fields}
			list={list || []}
			loading={loading}
			filters={filters}
			hookSetters={hookSetters}
			setRfq={setRfq}
		/>
	);
}
export default List;
