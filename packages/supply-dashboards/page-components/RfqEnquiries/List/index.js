import CardList from './CardList';
import fields from './fields';

function List({
	list, loading, filters, hookSetters,
}) {
	return (
		<CardList
			fields={fields}
			list={list?.data || []}
			loading={loading}
			filters={filters}
			hookSetters={hookSetters}
			total={list?.total}
		/>
	);
}
export default List;
