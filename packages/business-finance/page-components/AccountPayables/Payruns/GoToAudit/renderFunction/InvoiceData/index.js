import { Placeholder } from '@cogoport/components';
import geoConstants from '@cogoport/globalization/constants/geo';
import {
	IcMArrowRotateLeft,
	IcMArrowRotateDown,
	IcMOverview,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import getFormattedPrice from '../../../../../commons/utils/getFormattedPrice.ts';
import useInvoiceDetails from '../../../../Invoices/hooks/useGetInvoiceTimeline';
import { DETAILS, INVOICE_DATA_MAPPING } from '../../../constants';

import CustomerData from './CustomerData';
import ShowTimeLine from './ShowTimeLine';
import styles from './styles.module.css';

const PLACEHOLDERS = 3;
const TIMELINEKEY = '4';
const geo = geoConstants();

function InvoiceInfo({ billNumber = 0, sid = 0, setShowDetailsCard = () => {} }) {
	return (
		<div className={styles.content_caret}>
			<div
				className={styles.icon_container}
				onClick={() => {
					setShowDetailsCard(false);
				}}
				role="presentation"
			>
				<IcMArrowRotateLeft />
			</div>

			<div className={styles.header_details}>
				INVOICE DETAILS -
				<span style={{ textDecorationLine: 'underline' }}>
					{billNumber}
				</span>
				{' '}
				- SID :-
				<span>
					{sid}
				</span>
			</div>
		</div>
	);
}

function SupplierData({ item = {}, invoiceDetails = {} }) {
	return (
		<div className={styles.body_details_card}>
			<div className={styles.invoice_card_data}>
				<div className={styles.supplier_data_header}>
					<span style={{ fontWeight: '600' }}>
						Supplier Name :
					</span>
					<span style={{ fontWeight: '600' }}>
						{item?.organizationName}
					</span>
				</div>
				<div className={styles.flex}>
					{DETAILS?.map((detail) => (
						<div className={styles.supplier_data_body} key={detail.key}>
							<div>{detail?.label}</div>
							<div>
								{getFormattedPrice(
									invoiceDetails?.[detail?.key],
									geo.country.currency.code,
									{
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function InvoiceData({ item = {} }) {
	const {
		invoiceDetailsLoading,
		invoiceDetails,
		timeLineDetails,
		timeLineDetailsLoading,
		getInvoiceDetailsApi,
		getTimeLineDetailsApi,
		getProfitabilityApi,
		getSupplierDetailsApi,
	} = useInvoiceDetails(
		{
			id                : item?.id,
			serviceProviderId : item?.serviceProviderId,
			billId            : item?.billId,
			jobId             : item?.jobId,
			objectId          : item?.objectId || '',
		},
	);

	const [showDetailsCard, setShowDetailsCard] = useState(false);

	const [dropDownData, setDropDownData] = useState({});

	const handleShow = () => {
		setShowDetailsCard(true);
		getInvoiceDetailsApi();
		getSupplierDetailsApi();
		getProfitabilityApi();
	};

	const handleDropdown = (key = '') => {
		setDropDownData((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
		if (key === TIMELINEKEY) getTimeLineDetailsApi();
	};

	const { billNumber = '', sid = '' } = item || {};

	const ComponentMappings = {
		'Invoice Timeline': <ShowTimeLine
			data={timeLineDetails}
			loading={timeLineDetailsLoading}
		/>,
		'Customer Information': <CustomerData data={invoiceDetails} />,
	};

	return (
		<>
			<div
				className={styles.icon_view}
				onClick={handleShow}
				role="presentation"
			>

				<div>
					<IcMOverview width={24} height={24} />
				</div>

			</div>
			{showDetailsCard && (
				<>
					<div className={styles.invoice_details_container_bg} />
					<div className={styles.invoice_details_container}>
						<div className={showDetailsCard ? styles.enter_left : styles.exit_left}>
							{InvoiceInfo({
								billNumber,
								sid,
								setShowDetailsCard,
							})}
							<div className={styles.body_details}>
								{SupplierData({
									item,
									invoiceDetails,
								})}
								{invoiceDetailsLoading ? (
									[...Array(PLACEHOLDERS).keys()].map((key) => (
										<Placeholder
											key={key}
											className={styles.placeholder_container}
										/>
									))
								) : (
									(INVOICE_DATA_MAPPING || [{}]).map((items) => {
										const { id, label } = items;
										return (
											<div className={styles.information} key={id}>
												<div
													className={styles.data_container}
													onClick={() => {
														handleDropdown(id);
													}}
													role="presentation"
												>
													{label}
													<div className={styles.dropdown_container}>
														{dropDownData[id] ? (
															<IcMArrowRotateUp width={15} height={15} />
														) : (
															<IcMArrowRotateDown width={15} height={15} />
														)}
													</div>
												</div>
												{dropDownData[id] && (
													<>
														<div className={styles.hr} />
														<div
															className={dropDownData
																? styles.enter_down : styles.exit_down}
														>
															<div className={styles.information_data}>
																{ComponentMappings[label]}
															</div>
														</div>
													</>
												)}
											</div>
										);
									})
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default InvoiceData;
