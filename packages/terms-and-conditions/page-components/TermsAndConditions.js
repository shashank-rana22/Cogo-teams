import { Pagination } from '@cogoport/components';
import { useState } from 'react';

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
		totalCount,
		loading,
		refetchListApi = () => {},
		pagination = 1,
		setPagination = () => {},
		editTncModalId,
		setEditTncModalId,
		tncLevel,
		filters,
		setFilters,
		setTncLevel,
		...restProps
	} = useGetTermsAndCondition({ organizationId });

	const onPageChange = (pageNumber) => {
		setPagination(pageNumber);
	};

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

			<Pagination
				type="table"
				pageSize={10}
				totalItems={totalCount}
				currentPage={pagination}
				onPageChange={onPageChange}
			/>

		</div>
	);
}

export default TermsAndConditions;
