import { Input, Pagination, Select } from '@cogoport/components';
import { IcMInfo, IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StyledTable from '../../../commons/StyledTable';
import useGetProfitabillityShipmentList from '../../hooks/getProfitabillityShipmentList';
import getProfitabillityColumn from '../../utils/getProfitabillityColumn';

import { jobsOptions } from './options';
import styles from './styles.module.css';

function Profitabillity({ globalFilters }) {
	const [filters, setFilters] = useState({});
	const [jobsFilters, setJobsFilters] = useState({ });
	const tab = [
		{
			key   : 'shipment',
			label : 'Shipment',
		},
		{
			key   : 'customer',
			label : 'Customer',
		},
	];
	const [tabs, setTabs] = useState('shipment');
	const {
		profitabillityData,
		profitabillityLoading,
		searchValue,
		setSearchValue,
	} = useGetProfitabillityShipmentList({ tabs, filters, setFilters, jobsFilters, globalFilters });

	const { pageIndex = 0, pageSize = 0, totalRecord, shipmentList = [], customerList = [] } = profitabillityData || {};

	const rest = { loading: profitabillityLoading };

	const columns = getProfitabillityColumn(tabs);

	return (

		<div className={styles.card}>
			<div className={styles.text_filters_gap}>
				<div className={styles.text_style}>
					Profitabillity
					<div className={styles.border} />
				</div>
				<div className={styles.icon}>
					<IcMInfo />
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.flex}>
					{tab.map((item) => (
						<div
							key={item?.key}
							onClick={() => { setTabs(item.key); }}
							role="presentation"
						>
							<div className={item.key === tabs ? styles.sub_container_click : styles.sub_container}>
								{item.label}
								{' '}
								{profitabillityData?.averageProfit}
							</div>
						</div>
					))}
				</div>

				<div className={styles.search}>
					<Select
						value={jobsFilters}
						onChange={(e: any) => setJobsFilters(e)}
						placeholder="Job Filters"
						options={jobsOptions}
						size="md"
						style={{ width: '250px' }}
					/>
					<Input
						name="q"
						size="sm"
						value={searchValue}
						onChange={(e: any) => setSearchValue(e)}
						placeholder="Search by SID/Booking Party Name.."
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchlight height={15} width={15} />
							</div>
						)}
					/>
				</div>
			</div>
			<div>
				<StyledTable
					data={tabs === 'shipment' ? shipmentList : customerList || []}
					columns={columns}
					imageFind="cfoDashboard"
					{...rest}
				/>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Pagination
						type="table"
						currentPage={pageIndex}
						totalItems={totalRecord}
						pageSize={pageSize}
						onPageChange={(pageValue: number) => {
							setFilters((p) => ({ ...p, pageIndex: pageValue }));
						}}

					/>
				</div>
			</div>

		</div>

	);
}

export default Profitabillity;
