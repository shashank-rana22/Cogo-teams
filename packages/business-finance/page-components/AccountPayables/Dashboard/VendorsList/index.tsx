import { Select, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StyledTable from '../commons/StyledTable';
import useGetBySupplier from '../hooks/useGetBySupplier';

import styles from './styles.module.css';
import VendorsColumn from './vendorsColumn';

const OPTIONS = [
	{
		value : 'shipping_line',
		label : 'Shipping Line',
	},
	{
		value : 'airline',
		label : 'Airline',
	},
	{
		value : 'nvocc',
		label : 'NVOCC',
	},
	{
		value : 'iata',
		label : 'IATA',
	},
	{
		value : 'customs_service_provider',
		label : 'Customs',
	},
	{
		value : 'transporter',
		label : 'Transporter',
	},
	{
		value : 'freight_forwarder',
		label : 'Freight Forwarder',
	},
	{
		value : 'other',
		label : 'Other',
	},
];

function VendorsList() {
	const [showVendorsList, setShowVendorsList] = useState(undefined);

	const { data, loading } = useGetBySupplier({ showVendorsList });
	const { list = [] } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Top 10 Vendors
						<div className={styles.hr} />
					</div>
					<Tooltip placement="top" content="Top 10 outstanding payments of vendors ">
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.segmented_filter}>
					<Select
						name="category"
						value={showVendorsList}
						onChange={setShowVendorsList}
						options={OPTIONS}
						size="sm"
						isClearable
						placeholder="Category"
					/>
				</div>
			</div>
			<StyledTable data={list} columns={VendorsColumn} loading={loading} />
		</div>
	);
}

export default VendorsList;
