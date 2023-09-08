import { useState } from 'react';

import ListPagination from '../common/ListPagination';
import useGetTermsAndCondition from '../hooks/useGetTermsAndCondition';

import Form from './CreateUpdateTnC/AddEdit/Form';
import Header from './Header/index';
import TermList from './TermsList';

function TermsAndConditions(props) {
	const { organizationDetails, viewThrough } = props;
	const { id: organizationId } = organizationDetails || {};
	const [showModal, setShowModal] = useState(false);
	const {
		list,
		data,
		totalCount,
		loading,
		refetchListApi = () => {},
		setPagination = () => {},
		editTncModalId,
		setEditTncModalId,
		tncLevel,
		filters,
		setFilters,
		setTncLevel,
		...restProps
	} = useGetTermsAndCondition({ organizationId });

	const viewFromDemand = ['demand-crm', 'prm'].includes(viewThrough);

	return (
		<div>
			<Header
				{...restProps}
				filters={filters}
				setFilters={setFilters}
				showModal={showModal}
				tncLevel={tncLevel}
				setShowModal={setShowModal}
				setTncLevel={setTncLevel}
				viewFromDemand={viewFromDemand}
				setPagination={setPagination}
				editTncModalId={editTncModalId}
				setEditTncModalId={setEditTncModalId}
				refetch={refetchListApi}
			/>
			<TermList
				EditForm={Form}
				list={list}
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
