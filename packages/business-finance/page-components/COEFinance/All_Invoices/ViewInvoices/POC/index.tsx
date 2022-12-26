import { Skeleton } from '@cogoport/front/components/admin';
import React,{ useState } from 'react';
import usei18n, { getFormattedPrice } from '@cogo/i18n';
import {
	IcMArrowRotateLeft,
	IcMArrowRotateDown,
	IcMOverview,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import POCTimeLine from './POCTimeLine';
import {
	InvoiceDetailsContainer,
	Container,
	InvoiceDetailsContainerBg,
	IconContainer,
	InvoiceCardData,
	Information,
	DropdownContainer,
	InformationData,
	HR,
	DataContainer,
	FadeInActionControls,
	IconView,
} from './styles';
import Profitability from './Profitability';
import CustomerInformation from './CustomerInformation';
import POCInformation from './POCInformation';
import useInvoiceDetails from './useInvoiceDetails';
import { INVOICE_DATA_MAPPING } from '../../../constants/constants';

function getNumber(labelValue) {
	if (Math.abs(Number(labelValue)) >= 1.0e9) {
		return `${(Math.abs(Number(labelValue)) / 1.0e9).toFixed(2)}B`;
	}
	if (Math.abs(Number(labelValue)) >= 1.0e6) {
		return `${(Math.abs(Number(labelValue)) / 1.0e6).toFixed(2)}M`;
	}
	if (Math.abs(Number(labelValue)) >= 1.0e3) {
		return `${(Math.abs(Number(labelValue)) / 1.0e3).toFixed(2)}K`;
	}
	return Math.abs(Number(labelValue));
}

const InvoiceDetails = ({ itemData, setDataList = () => {} }) => {
	const { numLocale } = usei18n();
	const {
		loading,
		invoiceData,
		timeLineData,
		timeLineLoading,
		profitabilityData,
		profitabilityLoading,
		supplierDetailsData,
		supplierDetailsLoading,
		getInvoiceDetailsApi,
		getTimeLineDetailsApi,
		getProfitabilityApi,
		getSupplierDetailsApi,
	} = useInvoiceDetails({
		id: itemData?.id,
		jobId: itemData?.jobId,
		serviceProviderId: itemData?.serviceProviderId,
		billId: itemData?.billId,
	});

	const [showDetailsCard, setShowDetailsCard] = useState(false);

	const [dropDownData, setDropDownData] = useState(false);

	const handleShow = () => {
		setShowDetailsCard(true);
		setDataList(itemData.id || itemData.billId);
		getInvoiceDetailsApi();
		getSupplierDetailsApi();
		getProfitabilityApi();
		document.body.style.overflow = 'hidden';
	};

	const handleDropdown = (key = '') => {
		setDropDownData((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
		if (key === '4') getTimeLineDetailsApi();
	};
	const {
		overallExpense,
		overallIncome,
		totalPayables,
		totalReceivable,
		totalCreditNoteAmount,
	} = invoiceData || {};

	const { invoiceNumber, jobNumber, billNumber, sid } = itemData || {};

	return (
		<>
			<IconView style={{ color: '#5936F0' }} onClick={handleShow}>
				<IcMOverview width={30} height={30} />
			</IconView>
			{showDetailsCard && (
				<>
					<InvoiceDetailsContainerBg />

					<InvoiceDetailsContainer style={{ width: '35vw' }}>
						<Container type={showDetailsCard ? 'enter' : 'exit'}>
							<div className="content-caret">
								<IconContainer
									onClick={() => {
										setShowDetailsCard(false);
										setDataList('');
										document.body.style.overflow = 'auto';
									}}
								>
									<IcMArrowRotateLeft />
								</IconContainer>

								<div className="header-details">
									INVOICE DETAILS -
									<span style={{ textDecorationLine: 'underline' }}>
										{invoiceNumber || billNumber}
									</span>
								</div>
							</div>

							<div className="body-details">
								{loading ? (
									<Skeleton
										margin="10px 0px 14px 25px"
										height="150px"
										width="492px"
										borderRadius="4px"
									/>
								) : (
									<div className="body-details_card01">
										<InvoiceCardData>
											<div className="supplier-data-header">
												<div>
													SID -
													<span
														style={{ fontWeight: '600', marginLeft: '4px' }}
													>
														{jobNumber || sid}
													</span>
												</div>
												<div>
													Bill Credit Note Worth - INR
													<span
														style={{ fontWeight: '600', marginLeft: '4px' }}
													>
														{getNumber(totalCreditNoteAmount)}
													</span>
												</div>
											</div>
											<div className="supplier-data">
												<div className="supplier-data-body">
													<div>
														Overall Expense
														<span style={{ marginLeft: '4px' }}>
															{getFormattedPrice(
																numLocale,
																overallExpense,
																'INR',
															)}
														</span>
													</div>
													<div>
														Total Payable
														<span style={{ marginLeft: '4px' }}>
															{getFormattedPrice(
																numLocale,
																totalPayables,
																'INR',
															)}
														</span>
													</div>
												</div>
												<div className="supplier-data-body">
													<div>
														Overall Income
														<span style={{ marginLeft: '4px' }}>
															{getFormattedPrice(
																numLocale,
																overallIncome,
																'INR',
															)}
														</span>
													</div>
													<div>
														Total Receivable
														<span style={{ marginLeft: '4px' }}>
															{getFormattedPrice(
																numLocale,
																totalReceivable,
																'INR',
															)}
														</span>
													</div>
												</div>
											</div>
										</InvoiceCardData>
									</div>
								)}
								{loading ? (
									<>
										<Skeleton
											margin="5px 0px 14px 25px"
											height="45px"
											width="492px"
											borderRadius="4px"
										/>
										<Skeleton
											margin="5px 0px 14px 25px"
											height="45px"
											width="492px"
											borderRadius="4px"
										/>
										<Skeleton
											margin="5px 0px 14px 25px"
											height="45px"
											width="492px"
											borderRadius="4px"
										/>
									</>
								) : (
									(INVOICE_DATA_MAPPING || [{}]).map((item) => {
										const { id, label } = item;

										return (
											<Information key={id}>
												<DataContainer
													onClick={() => {
														handleDropdown(id);
													}}
												>
													{label}
													<DropdownContainer>
														{dropDownData[id] ? (
															<IcMArrowRotateUp width={15} height={15} />
														) : (
															<IcMArrowRotateDown width={15} height={15} />
														)}
													</DropdownContainer>
												</DataContainer>

												{dropDownData[id] && <HR />}

												{dropDownData[id] && (
													<FadeInActionControls
														type={dropDownData ? 'enter' : 'exit'}
													>
														<InformationData>
															{label === 'Profitability' && (
																<Profitability
																	data={profitabilityData}
																	loading={profitabilityLoading}
																/>
															)}

															{label === 'Supplier Information' && (
																<POCInformation
																	data={supplierDetailsData}
																	loading={supplierDetailsLoading}
																/>
															)}

															{label === 'Customer Information' && (
																<CustomerInformation data={invoiceData} />
															)}

															{label === 'Invoice Timeline' && (
																<POCTimeLine
																	data={timeLineData}
																	loading={timeLineLoading}
																/>
															)}
														</InformationData>
													</FadeInActionControls>
												)}
											</Information>
										);
									})
								)}
							</div>
						</Container>
					</InvoiceDetailsContainer>
				</>
			)}
		</>
	);
};
export default InvoiceDetails;
