import { Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMArrowRotateLeft,
	IcMArrowRotateDown,
	IcMOverview,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useInvoiceDetails from '../../hooks/useGetinvoiceTimeline';

import CancellationAgreement from './CancellationAgreement';
import Poc from './POC';
import styles from './styles.module.css';
import Timeline from './Timeline';
import UtrNumber from './UTRNumber';

const INVOICE_DATA_MAPPING = [
	{ id: '1', label: 'POC' },
	{ id: '2', label: 'Timeline' },
	{ id: '3', label: 'UTR Number' },
	{ id: '4', label: 'Cancellation Agreement' },
];
function InvoiceDetails({ item }) {
	const { loading, data, getInvoiceDetailsApi } = useInvoiceDetails({
		id: item?.id,
	});

	const [showDetailsCard, setShowDetailsCard] = useState(false);

	const [dropDownData, setDropDownData] = useState({});

	const handleShow = () => {
		setShowDetailsCard(true);
		getInvoiceDetailsApi();
		document.body.style.overflow = 'hidden';
	};

	const handleDropdown = (key = '') => {
		setDropDownData((previousActions:object) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
	};

	return (
		<>
			<div
				className={styles.icon_view}
				style={{ color: '#F68B21' }}
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

					<div className={styles.invoice_details_container} style={{ width: '35vw' }}>
						<div className={showDetailsCard ? styles.enter_left : styles.exit_left}>
							<div className={styles.content_caret}>
								<div
									className={styles.icon_container}
									onClick={() => {
										setShowDetailsCard(false);
										document.body.style.overflow = 'auto';
									}}
									role="presentation"
								>
									<IcMArrowRotateLeft />
								</div>

								<div className={styles.header_details}>
									INVOICE DETAILS -
									<span style={{ textDecorationLine: 'underline' }}>
										{item?.invoiceNumber}
									</span>
									{' '}
									- SID :-
									<span>
										{' '}
										{item?.sidNo}
									</span>
								</div>
							</div>

							<div className={styles.body_details}>
								{loading ? (
									<Placeholder
										className={styles.placeholder_container}
									/>
								) : (
									<div className={styles.body_details_card}>
										<div className={styles.invoice_card_data}>
											<div className={styles.supplier_data_header}>
												<span style={{ fontWeight: '600' }}>
													{item?.organizationName}
												</span>
												<div className={styles.tag_container}>
													{startCase(data?.invoicePartyType)}
												</div>
											</div>

											<div className={styles.supplier_data_body}>
												Invoice Amount -
												<span style={{ marginLeft: '4px' }}>
													{
														formatAmount({
															amount   : data?.summary?.grandTotal,
															currency : data?.summary?.currency,
															options  : {
																currencyDisplay       : 'code',
																maximumFractionDigits : 0,
																style                 : 'currency',
															},
														})
													}
												</span>
											</div>
											<div className={styles.supplier_data_body}>
												Ledger Amount -
												<span style={{ marginLeft: '4px' }}>
													{
														formatAmount({
															amount   : data?.summary?.ledgerTotal,
															currency : data?.summary?.ledgerCurrency,
															options  : {
																currencyDisplay       : 'code',
																maximumFractionDigits : 0,
																style                 : 'currency',
															},
														})
}
												</span>
											</div>
											<div className={styles.supplier_data_body}>
												Balance Amount -
												<span style={{ marginLeft: '4px' }}>
													{
														formatAmount({
															amount   : data?.summary?.balanceAmount,
															currency : data?.summary?.currency,
															options  : {
																currencyDisplay       : 'code',
																maximumFractionDigits : 0,
																style                 : 'currency',
															},
														})
}
												</span>
											</div>
										</div>
									</div>
								)}
								{loading ? (
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
															{label === 'POC' && (
																<Poc data={data} />
															)}
															{label === 'Timeline' && (
																<Timeline data={data} loading={loading} />
															)}
															{label === 'UTR Number' && (
																<UtrNumber eventData={data} />
															)}
															{label === 'Cancellation Agreement' && (
																<CancellationAgreement data={data} />
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

export default InvoiceDetails;
