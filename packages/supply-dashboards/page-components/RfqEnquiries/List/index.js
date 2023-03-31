import CardList from './CardList';
import fields from './fields';

function List({
	list, loading, filters, hookSetters, refetch,
}) {
	return (
		<CardList
			fields={fields}
			list={list?.data || []}
			loading={loading}
			filters={filters}
			hookSetters={hookSetters}
			total={list?.total}
			refetch={refetch}
		/>
	);
}
export default List;
