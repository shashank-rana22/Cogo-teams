import useGetListRfqs from '../hooks/useGetListRfqs';

import CardList from './CardList';
import fields from './fields';

function List() {
	const {
		loading,
		page,
		filters,
		list,
		hookSetters,
		refetch,
	} = useGetListRfqs();
	return (<CardList fields={fields} data={list?.data || []} loading={loading} />);
}
export default List;
