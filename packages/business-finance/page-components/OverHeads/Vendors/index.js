/* eslint-disable max-lines-per-function */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, Input, Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMProvision,
	IcMCrossInCircle,
	IcMSearchlight,
	IcMFtick,
	IcMInfo,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Filter from '../../commons/Filters';
import showOverflowingNumber from '../../commons/showOverflowingNumber';
import { formatDate } from '../../commons/utils/formatDate';
import List from '../commons/List';

import CreateVendorModal from './CreateVendorModal';
import useListVendors from './hooks/useListVendors';
import useSendSyncOverHeadsVendor from './hooks/useSendSyncOverHeadsVendor';
import ShowMore from './ShowMore';
import styles from './styles.module.css';
import configs from './utils/config';
import vendorControls from './utils/controls';

function VenderComponent() {
	const router = useRouter();
	const geo = getGeoConstants();
	const val = geo.others.identification_number.label;

	const { VENDOR_CONFIG } = configs();

	const [filters, setFilters] = useState({
		paymentStatus : '',
		CATEGORY      : '',
		searchValue   : '',
		page          : 1,
		pageLimit     : 10,
	});

	const [sort, setSort] = useState({
		paymentSortType     : null,
		openInvoiceSortType : null,
		createdAtSortType   : null,
	});
	const [showModal, setShowModal] = useState(false);
	const { listData, loading } = useListVendors({ filters, sort });

	const handleChange = (e, value) => {
		setFilters((previousState) => ({
			...previousState,
			...{ [value]: e },
		}));
	};

	const handleClick = () => {
		router.push(
			'/onboard-vendor', // redirecting to VRM(create vendor)
		);
	};
	const { sendSyncOverHeadsVendor } = useSendSyncOverHeadsVendor();

	function RenderHeaders() {
		return (
			<div className={styles.header_container}>
				<div className={styles.left_container}>
					<Filter
						controls={vendorControls}
						filters={filters}
						setFilters={setFilters}
					/>
				</div>
				<div className={styles.right_container}>
					<Input
						size="sm"
						placeholder={`Search by Vendor Name/${val}/Organization ID/Sage ID`}
						suffix={<IcMSearchlight />}
						value={filters.searchValue}
						onChange={(e) => handleChange(e, 'searchValue')}
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
	}

	function RenderKYCStatus(item) {
		const { item: itemData = {} } = item;

		const { kycStatus = '' } = itemData;
		return (
			<div className={styles.vendorcontainer}>
				{kycStatus === 'VERIFIED' && (
					<div className={styles.verified}>
						<div>
							<IcMFtick color="#67C676" height={22} width={22} />
						</div>
						<div>Verified </div>
					</div>
				)}
				{kycStatus === 'REJECTED' && (
					<div className={styles.pending}>
						<div className={styles.icm_info}>
							<IcMCrossInCircle
								color="#e10d1f"
								height={14}
								width={14}
							/>
						</div>
						<div>Rejected</div>
					</div>
				)}
				{!['VERIFIED', 'REJECTED'].includes(kycStatus) ? (
					<div className={styles.pending}>
						<div className={styles.icm_info}>
							<IcMInfo color="#e10d1f" height={14} width={14} />
						</div>
						<div>Pending</div>
					</div>
				) : null}
			</div>
		);
	}

	function RenderPayments(item) {
		const { item: itemData = {} } = item;
		const {
			totalPaidAmount = 0,
			currentMonthPaidAmount = 0,
			currency = '',
		} = itemData;

		return (
			<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
				{formatAmount({
					amount  : totalPaidAmount,
					currency,
					options : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				})}
				{' '}
				<Tooltip
					content={`Current Month: ${formatAmount({
						amount  : currentMonthPaidAmount,
						currency,
						options : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}`}
					placement="top"
				>
					<IcMInfo />
				</Tooltip>
			</div>
		);
	}

	function RenderInvoice({ item = {} }) {
		const { openInvoices = 0, openInvoiceAmount = 0, currency = '' } = item;
		return (
			<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
				{formatAmount({
					amount  : openInvoiceAmount,
					currency,
					options : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				})}
				<div>
					(
					{openInvoices}
					)
				</div>
			</div>
		);
	}

	function RenderDropdown({ vendorId = '' }) {
		return <ShowMore vendorId={vendorId} />;
	}
	function RenderRefresh(itemData) {
		return (
			<IcMProvision
				onClick={() => { sendSyncOverHeadsVendor(itemData?.item); }}
				style={{ cursor: 'pointer' }}
				height={24}
				width={24}
				color="#F68B21"
			/>

		);
	}

	const functions = {
		renderKYCStatus: (itemData) => (
			<RenderKYCStatus item={itemData} />
		),
		renderPayments: (itemData) => (
			<RenderPayments item={itemData} />
		),
		renderInvoice: (itemData) => (
			<RenderInvoice item={itemData} />
		),
		renderRefresh: (itemData) => (
			<RenderRefresh item={itemData} />
		),
		renderName: (itemData) => {
			const { organizationName = '' } = itemData || {};
			return <div>{showOverflowingNumber(organizationName, 15)}</div>;
		},
		rendeDate: (itemData) => {
			const { createdAt } = itemData || {};
			return (
				<div>
					{formatDate(createdAt, 'dd MMM yyyy', {}, false) || ''}
				</div>
			);
		},
		renderCategory: (itemData) => {
			const { category = '' } = itemData || {};
			return <div>{category.replaceAll('_', ' ')}</div>;
		},
	};

	return (
		<div className={styles.vendor_container}>
			{RenderHeaders()}

			<List
				config={VENDOR_CONFIG}
				itemData={listData}
				loading={loading}
				sort={sort}
				setSort={setSort}
				functions={functions}
				handlePageChange={(pageValue) => {
					setFilters((p) => ({ ...p, page: pageValue }));
				}}
				page={filters?.page}
				showPagination
				renderDropdown={({ vendorId }) => <RenderDropdown vendorId={vendorId} />}
			/>

			{showModal && (
				<CreateVendorModal
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}
		</div>
	);
}

export default VenderComponent;
