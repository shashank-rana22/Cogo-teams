import ListPagination from '../../common/ListPagination';
import useGetTermsAndCondition from '../../hooks/useGetTermsAndCondition';
import Form from '../CreateUpdateTnC/AddEdit/Form';
import Header from '../Header/index';
import TermList from '../TermsList';

function TermsAndConditions({ organizationDetails = {} }) {
	const { id: organizationId } = organizationDetails || {};
	const {
		data,
		loading,
		refetchListApi = () => {},
		editTncModalId,
		setEditTncModalId,
		tncLevel,
		filters,
		setFilters,
		setTncLevel,
		...restProps
	} = useGetTermsAndCondition({ organizationId });

	return (
		<div>
			<Header
				{...restProps}
				filters={filters}
				setFilters={setFilters}
				tncLevel={tncLevel}
				setTncLevel={setTncLevel}
				editTncModalId={editTncModalId}
				setEditTncModalId={setEditTncModalId}
				refetch={refetchListApi}
			/>
			<ListPagination filters={filters} setFilters={setFilters} data={data} />

			<TermList
				EditForm={Form}
				data={data}
				loading={loading}
				setTncLevel={setTncLevel}
				tncLevel={tncLevel}
				setEditTncModalId={setEditTncModalId}
				refetch={refetchListApi}
			/>

			<ListPagination filters={filters} setFilters={setFilters} data={data} />

		</div>
	);
}

export default TermsAndConditions;
