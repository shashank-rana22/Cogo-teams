import { Placeholder } from '@cogoport/components';
import { IcMArrowRotateDown, IcMOverview, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { INVOICE_DATA_MAPPING } from '../../../Constants';
import useInvoiceDetails from '../../../hooks/useGetInvoiceTimeline';

import InvoiceDetailsComp from './components/InvoiceDetailsComp';
import SupplierComp from './components/SupplierComp';
import CustomerInformation from './CustomerInformation';
import InvoiceTimeLine from './InvoiceTimeLine';
import Profitability from './Profitability';
import styles from './styles.module.css';
import SupplierInformation from './SupplierInformation';

const PLACEHOLDERS = 3;
const TIMELINEKEY = '4';

function InvoiceDetailsTimeLine({ item = {} }) {
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
			billId            : item?.billId || item?.id,
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

	const { invoiceNumber = '', jobNumber = '', billNumber = '', sid = '', objectNumber = '' } = item || {};

	const ComponentMappings = {
		Profitability: <Profitability
			data={profitabilityDetails}
			loading={profitabilityLoading}
		/>,
		'Invoice Timeline': <InvoiceTimeLine
			data={timeLineDetails}
			loading={timeLineDetailsLoading}
		/>,
		'Supplier Information': <SupplierInformation
			data={supplierDetails}
			loading={supplierDetailsLoading}
		/>,
		'Customer Information': <CustomerInformation data={invoiceDetails} />,
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
							<InvoiceDetailsComp
								setShowDetailsCard={setShowDetailsCard}
								objectNumber={objectNumber}
								invoiceNumber={invoiceNumber}
								billNumber={billNumber}
								jobNumber={jobNumber}
								sid={sid}
							/>
							<div className={styles.body_details}>
								<SupplierComp item={item} invoiceDetails={invoiceDetails} />
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

export default InvoiceDetailsTimeLine;
