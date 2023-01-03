import { Placeholder } from '@cogoport/components';
import React,{ useState } from 'react';
import {
	IcMArrowRotateLeft,
	IcMArrowRotateDown,
	IcMOverview,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import POCTimeLine from './POCTimeLine/index';
import styles from './styles.module.css'
import CustomerInformation from './CustomerInformation/index';
import usePOCDetails from '../../../../hook/usePOCDetails';
import { POC_DATA_MAPPING } from '../../../../constants/constant';
import { IcMArrowRotateRight } from '@cogoport/icons-react';

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

// interface Props {
// 	bill :object
// 	job:object
// }

const POCDetails = ( {itemData} :any) => {

	const {bill , job } = itemData

	const {
		loading,
		invoiceData,
		timeLineData,
		timeLineLoading,
		getInvoiceDetailsApi,
		getTimeLineDetailsApi,
	} = usePOCDetails(
		bill?.id,
	);

	const [showDetailsCard, setShowDetailsCard] = useState(false);

	const [dropDownData, setDropDownData] = useState(false);

	const handleShow = () => {
		setShowDetailsCard(true);
		getInvoiceDetailsApi();
		document.body.style.overflow = 'hidden';
	};

	const handleDropdown = (key = '') => {
		setDropDownData((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
		if (key === '2') getTimeLineDetailsApi();
	};

	const {  jobNumber } = job || {};
	

	return (
		<>
			<div className={styles.iconView} onClick={handleShow}>
				<div className={styles.iconContainer} >
				   <IcMArrowRotateRight width={20} height={20} />
				</div>
				<div className={styles.pocContainer}>
				    POC & Other Details
				</div>
			</div>
			{showDetailsCard && (
				<>
					<div className={styles.invoiceDetailsContainerBg} />

					<div className={styles.invoiceDetailsContainer}  style={{ width: '35vw' }}>
						<div className = {showDetailsCard ? styles.enter : styles.exit}>
							<div className={styles.contentCaret}>
								<div className={styles.iconContainer} 
									onClick={() => {
										setShowDetailsCard(false);
										document.body.style.overflow = 'auto';
									}}
								>
									<IcMArrowRotateLeft />
								</div>

								<div className={styles.headerDetails}>
								    POC & Other Details - SID 
									<span style={{marginLeft:'4px' }}>
										{jobNumber}
									</span>
								</div>
							</div>

							<div className={styles.bodyDetails}>
								{loading ? (
									<>
										<Placeholder
											margin="5px 0px 14px 25px"
											height="45px"
											width="492px"
											borderRadius="4px"
										/>
										<Placeholder
											margin="5px 0px 14px 25px"
											height="45px"
											width="492px"
											borderRadius="4px"
										/>
										<Placeholder
											margin="5px 0px 14px 25px"
											height="45px"
											width="492px"
											borderRadius="4px"
										/>
									</>
								) : (
									(POC_DATA_MAPPING || [{}]).map((item) => {
										const { id, label } = item;

										return (
											<div className={styles.information}  key={id}>
												<div className={styles.dataContainer} 
													onClick={() => {
														handleDropdown(id);
													}}
												>
													{label}
													<div className={styles.dropdownContainer} >
														{dropDownData[id] ? (
															<IcMArrowRotateUp width={15} height={15} />
														) : (
															<IcMArrowRotateDown width={15} height={15} />
														)}
													</div>
												</div>

												{dropDownData[id] && <div className={styles.hR} />}

												{dropDownData[id] && (
													<div
														type={dropDownData ? 'enter' : 'exit'}
													>
														<div  className={styles.informationData} >
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
};
export default POCDetails;
