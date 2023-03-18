import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import SegmentedControl from '../../../commons/SegmentedControl';
import StyledTable from '../commons/StyledTable';

import styles from './styles.module.css';
import VendorsColumn from './vendorsColumn';

const OPTIONS = [
	{
		label : 'Overseas',
		value : 'OVERSEAS',
	},
	{
		label : 'NVOCC',
		value : 'NVOCC',
	},
	{
		label : 'Ocean',
		value : 'OCEAN',
	},
	{
		label : 'Air',
		value : 'AIR',
	},
	{
		label : 'Surface',
		value : 'SURFACE',
	},
];

const list = [
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
	{
		vendorName    : 'jaiprakash',
		amount        : 'INR 30,00,000',
		invoicesCount : '8',
	},
];

interface ItemProps {
	showVendorsList:string;
	setShowVendorsList:Function;
}

function VendorsList({ showVendorsList, setShowVendorsList }:ItemProps) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Top 10 Vendors
						<div className={styles.hr} />
					</div>
					<Tooltip placement="top" content="jaiprakash">
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.segmented_filter}>
					<SegmentedControl
						options={OPTIONS}
						activeTab={showVendorsList}
						setActiveTab={setShowVendorsList}
						color="#ED3726"
						background="#FFFAEB"
					/>
				</div>
			</div>
			<StyledTable data={list} columns={VendorsColumn} />
		</div>
	);
}

export default VendorsList;
