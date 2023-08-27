import { Pagination, Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import EmptyState from '../../../commons/EmptyStateDocs';
import ccCallListTable from '../../configs/CC_Call_List_Table';
import { KAM_WISE_DATA, SERVICE_WISE_DATA, CC_WISE_DATA, CC_COMMUNICATION_DATA } from '../../constants/kam-wise-data';
import useGetKamWiseOutstandingsStats from '../../hooks/useGetKamWiseOutstandingsStats';
import useGetOrgOutstanding from '../../hooks/useGetOrgOutstanding';
import useGetSageArOutstandingsStats from '../../hooks/useGetSageArOustandingStats';
import useGetServiceWiseOutstandingsStats from '../../hooks/useGetServiceWiseOutstandingsStats';

import OutstandingFilter from './OutstandingFilter';
import OutstandingList from './OutstandingList';
import OrgLoader from './OutstandingList/OrgLoaders';
import OverallOutstandingStats from './OverallOutstandingStats';
import ResponsivePieChart from './ResponsivePieChart';
import ScrollBar from './ScrollBar';
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
	// const [viewGraphStats, setViewGraphStats] = useState(false);
	const { statsData, statsLoading } = useGetSageArOutstandingsStats({
		globalFilters: formFilters,
	});
	const ref = useRef(null);
	const RIGHT_OFF_SET = 2000;
	const LEFT_OFF_SET = -2000;
	console.log(entityCode, 'entityCode');
	const { kamWiseStats, kamWiseLoading } = useGetKamWiseOutstandingsStats({
		globalFilters: formFilters,
	});
	const { serviceWiseLoading } =	useGetServiceWiseOutstandingsStats({
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
	const KamDataPoints = (KAM_WISE_DATA || []).map((item, index) => ({
		id        : index,
		label     : item.kam_owners.slice(0, 36) || '-',
		sub_label : item.kam_owners || '-',
		value     : item.total_outstanding_amount || 0,
	}));
	const ServiceDataPoints = (SERVICE_WISE_DATA || []).map((item, index) => ({
		id        : index,
		label     : startCase(item.shipment_type) || '-',
		sub_label : startCase(item.shipment_type) || '-',
		value     : item.total_open_invoice_amount || 0,
	}));

	const ccDataPoints = (CC_WISE_DATA || []).map((item, index) => ({
		id        : index,
		label     : startCase(item.name) || '-',
		sub_label : startCase(item.name) || '-',
		value     : item.total_outstanding_amount || 0,
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
	const graphPropsChild = {
		cc_wise_outstandings: {
			data        : ccDataPoints,
			heading     : 'CC Wise Outstandings',
			// loading     : ccWiseLoading,
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
			<div className={`${styles.overlay_container} overlay_section`}>
				<div className={styles.scroll_container}>
					<div ref={ref}>
						<div className={`${styles.outstanding_card} overlay_section`}>
							<div style={{ display: 'flex', width: '100%', minWidth: '100%' }}>
								{Object.keys(graphPropsList || {}).map((singleGraphProp) => (
									<div key={singleGraphProp} style={{ width: '50%' }}>
										<ResponsivePieChart
											{...(graphPropsList[singleGraphProp] || {})}
										/>
									</div>
								))}
							</div>
							<div style={{
								display     : 'flex',
								width       : '50%',
								minWidth    : '50%',
								borderRight : '1px solid red',
							}}
							>
								{Object.keys(graphPropsChild || {}).map((singleGraphProp) => (
									<div key={singleGraphProp} style={{ width: '100%' }}>
										<ResponsivePieChart
											{...(graphPropsChild[singleGraphProp] || {})}
										/>
									</div>
								))}
							</div>
							<div style={{

								width     : '50%',
								minWidth  : '50%',
								maxHeight : '54vh',
								overflow  : 'auto',
							}}
							>
								<div style={{ fontWeight: 600, marginLeft: '10px' }}>CC Call Stats</div>
								<div style={{
									display: 'flex',
								}}
								>
									<Table columns={ccCallListTable()} data={CC_COMMUNICATION_DATA || []} />
								</div>
							</div>
						</div>
					</div>
					<div>

						<ScrollBar
							ref={ref}
							rightOffSet={RIGHT_OFF_SET}
							leftOffSet={LEFT_OFF_SET}
						/>

					</div>
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
