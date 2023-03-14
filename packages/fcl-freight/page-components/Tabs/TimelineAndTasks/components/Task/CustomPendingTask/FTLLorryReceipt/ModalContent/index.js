import { useState, createRef, useEffect } from 'react';
import RadioGroup from '@cogoport/front/components/RadioGroup';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { Button } from '@cogoport/front/components/admin';
import { useRequest } from '@cogo/commons/hooks';
import { Loader } from '@cogoport/front/components';
import { IcMCall } from '@cogoport/icons-react';
import getGeoConstants from '@cogo/globalization/constants/geo';

import {
	StyledCheckbox,
	Page,
	Block,
	Flex,
	FlexC,
	InnerDiv,
	PinDiv,
	Icon,
	PhoneInput,
	GSTInput,
	PINInput,
	Text,
	LoadingStyle,
} from './styles';
import { HeaderPart } from './HeaderPart';
import { ExtraHardCode } from './ExtraHardCode';
import { Footer } from './Footer';

const geo = getGeoConstants();
const ModalContent = ({
	data,
	id,
	lrData,
	setValues = () => {},
	finalDoc,
	setShow = () => {},
}) => {
	const [creditchecked, setCreditChecked] = useState(false);
	const [paidchecked, setPaidChecked] = useState(false);
	const [topaychecked, setToPayChecked] = useState(false);
	const [invoicechecked, setInvoiceChecked] = useState(false);
	const [ewaybillchecked, setEWayBillChecked] = useState(false);
	const serviceType = 'ftl';
	const riskType = '';

	const [fileUrl, setFileUrl] = useState('');
	const ref = createRef(null);

	const requestPDF = useRequest(
		'post',
		false,
		'public',
	)(
		'https://vmoiuzda31.execute-api.ap-south-1.amazonaws.com/production/generate_from_html',
	);

	const handleClick = async () => {
		const document1 = document;
		const element1 = document1.getElementById('remove-button');
		element1.remove();
		const element2 = document1.getElementById('ui-fullscreen-modal').firstChild
			.firstChild;
		element2.remove();
		const html = document1.documentElement.innerHTML;

		const res = await requestPDF.trigger({
			data: {
				html,
				configs: {
					format: 'A4',
					pageRanges: '1-1',
					scale: 0.6,
				},
			},
		});

		if (!res?.hasError) {
			setFileUrl(res?.data?.pdf_url);
			setShow(false);
		}
	};

	if (fileUrl?.length > 1) {
		const newDoc = [...finalDoc];
		newDoc[id].url = {
			name: `lorry_receipt_${id}_${Date.now()}.pdf`,
			success: true,
			url: fileUrl,
		};
		setValues({
			documents: newDoc,
		});
	}

	const OPTIONS = [
		{
			label: 'SUPERAIR ',
			value: 'superair',
		},
		{
			label: 'SUPERXPRESS ',
			value: 'superxpress',
		},
		{
			label: 'FTL ',
			value: 'ftl',
		},
		{
			label: 'RAIL ',
			value: 'rail',
		},
	];

	const OPTION = [
		{
			label: 'SHIPPER RISK',
			value: 'shipperrisk',
		},
		{
			label: 'CARRIER RISK',
			value: 'carrierrisk',
		},
	];
	useEffect(() => {
		setEWayBillChecked(!!data?.amount_data?.eway_bill);
		setInvoiceChecked(!!data?.amount_data?.invoice_number);
	}, [data?.amount_data?.eway_bill, data?.amount_data?.invoice_number]);

	const container_details = [
		[
			'BOOKING DATE',
			formatDate({
				date: data?.booking_date,
				dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType: 'date',
			}),
		],
		['DECLARED DEAD WT (KGS)', ''],
		['ACTUAL DEAD WT (KGS)', ''],
		['CHARGED WT(KGS)', data?.service_provider_data?.weight],
		['VEHICLE NO.', lrData[id]?.service_id?.split(':')[0]],
		['CONTAINER NO.', ''],
		['FLOOR DELIVERY', ''],
	];
	const particulars_amount = [
		['PARTICULARS', `AMOUNT(${geo.country.currency.code})`],
		[
			'FREIGHT',
			data &&
				data?.amount_data?.amount[lrData[id].service_id.split(':')[0]]?.BAS,
		],
		['DKT CHARGE', ''],
		[
			'FUEL SURCHARGE',
			data?.amount_data?.amount[lrData[id].service_id.split(':')[0]]?.FSC,
		],
		['ROV FOV', ''],
		['ODA/ESS SURCHARGE', ''],
		[
			'BASE TOTAL',
			data?.amount_data?.amount[lrData[id].service_id.split(':')[0]]
				?.base_total,
		],
		[
			'GST',
			data?.amount_data?.amount[lrData[id].service_id.split(':')[0]]?.tax_total,
		],
		[
			'GRAND TOTAL',
			data?.amount_data?.amount[lrData[id].service_id.split(':')[0]]
				?.grand_total,
		],
	];
	const container_detail_blocks = container_details.map((container) => {
		return (
			<Flex style={{ flex: 1 }}>
				<Block style={{ width: '50%' }}>
					<div>{container[0]}</div>
				</Block>
				<Block style={{ width: '50%' }}>
					<div>{container[1]}</div>
				</Block>
			</Flex>
		);
	});
	const particulars_amount_blocks = particulars_amount.map((container) => {
		return (
			<Flex>
				<Block className="amount_info">
					<div>{container[0]}</div>
				</Block>
				<Block
					style={{ width: '50%', padding: '15px 6px' }}
					className="bold-font"
				>
					<div style={{ height: '100%' }}>{container[1]}</div>
				</Block>
			</Flex>
		);
	});
	const appointment_detail_rows = [...Array(9)].map(() => {
		return (
			<Flex>
				<Block style={{ width: '10%', padding: '3px 6px' }}>&nbsp;</Block>
				<Block style={{ width: '10%', padding: '3px 6px' }}>&nbsp;</Block>
				<Block style={{ width: '10%', padding: '3px 6px' }}>&nbsp;</Block>
				<Block style={{ width: '15%', padding: '3px 6px' }}>&nbsp;</Block>
				<Block style={{ width: '20%', padding: '3px 6px' }}>&nbsp;</Block>
				<Block style={{ width: '20%', padding: '3px 6px' }}>&nbsp;</Block>
				<Block style={{ width: '15%', padding: '3px 6px' }}>&nbsp;</Block>
			</Flex>
		);
	});

	return (
		<>
			{requestPDF.loading && (
				<LoadingStyle>
					<Loader />
				</LoadingStyle>
			)}
			<div id="page">
				<Page ref={ref}>
					<div className="trade-doc-inner-page">
						<HeaderPart data={data} lrData={lrData} id={id} />
						<Flex>
							<FlexC style={{ width: '82%' }}>
								<Block className="sp_info">
									<div>GST NO.: {data?.service_provider_data?.GST}</div>
									<div>
										TRANSPORTER ID: {data?.service_provider_data?.serial_id}
									</div>
									<div>PAN: {data?.service_provider_data?.pan}</div>
								</Block>
								<Flex>
									<Flex style={{ width: '50%' }}>
										<Block style={{ width: '30%' }} className="bold-font">
											<div style={{ height: '100%' }}>SHIPPER/CONSIGNOR</div>
										</Block>
										<Block style={{ width: '70%' }}>
											<div style={{ height: '100%' }}>
												<span className="bold-font">ORIGIN: </span>
												{data?.origin}
											</div>
										</Block>
									</Flex>
									<Flex style={{ width: '50%' }}>
										<Block style={{ width: '30%' }} className="bold-font">
											RECEIVER/CONSIGNEE
										</Block>
										<Block style={{ width: '70%' }}>
											<span className="bold-font">DESTINATION: </span>
											{data?.destination}
										</Block>
									</Flex>
								</Flex>
								<Flex>
									<Block style={{ width: '50%' }}>
										<span className="bold-font">NAME - </span>
										{data?.shipper_data?.name}
									</Block>
									<Block style={{ width: '50%' }}>
										<span className="bold-font">NAME - </span>
										{data?.receiver_data?.name}
									</Block>
								</Flex>
								<Flex>
									<Block style={{ width: '50%' }}>
										<span className="bold-font">ADDRESS - </span>
										{data?.shipper_data?.address}
									</Block>
									<Block style={{ width: '50%' }}>
										<span className="bold-font">ADDRESS - </span>
										{data?.receiver_data?.address}
									</Block>
								</Flex>
								<Flex style={{ flex: 1 }}>
									<FlexC className="contact_info">
										<Flex className="contact_info_space">
											<div>
												<InnerDiv>
													<Icon>
														<IcMCall />
													</Icon>
													<PhoneInput
														maxLength="10"
														value={data?.shipper_data?.contact_number}
													/>
												</InnerDiv>
											</div>
											<div>
												<PinDiv>
													<Text className="bold-font">PIN</Text>
													<PINInput
														maxLength="6"
														value={data?.shipper_data?.pincode}
													/>
												</PinDiv>
											</div>
										</Flex>

										<div>
											<InnerDiv>
												<Icon className="bold-font">GST</Icon>
												<GSTInput
													maxLength="15"
													value={data?.shipper_data?.GST}
												/>
											</InnerDiv>
										</div>
									</FlexC>
									<FlexC className="contact_info">
										<Flex className="contact_info_space">
											<div>
												<InnerDiv>
													<Icon>
														<IcMCall />
													</Icon>
													<PhoneInput
														maxLength="10"
														value={data?.receiver_data?.contact_number}
													/>
												</InnerDiv>
											</div>
											<div>
												{' '}
												<PinDiv>
													<Text className="bold-font">PIN</Text>
													<PINInput
														maxLength="6"
														value={data?.receiver_data?.pincode}
													/>
												</PinDiv>
											</div>
										</Flex>

										<div>
											<InnerDiv>
												<Icon className="bold-font">GST</Icon>
												<GSTInput
													maxLength="15"
													value={data?.receiver_data?.GST}
												/>
											</InnerDiv>
										</div>
									</FlexC>
								</Flex>
							</FlexC>
							<FlexC style={{ width: '18%' }}>
								{container_detail_blocks.map((element) => {
									return element;
								})}
							</FlexC>
						</Flex>
						<Flex>
							<FlexC style={{ width: '30%' }}>
								<Block>
									<h3>BILLING PARTY NAME</h3>
								</Block>
								<Flex>
									<div style={{ width: '60%' }}>
										<Block>TYPE OF PACKAGING</Block>
										<Flex>
											<Block style={{ width: '32%' }}>CARTON</Block>
											<Block style={{ width: '18%' }} />
											<Block style={{ width: '32%' }}>DRUM</Block>
											<Block style={{ width: '18%' }} />
										</Flex>
										<Flex>
											<Block style={{ width: '32%' }}>BAG</Block>
											<Block style={{ width: '18%' }} />
											<Block style={{ width: '32%' }}>PALLET</Block>
											<Block style={{ width: '18%' }} />
										</Flex>
										<Flex>
											<Block style={{ width: '32%' }}>WOODEN BOX</Block>
											<Block style={{ width: '18%' }} />
											<Block style={{ width: '32%' }}>OTHERS</Block>
											<Block style={{ width: '18%' }} />
										</Flex>
									</div>
									<FlexC style={{ width: '40%' }}>
										<Block>NO. OF PACKAGES</Block>
										<Block style={{ flex: 1 }}>
											{' '}
											{data?.service_provider_data?.packages_count}
										</Block>
									</FlexC>
								</Flex>
								<Block className="background-color">
									<div style={{ textAlign: 'center' }} className="bold-font">
										GOOD MOVEMENT ORDER
									</div>
									<div>
										<RadioGroup options={OPTION} value={riskType} />
									</div>
								</Block>
								<Block className="background-color">
									<div>
										<RadioGroup options={OPTIONS} value={serviceType} />
									</div>
								</Block>
								<Block>
									<br />
									Content:
								</Block>
								<Block style={{ padding: '15px 6px' }}>
									I/We hereby agree to the terms of carriage and have read and
									accepted the clauses mentioned in the front and rear of this
									consignor copy.
								</Block>
								<Block className="footer_instruction">
									<div className="bold-font">SHIPPER&apos;S SIGNATURE</div>
									<div>SPECIAL INSTRUCTION (IF ANY)</div>
								</Block>
							</FlexC>
							<FlexC style={{ width: '40%' }}>
								<Block>
									<h3>APPOINTMENT DETAILS</h3>
								</Block>
								<Flex style={{ fontSize: '10px' }}>
									<div style={{ width: '30%' }}>
										<Block style={{ textAlign: 'center' }}>CMS</Block>
										<Flex>
											<div style={{ width: '33.33%' }}>
												<Block style={{ textAlign: 'center' }}>L</Block>
											</div>
											<div style={{ width: '33.33%' }}>
												<Block style={{ textAlign: 'center' }}>B</Block>
											</div>
											<div style={{ width: '33.33%' }}>
												<Block style={{ textAlign: 'center' }}>H</Block>
											</div>
										</Flex>
									</div>
									<Block style={{ width: '15%', textAlign: 'center' }}>
										No Of PKGS
									</Block>
									<div style={{ width: '40%' }}>
										<Block style={{ textAlign: 'center' }}>Dead Wt</Block>
										<Flex>
											<Block style={{ width: '50%', textAlign: 'center' }}>
												Declared Wt
											</Block>
											{/* <div style={{ width: '50%' }}> */}
											<Block style={{ width: '50%', textAlign: 'center' }}>
												Actual Wt
											</Block>
										</Flex>
									</div>
									<Block style={{ width: '15%', textAlign: 'center' }}>
										Volume Wt
									</Block>
								</Flex>
								<div style={{ fontSize: '10px' }}>
									{appointment_detail_rows.map((e) => {
										return e;
									})}
								</div>
								<Flex>
									<Block style={{ width: '45%' }} className="bold-font">
										Total
									</Block>
									<Block style={{ width: '20%' }}>&nbsp;</Block>
									<Block style={{ width: '20%' }}>&nbsp;</Block>
									<Block style={{ width: '15%' }}>&nbsp;</Block>
								</Flex>
								<Block className="bold-font background-color">
									<Flex>
										<div>Document Enclose:</div>
										<Flex
											style={{
												flex: 1,
												justifyContent: 'space-evenly',
											}}
										>
											<Flex>
												PerformaInvoice
												<StyledCheckbox checked={invoicechecked} />
											</Flex>
											<Flex>
												E-Way Bill
												<StyledCheckbox checked={ewaybillchecked} />
											</Flex>
										</Flex>
									</Flex>
								</Block>
								<Flex>
									<Block style={{ width: '30%' }} className="background-color">
										<div>INVOICE NO.</div>
									</Block>
									<Block style={{ width: '70%' }}>
										<div>{data?.amount_data?.invoice_number}</div>
									</Block>
								</Flex>
								<Flex>
									<Block style={{ width: '30%' }} className="background-color">
										<div>DECLARED VALUE</div>
									</Block>
									<Block style={{ width: '70%' }}>
										<div>&nbsp;</div>
									</Block>
								</Flex>
								<Flex>
									<Block style={{ width: '30%' }} className="background-color">
										<div>E-WAY BILL NO.</div>
									</Block>
									<Block style={{ width: '70%' }}>
										<div>{data?.amount_data?.eway_bill}</div>
									</Block>
								</Flex>
								<Block style={{ textAlign: 'center' }} className="bold-font">
									RECEIVER&apos;S SIGNATURE, STAMP AND COMMENTS
								</Block>
								<Block>
									<p className="bold-font">NAME</p>
									<Flex>
										<div style={{ width: '50%' }} className="bold-font">
											TIME
										</div>
										<div style={{ width: '50%' }} className="bold-font">
											DATE
										</div>
									</Flex>
								</Block>
								<Block className="footer">DOOR TO DOOR DOMESTIC CARGO</Block>
							</FlexC>
							<FlexC style={{ width: '30%' }}>
								<Flex>
									<div style={{ width: '67%' }}>
										{particulars_amount_blocks.map((element) => {
											return element;
										})}
									</div>
									<FlexC
										style={{
											width: '33%',
											fontWeight: 'bold',
										}}
										className="bold-font"
									>
										<Block style={{ padding: '15px 6px' }}>FREIGHT MODE</Block>
										<Block className="freight_mode">
											<StyledCheckbox
												checked={creditchecked}
												onChange={setCreditChecked}
											/>
											<p>CREDIT/ BILLING</p>
										</Block>
										<Block className="freight_mode">
											<StyledCheckbox
												checked={paidchecked}
												onChange={setPaidChecked}
											/>
											<p>PAID</p>
										</Block>
										<Block className="freight_mode">
											<StyledCheckbox
												checked={topaychecked}
												onChange={setToPayChecked}
											/>
											<p>TO PAY</p>
										</Block>
									</FlexC>
								</Flex>
								<Block className="cogosign">
									<div style={{ textAlign: 'end' }}>
										For Cogoport Private Limited
									</div>
									<div>NAME:</div>
									<div>SIGNATURE:</div>
								</Block>
							</FlexC>
						</Flex>
						<Footer />
					</div>
					<ExtraHardCode />
				</Page>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '10px',
					}}
				>
					<Button
						onClick={() => handleClick()}
						className="primary md"
						id="remove-button"
					>
						Submit
					</Button>
				</div>
			</div>
		</>
	);
};
export default ModalContent;
