import CardList from './CardList';
import fields from './fields';

function List({
	list, loading, filters, hookSetters,
}) {
	return (
		<CardList
			fields={fields}
			list={list || []}
			loading={loading}
			filters={filters}
			hookSetters={hookSetters}
		/>
	);
}
export default List;
