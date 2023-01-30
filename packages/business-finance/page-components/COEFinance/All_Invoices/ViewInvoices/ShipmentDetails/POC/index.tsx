import { Placeholder } from '@cogoport/components';
import {
	IcMArrowRotateLeft,
	IcMArrowRotateDown,
	IcMOverview,
	IcMArrowRotateUp,
	IcMArrowRotateRight,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import { DataInterface } from '..';
import { POC_DATA_MAPPING } from '../../../../constants/constant';
import usePOCDetails from '../../../../hook/usePOCDetails';

import CustomerInformation from './CustomerInformation/index';
import POCTimeLine from './POCTimeLine/index';
import styles from './styles.module.css';

interface Props {
	itemData: DataInterface;
}

function getNumber(labelValue: string) {
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

function POCDetails({ itemData }: Props) {
	const { bill, job } = itemData;

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
			<div className={styles.iconView}>
				<div
					className={styles.iconContainer}
					onClick={handleShow}
					role="presentation"
				>
					<IcMArrowRotateRight width={20} height={20} />
				</div>
				<div
					className={styles.pocContainer}
					onClick={handleShow}
					role="presentation"
				>
					POC & Other Details
				</div>
			</div>
			{showDetailsCard && (
				<>
					<div className={styles.invoiceDetailsContainerBg} />

					<div
						className={styles.invoiceDetailsContainer}
						style={{ width: '35vw' }}
					>
						<div className={showDetailsCard ? styles.enter : styles.exit}>
							<div className={styles.contentCaret}>
								<div
									className={styles.iconContainer}
									onClick={() => {
                  	setShowDetailsCard(false);
                  	document.body.style.overflow = 'auto';
									}}
									role="presentation"
								>
									<IcMArrowRotateLeft />
								</div>

								<div className={styles.headerDetails}>
									POC & Other Details - SID
									<span style={{ marginLeft: '4px' }}>{jobNumber}</span>
								</div>
							</div>

							<div className={styles.bodyDetails}>
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
			className={styles.dataContainer}
			onClick={() => {
                          	handleDropdown(id);
			}}
			role="presentation"
		>
			{label}
			<div className={styles.dropdownContainer}>
				{dropDownData[id as keyof typeof dropDownData] ? (
					<IcMArrowRotateUp width={15} height={15} />
				) : (
					<IcMArrowRotateDown width={15} height={15} />
				)}
			</div>
		</div>

		{dropDownData[id as keyof typeof dropDownData] && (
			<div className={styles.hR} />
		)}

		{dropDownData[id as keyof typeof dropDownData] && (
			<div>
				<div className={styles.informationData}>
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
