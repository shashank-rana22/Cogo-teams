import { Pagination, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyStateDocs from './commons/EmptyStateDocs/index';
import useGetEntityLevelOutstanding from './hooks/useGetEntityLevelOutstanding';
import useGetOrgOutstanding from './hooks/useGetOrgOutstanding';
import OutstandingFilter from './OutstandingFilter';
import OutstandingList from './OutstandingList';
import OrgLoader from './OutstandingList/OrgLoaders';
import StatsOutstanding from './OutstandingList/StatsOutstanding';
import styles from './styles.module.css';
import ViewOrganizationDetails from './ViewOrganizationDetails';

const LOADER_LEN = 7;

function Outstanding({
	entityCode = '',
	setSelectedOrg = () => { },
	selectedOrg = {},
}) {
	const [formFilters, setFormFilters] = useState({
		kamId              : '',
		salesAgentId       : '',
		creditControllerId : '',
		companyType        : '',
	});

	const { entityData = {}, entityDataLoading = false } = useGetEntityLevelOutstanding({ entityCode });
	const {
		outStandingData = {},
		outstandingLoading = false,
		setoutStandingFilters = () => { },
		outStandingFilters = {},
		orderBy = {},
		setOrderBy = () => { },
		refetch = () => { },
	} = useGetOrgOutstanding({ entityCode });

	const { page = 1, pageLimit = 10 } = outStandingFilters || {};
	const { totalRecords = 10, list = [] } = outStandingData || {};

	const handleChange = (val) => {
		setoutStandingFilters({ ...(outStandingFilters || {}), search: val });
	};

	const clearFilter = () => {
		setFormFilters({
			kamId              : '',
			salesAgentId       : '',
			creditControllerId : '',
			companyType        : '',
		});
	};

	return (
		<div className={styles.font}>
			{!isEmpty(selectedOrg)
				? <ViewOrganizationDetails selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} />
				: (
					<>
						<div className={styles.topcard}>
							{entityDataLoading ? <Placeholder height="200px" /> : (
								<StatsOutstanding
									item={entityData?.[GLOBAL_CONSTANTS.zeroth_index]}
									source="topcard"
								/>
							)}
						</div>
						<OutstandingFilter
							params={outStandingFilters}
							setParams={setoutStandingFilters}
							orderBy={orderBy}
							setOrderBy={setOrderBy}
							handleChange={handleChange}
							formFilters={formFilters}
							setFormFilters={setFormFilters}
							clearFilter={clearFilter}
							handleInputReset={() => handleChange('')}
							entityCode={entityCode}
							refetch={refetch}
						/>
						{outstandingLoading ? (
							<div>
								{[...Array(LOADER_LEN).keys()].map((key) => (
									<OrgLoader key={key} />
								))}
							</div>
						) : (
							<>
								{list?.map((item) => (
									<OutstandingList
										item={item}
										key={item?.organizationId}
										showElement={false}
										setSelectedOrg={setSelectedOrg}
									/>
								))}
								{!isEmpty(list) ? (
									<div className={styles.pagination_container}>
										<Pagination
											type="table"
											currentPage={page}
											totalItems={totalRecords}
											pageSize={pageLimit}
											onPageChange={(val) => setoutStandingFilters({
												...outStandingFilters,
												page: val,
											})}
										/>
									</div>
								) : <div className={styles.empty_state}><EmptyStateDocs /></div>}
							</>
						)}
					</>
				)}
		</div>
	);
}

export default Outstanding;
