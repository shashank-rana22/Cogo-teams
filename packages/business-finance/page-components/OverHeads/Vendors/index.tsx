/* eslint-disable no-mixed-spaces-and-tabs */
import { Select, Button, Input, Tooltip } from '@cogoport/components';
import { IcMCrossInCircle, IcMSearchlight, IcMFtick, IcMInfo } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import showOverflowingNumber from '../../commons/showOverflowingNumber';
import { formatDate } from '../../commons/utils/formatDate';
import List from '../commons/List';

import CreateVendorModal from './CreateVendorModal';
import useListVendors from './hooks/useListVendors';
import styles from './styles.module.css';
import VENDOR_CONFIG from './utils/config';
import Controls from './utils/controls';

interface ItemProps {
	createdDate?:String,
	venderSerialId?: Number,
	kycStatus?: String,
	name?: String,
	pan?: String,
	category?: String,
	payments?: Number,
	openInvoices?: Number,
	organizationName?:string,
	createdAt?:Date,
}

function VenderComponent() {
	const router = useRouter();

	const [filters, setFilters] = useState({
		KYC_STATUS  : '',
		CATEGORY    : '',
		searchValue : '',
		page        : 1,
		pageLimit   : 10,
	});

	const [sort, setSort] = useState({
		paymentSortType     : null,
		openInvoiceSortType : null,
		createdAtSortType   : null,
	});
	const [showModal, setShowModal] = useState(false);
	const [dropdownId, setDropdownId] = useState(null);
	const { listData, loading } = useListVendors({ filters, sort });

	const handleChange = (e:any, value:string | number) => {
		setFilters((previousState) => ({
			...previousState,
			...{ [value]: e },
		}));
	};

	const handleClick = () => {
		router.push(
			'/onboard-vendor',
		);
	};

	const renderHeaders = () => (
		<div className={styles.header_container}>
			<div className={styles.left_container}>
				{
                Object.keys(Controls).map((key) => {
                        	const { options = [], placeholder = '', value = '' } = Controls[key];
                        	return (
	<Select
		value={filters?.[key]}
		onChange={(e:any) => handleChange(e, value)}
		placeholder={placeholder}
		options={options}
		className={styles.select}
		isClearable
	/>
                	);
                })
                    }

			</div>
			<div className={styles.right_container}>
				<Input
					size="md"
					placeholder="Search by Vendor Name/PAN/Organization ID/Sage ID"
					suffix={<IcMSearchlight />}
					value={filters.searchValue}
					onChange={(e:any) => handleChange(e, 'searchValue')}
					className={styles.search}
				/>
				<Button
					size="lg"
					themeType="secondary"
					onClick={handleClick}
					className={styles.cta_button}
				>
					Create Vendor
				</Button>
			</div>
		</div>
	);

	function RenderKYCStatus(item:any) {
		const { item: itemData = {} } = item;

		const { kycStatus = '' } = itemData;
		return (
			<div style={{ display: 'flex', alignItems: 'center', width: '120px' }}>
				{kycStatus === 'VERIFIED' && 	(
					<div className={styles.verified}>
						<div>
							<IcMFtick
								color="#67C676"
								height={22}
								width={22}
							/>
						</div>
						<div>&nbsp;Verified </div>
					</div>
				)}
				{
                kycStatus === 'REJECTED'
				&& (
					<div className={styles.pending}>
						<div className={styles.icm_info}>
							<IcMCrossInCircle
								color="#e10d1f"
								height={14}
								width={14}
							/>

						</div>
						<div>
							Rejected
						</div>
					</div>
				)
				}
				{ kycStatus !== 'VERIFIED' && kycStatus !== 'REJECTED' && (
					<div className={styles.pending}>
						<div className={styles.icm_info}>
							<IcMInfo
								color="#e10d1f"
								height={14}
								width={14}
							/>
						</div>
						<div>
							Pending
						</div>
					</div>
				)}
			</div>
		);
	}

	function RenderPayments(item:any) {
		const { item: itemData = {} } = item;
		const { totalPaidAmount = 0, currentMonthPaidAmount = 0, currency = '' } = itemData;

		return (
			<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
				{totalPaidAmount}
				{' '}
				<Tooltip content={`Current Month: ${currency} ${currentMonthPaidAmount}`} placement="top">
					<IcMInfo />
				</Tooltip>
			</div>
		);
	}

	function RenderInvoice({ item }) {
		const { openInvoices = 0, openInvoiceAmount = 0, currency = '' } = item;
		return (
			<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
				{currency}
				{' '}
				{openInvoiceAmount}
				<div>
					(
					{openInvoices}
					)
				</div>
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
		renderName: (itemData:ItemProps) => {
			const { organizationName = '' } = itemData || {};
			return (
				<div>{showOverflowingNumber(organizationName, 15)}</div>
			);
		},
		rendeDate: (itemData:ItemProps) => {
			const { createdAt } = itemData || {};
			return (
				<div>
					{formatDate(createdAt, 'dd MMM yyyy', {}, false) || ''}
				</div>
			);
		},
		renderCategory: (itemData:ItemProps) => {
			const { category = '' } = itemData || {};
			return (
				<div>
					{category.replaceAll('_', ' ')}
				</div>
			);
		},
	};

	return (
		<div className={styles.vendor_container}>
			{renderHeaders()}

			<List
				config={VENDOR_CONFIG}
				itemData={listData}
				loading={loading}
				sort={sort}
				setSort={setSort}
				functions={functions}
				handlePageChange={(pageValue:number) => {
					setFilters((p) => ({ ...p, page: pageValue }));
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
