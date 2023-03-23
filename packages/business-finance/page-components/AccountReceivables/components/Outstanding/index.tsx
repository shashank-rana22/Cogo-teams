import { Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import EmptyState from '../../../commons/EmptyStateDocs';
import useGetOrgOutstanding from '../../hooks/useGetOrgOutstanding';

import OutstandingFilter from './OutstandingFilter';
import OutstandingList from './OutstandingList';
import OrgLoader from './OutstandingList/OrgLoaders';
import styles from './styles.module.css';

function Outstanding() {
	const [formFilters, setFormFilters] = useState({
		ageingKey          : '',
		checkBox           : [],
		salesAgentId       : '',
		creditControllerId : '',
		companyType        : '',
		entityCode         : '',
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
	} = useGetOrgOutstanding({ formFilters });

	const { page, pageLimit } = outStandingFilters || {};
	const { totalRecords, list } = outStandingData || [];

	const handleChange = (val:string) => {
		setoutStandingFilters({ ...outStandingFilters, search: val });
	};

	const clearFilter = () => {
		setFormFilters({
			ageingKey          : '',
			checkBox           : [],
			salesAgentId       : '',
			creditControllerId : '',
			companyType        : '',
			entityCode         : '',
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
			/>

			{outstandingLoading ? (
				<div>
					{[...Array(7)].map(() => (
						<OrgLoader />
					))}
				</div>
			) : (
				<>
					{list?.map((item) => (
						<OutstandingList item={item} />
					))}
					{list?.length === 0 && <EmptyState />}
					{list?.length > 0 && (
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
