import { Placeholder } from '@cogoport/components';
import {
	IcMArrowRotateDown,
	IcMOverview,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import useInvoiceDetails from '../../../../Invoices/hooks/useGetInvoiceTimeline';
import { INVOICE_DATA_MAPPING } from '../../../constants';

import CustomerData from './CustomerData';
import InvoiceInfo from './InvoiceInfo';
import ShowTimeLine from './ShowTimeLine';
import styles from './styles.module.css';
import SupplierData from './SupplierData';

const PLACEHOLDERS = 3;
const TIMELINEKEY = 2;

function InvoiceData({ item = {} }) {
	const {
		invoiceDetailsLoading = false,
		invoiceDetails = {},
		timeLineDetails = [],
		timeLineDetailsLoading = false,
		getInvoiceDetailsApi = () => {},
		getTimeLineDetailsApi = () => {},
		getProfitabilityApi = () => {},
		getSupplierDetailsApi = () => {},
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
		1 : <CustomerData data={invoiceDetails} />,
		2 : <ShowTimeLine
			data={timeLineDetails}
			loading={timeLineDetailsLoading}
		/>,
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
			{showDetailsCard ? (
				<>
					<div className={styles.invoice_details_container_bg} />
					<div className={styles.invoice_details_container}>
						<div className={styles.enter_left}>
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
										const { id, label } = items || {};
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
																{ComponentMappings[id]}
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
			) : null }
		</>
	);
}

export default InvoiceData;
