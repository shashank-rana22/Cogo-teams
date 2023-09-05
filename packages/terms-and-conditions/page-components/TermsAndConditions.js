import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import useGetTermsAndCondition from '../hooks/useGetTermsAndCondition';

import CreateTerm from './CreateTerm';
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
		setTncLevel,
		...restProps
	} = useGetTermsAndCondition({ organizationId });

	const onPageChange = (pageNumber) => {
		setPagination(pageNumber);
	};
	const viewFromDemand = ['demand-crm', 'prm'].includes(viewThrough);

	const editFormValue = list.find((item) => item.id === editTncModalId);

	return (
		<div>
			<Header
				{...restProps}
				showModal={showModal}
				setShowModal={setShowModal}
				setTncLevel={setTncLevel}
				viewFromDemand={viewFromDemand}
				setPagination={setPagination}
				setEditTncModalId={setEditTncModalId}
			/>
			{editTncModalId && (
				<CreateTerm
					show={showModal}
					setShow={setShowModal}
					tncLevel={tncLevel}
					setTncLevel={setTncLevel}
					editTncModalId={editTncModalId}
					setEditTncModalId={setEditTncModalId}
					editFormValue={editFormValue}
					refetch={refetchListApi}
					organizationId={organizationId}
				/>
			)}
			<TermList
				list={list}
				loading={loading}
				setTncLevel={setTncLevel}
				setEditTncModalId={setEditTncModalId}
				refetch={refetchListApi}
			/>
			{totalCount > 10 ? (
				<Pagination
					type="number"
					pageRange={5}
					pageSize={10}
					totalItems={totalCount || 0}
					currentPage={pagination}
					setPagination={onPageChange}
				/>
			) : null}
		</div>
	);
}

export default TermsAndConditions;
