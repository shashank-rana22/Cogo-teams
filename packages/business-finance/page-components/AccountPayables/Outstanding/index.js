import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyStateDocs from './commons/EmptyStateDocs/index.tsx';
import useGetOrgOutstanding from './hooks/useGetOrgOutstanding';
import OutstandingFilter from './OutstandingFilter';
import OutstandingList from './OutstandingList';
import OrgLoader from './OutstandingList/OrgLoaders';
import styles from './styles.module.css';

const LOADER_LEN = 7;

function Outstanding({ entityCode = '' }) {
	const [formFilters, setFormFilters] = useState({
		kamId              : '',
		salesAgentId       : '',
		creditControllerId : '',
		companyType        : '',
	});

	const {
		outStandingData,
		outstandingLoading,
		setoutStandingFilters,
		outStandingFilters,
		orderBy,
		setOrderBy,
		setQueryKey,
		queryKey,
		refetch,
	} = useGetOrgOutstanding({ entityCode });

	const { page, pageLimit } = outStandingFilters || {};
	const { totalRecords, list = [] } = outStandingData || {};

	const handleChange = (val) => {
		setoutStandingFilters({ ...outStandingFilters, search: val });
	};

	const clearFilter = () => {
		setFormFilters({
			kamId              : '',
			salesAgentId       : '',
			creditControllerId : '',
			companyType        : '',
		});
	};

	const handleInputReset = () => {
		setoutStandingFilters({ ...outStandingFilters, search: '' });
	};

	return (
		<>
			<OutstandingFilter
				params={outStandingFilters}
				setParams={setoutStandingFilters}
				orderBy={orderBy}
				setOrderBy={setOrderBy}
				handleChange={handleChange}
				formFilters={formFilters}
				setFormFilters={setFormFilters}
				clearFilter={clearFilter}
				handleInputReset={handleInputReset}
				queryKey={queryKey}
				setQueryKey={setQueryKey}
				entityCode={entityCode}
				refetch={refetch}
			/>

			{outstandingLoading ? (
				<div>
					{Array(LOADER_LEN)
						.fill(null).map((key) => (
							<OrgLoader key={key} />
						))}
				</div>
			) : (
				<>
					{list?.map((item) => (
						<OutstandingList
							item={item}
							entityCode={entityCode}
							key={item?.organizationId}
							showElement={false}
							orderBy={orderBy}
							outStandingFilters={outStandingFilters}
							formFilters={formFilters}
							organizationId={item?.organizationId}
						/>
					))}
					{isEmpty(list) && <div className={styles.empty_state}><EmptyStateDocs /></div>}
					{!isEmpty(list) && (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={totalRecords}
								pageSize={pageLimit}
								onPageChange={(val) => setoutStandingFilters({ ...outStandingFilters, page: val })}
							/>
						</div>
					)}
				</>
			)}

		</>
	);
}

export default Outstanding;
