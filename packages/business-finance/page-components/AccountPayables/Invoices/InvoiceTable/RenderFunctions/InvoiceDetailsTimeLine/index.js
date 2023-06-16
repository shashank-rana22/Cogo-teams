import { Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import geoConstants from '@cogoport/globalization/constants/geo';
import {
	IcMArrowRotateLeft,
	IcMArrowRotateDown,
	IcMOverview,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import useInvoiceDetails from '../../../hooks/useGetInvoiceTimeline';

import CustomerInformation from './CustomerInformation';
import InvoiceTimeLine from './InvoiceTimeLine';
import Profitability from './Profitability';
import styles from './styles.module.css';
import SupplierInformation from './SupplierInformation';

const geo = geoConstants();
function InvoiceDetailsTimeLine({ item }) {
	const {
		invoiceDetailsLoading,
		invoiceDetails,
		timeLineDetails,
		timeLineDetailsLoading,
		profitabilityDetails,
		profitabilityLoading,
		supplierDetails,
		supplierDetailsLoading,
		getInvoiceDetailsApi,
		getTimeLineDetailsApi,
		getProfitabilityApi,
		getSupplierDetailsApi,
	} = useInvoiceDetails(
		{
			id                : item?.id,
			serviceProviderId : item?.serviceProviderId,
			billId            : item?.id,
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
		if (key === '4') getTimeLineDetailsApi();
	};

	const INVOICE_DATA_MAPPING = [
		{ id: '1', label: 'Profitability' },
		{ id: '2', label: 'Supplier Information' },
		{ id: '3', label: 'Customer Information' },
		{ id: '4', label: 'Invoice Timeline' },
	];

	const DETAILS = [
		{ label: 'Overall Expense', key: 'overallExpense' },
		{ label: 'Total Payables', key: 'totalPayables' },
		{ label: 'Overall Income', key: 'overallIncome' },
		{ label: 'Total Receivable', key: 'totalReceivable' },
	];

	const { invoiceNumber, jobNumber, billNumber, sid, objectNumber } =	item || {};

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
										{objectNumber || invoiceNumber || billNumber}
									</span>
									{' '}
									- SID :-
									<span>
										{jobNumber || sid}
									</span>
								</div>
							</div>

							<div className={styles.body_details}>
								{invoiceDetailsLoading ? (
									<Placeholder
										className={styles.placeholder_container}
									/>
								) : (
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
								)}
								{invoiceDetailsLoading ? (
									<>
										<Placeholder className={styles.placeholder_container} />
										<Placeholder className={styles.placeholder_container} />
										<Placeholder className={styles.placeholder_container} />
									</>
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

												{dropDownData[id] && <div className={styles.hr} />}

												{dropDownData[id] && (
													<div
														className={dropDownData ? styles.enter_down : styles.exit_down}
													>
														<div className={styles.information_data}>
															{label === 'Profitability' && (
																<Profitability
																	data={profitabilityDetails}
																	loading={profitabilityLoading}
																/>
															)}
															{label === 'Invoice Timeline' && (
																<InvoiceTimeLine
																	data={timeLineDetails}
																	loading={timeLineDetailsLoading}
																/>
															)}
															{label === 'Supplier Information' && (
																<SupplierInformation
																	data={supplierDetails}
																	loading={supplierDetailsLoading}
																/>
															)}
															{label === 'Customer Information' && (
																<CustomerInformation data={invoiceDetails} />
															)}
														</div>
													</div>
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

export default InvoiceDetailsTimeLine;
