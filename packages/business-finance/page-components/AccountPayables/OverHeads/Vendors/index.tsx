import { Select, Button, Input, Tooltip } from '@cogoport/components';
import { IcMSearchlight, IcMFtick, IcMInfo } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import List from '../../commons/List';

import CreateVendorModal from './CreateVendorModal';
import useListVendors from './hooks/useListVendors';
import styles from './styles.module.css';
import VENDOR_CONFIG from './utils/config';
import Controls from './utils/controls';
import dummyData from './utils/data';

interface ItemProps {
	createdDate:String,
	venderSerialId: Number,
	kycStatus: String,
	name: String,
	pan: String,
	category: String,
	payments: Number,
	openInvoices: Number,
}

function VenderComponent() {
	const [filters, setFilters] = useState({
		KYC_STATUS  : '',
		CATEGORY    : '',
		searchValue : '',
		pageIndex   : 1,
		pageLimit   : 10,
	});
	const [sort, setSort] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [dropdownId, setDropdownId] = useState(null);
	const { loading = false, data, listApi = () => {} } = useListVendors();

	const handleChange = (e, value) => {
		setFilters((previousState) => ({
			...previousState,
			...{ [value]: e },
		}));
	};

	useEffect(() => {
		listApi(filters);
	}, [filters]);

	const renderHeaders = () => (
		<div className={styles.headerContainer}>
			<div className={styles.leftContainer}>
				{
                        Object.keys(Controls).map((key) => {
                        	const { options = [], placeholder = '', value = '' } = Controls[key];
                        	return (
	<Select
		value={filters?.[key]}
		onChange={(e) => handleChange(e, value)}
		placeholder={placeholder}
		options={options}
		className={styles.select}
		isClearable
	/>
                        	);
                        })
                    }

			</div>
			<div className={styles.rightContainer}>
				<Input
					size="md"
					placeholder="Search by Vendor Name/PAN/Organization ID/Sage ID"
					suffix={<IcMSearchlight />}
					value={filters.searchValue}
					onChange={(e) => handleChange(e, 'searchValue')}
					className={styles.search}
				/>
				<Button
					size="lg"
					themeType="secondary"
					onClick={() => setShowModal(true)}
					style={{ border: '1px solid black', fontSize: '14px' }}
				>
					Create Vendor
				</Button>
			</div>
		</div>
	);

	function RenderKYCStatus(item) {
		const { item: itemData = {} } = item;
		const { kycStatus = '' } = itemData;
		return (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{ kycStatus === 'verified' ? (
					<div className={styles.verified}>
						<div>
							{' '}
							<IcMFtick color="#67C676" />
							{' '}
						</div>
						<div>&nbsp;Verified </div>
					</div>
				)
                	: (
	<div className={styles.pending}>
		<div><IcMInfo color="#e10d1f" style={{ rotate: '180deg', fontSize: '12px' }} /></div>
		<div>&nbsp;Pending</div>
	</div>
					)}
			</div>
		);
	}

	function RenderPayments(item) {
		const { item: itemData = {} } = item;
		const { payments = '' } = itemData;
		return (
			<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
				{payments}
				{' '}
				<Tooltip content="Current Month: " placement="top">
					<IcMInfo />
				</Tooltip>
			</div>
		);
	}

	function RenderInvoice({ item }) {
		const { item: itemData = {} } = item;
		const { openInvoices = '' } = itemData;
		return (
			<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
				{openInvoices}
				{' '}
				<div> (INR 12000) </div>
			</div>
		);
	}

	function RenderViewMoreButton({ item }) {
		return (
			<Button
				themeType="secondary"
				size="md"
				onClick={() => {
               	setDropdownId(item?.vendorSerialId);
				}}
				style={{ border: '1px solid' }}
			>
				View More
			</Button>
		);
	}

	const renderDropdown = (id:string | number = '') => {
		if (id === dropdownId) {
			return <h1>hey there</h1>;
		}
		return null;
	};

	const functions:any = {
		renderKYCStatus: (itemData:ItemProps) => (
			<RenderKYCStatus item={itemData} />
		),
		renderPayments: (itemData:ItemProps) => (
			<RenderPayments item={itemData} />
		),
		renderInvoice: (itemData:ItemProps) => (
			<RenderInvoice item={itemData} />
		),
		renderViewMoreButton: (itemData:ItemProps) => (
			<RenderViewMoreButton item={itemData} />
		),
	};

	return (
		<div>
			{renderHeaders()}

			<List
				config={VENDOR_CONFIG}
				itemData={dummyData}
				loading={false}
				sort={sort}
				setSort={setSort}
				functions={functions}
				page={filters.pageIndex || 1}
				handlePageChange={(pageValue:number) => {
                	setFilters((p) => ({ ...p, pageIndex: pageValue }));
				}}
				showPagination
				renderDropdown={(id) => renderDropdown(id)}
			/>

			{
                showModal && <CreateVendorModal showModal={showModal} setShowModal={setShowModal} />
            }
		</div>
	);
}

export default VenderComponent;
