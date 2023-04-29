import { Placeholder } from '@cogoport/components';
import {
	IcMArrowRotateLeft,
	IcMArrowRotateDown,
	IcMArrowRotateUp,
	IcMArrowRotateRight,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

// eslint-disable-next-line import/no-cycle
import { DataInterface } from '..';
import { POC_DATA_MAPPING } from '../../../../constants/constant';
import usePOCDetails from '../../../../hook/usePOCDetails';

import CustomerInformation from './CustomerInformation/index';
import POCTimeLine from './POCTimeLine/index';
import styles from './styles.module.css';

interface Props {
	itemData: DataInterface;
}

function POCDetails({ itemData }: Props) {
	const { bill, job } = itemData || {};

	const {
		loading,
		invoiceData,
		timeLineData,
		timeLineLoading,
		getInvoiceDetailsApi,
		getTimeLineDetailsApi,
	} = usePOCDetails(bill?.id);

	const [showDetailsCard, setShowDetailsCard] = useState(false);

	const [dropDownData, setDropDownData] = useState(false);

	const handleShow = () => {
		setShowDetailsCard(true);
		getInvoiceDetailsApi();
		document.body.style.overflow = 'hidden';
	};

	const handleDropdown = (key = '') => {
		setDropDownData((previousActions: any) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));

		if (key === '2') getTimeLineDetailsApi();
	};

	const { jobNumber } = job || {};

	return (
		<>
			<div className={styles.icon_view}>
				<div
					className={styles.icon_container}
					onClick={handleShow}
					role="presentation"
				>
					<IcMArrowRotateRight width={20} height={20} />
				</div>
				<div
					className={styles.poc_container}
					onClick={handleShow}
					role="presentation"
				>
					POC & Other Details
				</div>
			</div>
			{showDetailsCard && (
				<>
					<div className={styles.invoice_details_container_bg} />

					<div
						className={styles.invoice_details_container}
						style={{ width: '35vw' }}
					>
						<div className={showDetailsCard ? styles.enter : styles.exit}>
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
									POC & Other Details - SID
									<span style={{ marginLeft: '4px' }}>{jobNumber}</span>
								</div>
							</div>

							<div className={styles.body_details}>
								{loading ? (
									<>
										<Placeholder
											margin="5px 0px 14px 25px"
											height="45px"
											width="492px"
										/>
										<Placeholder
											margin="5px 0px 14px 25px"
											height="45px"
											width="492px"
										/>
										<Placeholder
											margin="5px 0px 14px 25px"
											height="45px"
											width="492px"
										/>
									</>
								) : (
									(POC_DATA_MAPPING || [{}]).map((item) => {
										const { id, label } = item;

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
													<div className={styles.drop_down_container}>
														{dropDownData[id as keyof typeof dropDownData] ? (
															<IcMArrowRotateUp width={15} height={15} />
														) : (
															<IcMArrowRotateDown width={15} height={15} />
														)}
													</div>
												</div>

												{dropDownData[id as keyof typeof dropDownData] && (
													<div className={styles.hr} />
												)}

												{dropDownData[id as keyof typeof dropDownData] && (
													<div>
														<div className={styles.information_data}>
															{label === 'Customer Information' && (
																<CustomerInformation data={invoiceData} />
															)}

															{label === 'Timeline' && (
																<POCTimeLine
																	data={timeLineData}
																	loading={timeLineLoading}
																/>
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
export default POCDetails;
