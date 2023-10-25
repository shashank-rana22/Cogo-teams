/* eslint-disable max-lines-per-function */
import { Button, Pagination, cl } from '@cogoport/components';
import { startCase, isEmpty, startOfMonth } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import EmptyState from '../../../commons/EmptyStateDocs';
import {
	kamWiseList,
	serviceWiseList,
	ccWiseList,
} from '../../../configs/dummy-graph-stats';
import useGetCallPriority from '../../../hooks/useGetCallPriority';
import useGetCcCommunicationStats from '../../../hooks/useGetCcCommunicationStats';
import useGetCcWiseOutstandingStats from '../../../hooks/useGetCcWiseOutstandingStats';
import useGetKamWiseOutstandingsStats from '../../../hooks/useGetKamWiseOutstandingsStats';
import useGetOrgOutstanding from '../../../hooks/useGetOrgOutstanding';
import useGetSageArOutstandingsStats from '../../../hooks/useGetSageArOustandingStats';
import useGetServiceWiseOutstandingsStats from '../../../hooks/useGetServiceWiseOutstandingsStats';

import CcCallList from './CcCallList';
import Filters from './Filters';
import overAllOutstandingcontrols from './Filters/overAllOutstandingcontrols';
import OutstandingFilter from './OutstandingFilter';
import OutstandingList from './OutstandingList';
import OrgLoader from './OutstandingList/OrgLoaders';
import OverallOutstandingStats from './OverallOutstandingStats';
import ResponsivePieChart from './ResponsivePieChart';
import ScrollBar from './ScrollBar';
import styles from './styles.module.css';

const LOADER_LEN = 7;
const ONLY_LEFT = true;

function OverAllOutstanding({
	entityCode = '',
	setSelectedOrgId = () => {},
}) {
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
		queryKey,
		refetch,
		filters,
		setFilters,
	} = useGetOrgOutstanding({ entityCode });

	const [dateFilter, setDateFilter] = useState({
		startDate : startOfMonth(new Date()),
		endDate   : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
	});
	const [range, setRange] = useState('this_month');
	const { callPriorityData = {}, callPriorityLoading = false } = useGetCallPriority({ entityCode });
	const { statsData, statsLoading } = useGetSageArOutstandingsStats({
		entityCode,
	});
	const [viewGraphStats, setViewGraphStats] = useState(false);
	const ref = useRef(null);
	const RIGHT_OFF_SET = 2000;
	const LEFT_OFF_SET = -2000;
	const { kamWiseStats, kamWiseLoading } = useGetKamWiseOutstandingsStats({ viewGraphStats });
	const { serviceWiseStats, serviceWiseLoading } =	useGetServiceWiseOutstandingsStats({ viewGraphStats });
	const { ccWiseStats, ccWiseLoading } = useGetCcWiseOutstandingStats({ viewGraphStats });
	const { ccCommStats = [], ccCommLoading = false } = useGetCcCommunicationStats({
		dateFilter,
		viewGraphStats,
	});
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

	const ccDataPoints = (ccWiseStats || []).map((item, index) => ({
		id        : index,
		label     : startCase(item.name) || '-',
		sub_label : startCase(item.name) || '-',
		value     : item.total_outstanding_amount || 0,
	}));

	const graphPropsList = {
		kam_wise_outstandings: {
			data        : viewGraphStats ? KamDataPoints : kamWiseList,
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
			data        : viewGraphStats ? ServiceDataPoints : serviceWiseList,
			heading     : 'Service Wise Open Invoices',
			loading     : serviceWiseLoading,
			isKamWise   : false,
			graphStyles : {
				legendPaddingTop: '10px',
			},
			listTitle: {
				nameTitle  : 'Services Wise',
				valueTitle : 'Total Open Invoice Amount',
			},
		},
	};
	const graphPropsChild = {
		cc_wise_outstandings: {
			data        : viewGraphStats ? ccDataPoints : ccWiseList,
			heading     : 'CC Wise Outstanding',
			loading     : ccWiseLoading,
			isKamWise   : true,
			graphStyles : {
				legendPaddingTop: '10px',
			},
			listTitle: {
				nameTitle  : 'Credit Controller',
				valueTitle : 'Total Outstanding Amount',
			},
		},
	};
	const controls = overAllOutstandingcontrols();
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Filters
					controls={controls}
					filters={filters}
					setFilters={setFilters}
					clearFilter={clearFilter}
				/>

			</div>
			<OverallOutstandingStats item={statsData} statsLoading={statsLoading} />
			<div className={`${styles.overlay_container} overlay_section`}>
				{viewGraphStats && (
					<ScrollBar
						ref={ref}
						rightOffSet={RIGHT_OFF_SET}
						leftOffSet={LEFT_OFF_SET}
						left={ONLY_LEFT}
						right={!ONLY_LEFT}
					/>
				)}
				<div className={styles.scroll_container}>
					<div ref={ref}>
						<div className={`${styles.outstanding_card} overlay_section`}>
							<div className={styles.graph_div}>
								{Object.keys(graphPropsList || {}).map((singleGraphProp) => (
									<div key={singleGraphProp} className={styles.card}>
										<ResponsivePieChart
											{...(graphPropsList[singleGraphProp] || {})}
										/>
									</div>
								))}
							</div>
							<div className={styles.graph_div}>
								{Object.keys(graphPropsChild || {}).map((singleGraphProp) => (
									<div key={singleGraphProp} className={styles.card}>
										<ResponsivePieChart
											{...(graphPropsChild[singleGraphProp] || {})}
										/>
									</div>
								))}
								<div className={cl`${styles.cc_call_table} ${styles.card}`}>
									<CcCallList
										data={ccCommStats || []}
										loading={ccCommLoading}
										dateFilter={dateFilter}
										setDateFilter={setDateFilter}
										range={range}
										setRange={setRange}
									/>
								</div>
							</div>
						</div>
					</div>
					<div>
						{!viewGraphStats && (
							<div className={styles.overlay}>
								<Button
									onClick={() => setViewGraphStats(true)}
									className="primary md"
								>
									View
								</Button>
							</div>
						)}
					</div>
				</div>
				{viewGraphStats && (
					<ScrollBar
						ref={ref}
						rightOffSet={RIGHT_OFF_SET}
						leftOffSet={LEFT_OFF_SET}
						left={!ONLY_LEFT}
						right={ONLY_LEFT}
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
				handleInputReset={handleInputReset}
				queryKey={queryKey}
				entityCode={entityCode}
				refetch={refetch}
				callPriorityData={callPriorityData}
				callPriorityLoading={callPriorityLoading}
			/>
			{outstandingLoading ? (
				<div>
					{ [...Array(LOADER_LEN).keys()].map((key) => (
						<OrgLoader key={key} />
					))}
				</div>
			) : (
				<>
					{list?.map((item) => (
						<OutstandingList
							item={item}
							refetch={refetch}
							entityCode={entityCode}
							key={item?.serialId}
							showElement={false}
							orderBy={orderBy}
							outStandingFilters={outStandingFilters}
							formFilters={formFilters}
							organizationId={item?.organizationId}
							setSelectedOrgId={setSelectedOrgId}
						/>
					))}
					{isEmpty(list) && <div className={styles.empty_state}><EmptyState /></div>}
					{!isEmpty(list) && (totalRecords >= pageLimit) && (
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

export default OverAllOutstanding;
