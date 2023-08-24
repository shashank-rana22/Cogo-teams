import { Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import EmptyState from '../../../commons/EmptyStateDocs';
import useGetOrgOutstanding from '../../hooks/useGetOrgOutstanding';
import useGetSageArOutstandingsStats from '../../hooks/useGetSageArOustandingStats';

import OutstandingFilter from './OutstandingFilter';
import OutstandingList from './OutstandingList';
import OrgLoader from './OutstandingList/OrgLoaders';
import OverallOutstandingStats from './OverallOutstandingStats';
import styles from './styles.module.css';

function Outstanding({ entityCode }) {
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
	} = useGetOrgOutstanding({ formFilters, entityCode });
	const { statsData, statsLoading } = useGetSageArOutstandingsStats({
		globalFilters: formFilters,
	});
	console.log(entityCode, 'entityCode');

	const { page, pageLimit } = outStandingFilters || {};
	const { totalRecords, list = [] } = outStandingData || {};

	const handleChange = (val:string) => {
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
			/>
			<OverallOutstandingStats item={statsData} statsLoading={statsLoading} />
			<div className={styles.overlay_container}>
				<div className={styles.scroll_container}>
					{/* <div ref={ref}>
						<StyledRow className="ui-table-root">
							{Object.keys(graphPropsList || {}).map((singleGraphProp) => (
								<Col xs={6}>
									<ResponsivePieChart
										{...(graphPropsList[singleGraphProp] || {})}
									/>
								</Col>
							))}
							<Col xs={5}>
								{Object.keys(graphPropsChild || {}).map((singleGraphProp) => (
									<ResponsivePieChart
										{...(graphPropsChild[singleGraphProp] || {})}
									/>
								))}
							</Col>
							<Col xs={7}>
								<CcCallList
									dateFilter={dateFilter}
									list={ccCommStats}
									loading={ccCommLoading}
									setRange={setRange}
									range={range}
									setDateFilter={setDateFilter}
								/>
							</Col>
						</StyledRow>
					</div> */}
					{/* <ScrollDiv>
						{viewGraphStats && (
							<ScrollBar
								ref={ref}
								rightOffSet={rightOffSet}
								leftOffSet={leftOffSet}
							/>
						)}
					</ScrollDiv> */}
				</div>
				{/* {!viewGraphStats && (
					<Overlay>
						<Button
							onClick={() => setViewGraphStats(true)}
							className="primary md"
						>
							View
						</Button>
					</Overlay>
				)} */}
			</div>
			{outstandingLoading ? (
				<div>
					{[1, 2, 3, 4, 5, 6, 7].map((key) => (
						<OrgLoader key={key} />
					))}
				</div>
			) : (
				<>
					{list?.map((item) => (
						<OutstandingList item={item} entityCode={entityCode} key={item?.serialId} />
					))}
					{list?.length === 0 && <div className={styles.empty_state}><EmptyState /></div>}
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
