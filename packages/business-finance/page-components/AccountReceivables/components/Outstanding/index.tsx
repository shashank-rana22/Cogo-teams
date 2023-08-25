import { Pagination } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import EmptyState from '../../../commons/EmptyStateDocs';
import useGetKamWiseOutstandingsStats from '../../hooks/useGetKamWiseOutstandingsStats';
import useGetOrgOutstanding from '../../hooks/useGetOrgOutstanding';
import useGetSageArOutstandingsStats from '../../hooks/useGetSageArOustandingStats';
import useGetServiceWiseOutstandingsStats from '../../hooks/useGetServiceWiseOutstandingsStats';

import OutstandingFilter from './OutstandingFilter';
import OutstandingList from './OutstandingList';
import OrgLoader from './OutstandingList/OrgLoaders';
import OverallOutstandingStats from './OverallOutstandingStats';
import ResponsivePieChart from './ResponsivePieChart';
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
	const ref = useRef(null);
	console.log(entityCode, 'entityCode');
	const { kamWiseStats, kamWiseLoading } = useGetKamWiseOutstandingsStats({
		globalFilters: formFilters,
	});
	const { serviceWiseStats, serviceWiseLoading } =	useGetServiceWiseOutstandingsStats({
		globalFilters: formFilters,
	});
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
	const KamDataPoints = (kamWiseStats || []).map((item, index) => ({
		id        : index,
		label     : item.kam_owners.slice(0, 36) || '-',
		sub_label : item.kam_owners || '-',
		value     : item.total_outstanding_amount || 0,
	}));
	const ServiceDataPoints = (serviceWiseStats || []).map((item, index) => ({
		id        : index,
		label     : startCase(item.shipment_type) || '-',
		sub_label : startCase(item.shipment_type) || '-',
		value     : item.total_open_invoice_amount || 0,
	}));
	const graphPropsList = {
		kam_wise_outstandings: {
			data        : KamDataPoints,
			heading     : 'KAM Wise Outstandings',
			loading     : kamWiseLoading,
			isKamWise   : true,
			graphStyles : {
				legendPaddingTop: '0px',
			},
			listTitle: {
				nameTitle  : 'KAM Owners',
				valueTitle : 'Total Outstanding Amount',
			},
		},
		service_wise_outstandings: {
			data        : ServiceDataPoints,
			heading     : 'Service Wise Open Invoices',
			loading     : serviceWiseLoading,
			isKamWise   : false,
			graphStyles : {
				legendPaddingTop: '10px',
			},
			listTitle: {
				nameTitle  : 'KAM Owners',
				valueTitle : 'Total Open Invoice Amount',
			},
		},
	};
	console.log(kamWiseStats, 'kamWiseStats');

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
					<div ref={ref}>
						<div className="ui-table-root">
							{Object.keys(graphPropsList || {}).map((singleGraphProp) => (
								<div key={singleGraphProp}>
									<ResponsivePieChart
										{...(graphPropsList[singleGraphProp] || {})}
									/>
								</div>
							))}
							{/* <div>
								{Object.keys(graphPropsChild || {}).map((singleGraphProp) => (
									<ResponsivePieChart
										{...(graphPropsChild[singleGraphProp] || {})}
									/>
								))}
							</div> */}
							{/* <div>
								<CcCallList
									dateFilter={dateFilter}
									list={ccCommStats}
									loading={ccCommLoading}
									setRange={setRange}
									range={range}
									setDateFilter={setDateFilter}
								/>
							</div> */}
						</div>
					</div>
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
