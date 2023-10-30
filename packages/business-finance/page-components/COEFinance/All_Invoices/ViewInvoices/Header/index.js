import { Button, Textarea, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import TIMELINE_ELIGIBLE_JOB_TYPES from '../../../constants/timelineEligibleList';
import useApproveReject from '../../../hook/useApproveReject';
import AdditionalRemarks from '../../AdditionalRemarks';
import TimeLineItemCheck from '../ShipmentDetails/TimelineItemCheck';

import getCombinedRemarks from './getCombinedRemarks';
import styles from './styles.module.css';

function Header({
	data = {},
	remarksVal = {},
	overAllRemark = '',
	setOverAllRemark = () => {},
	lineItemsRemarks = {},
	status = '',
	jobNumber = '',
	checkItem = {},
	isTagFound = false,
	currentTab = '',
	jobType = '',
}) {
	const Router = useRouter();
	const [approve, setApprove] = useState(false);
	const [modalData, setModalData] = useState('');
	const [remarkData, setRemarkData] = useState({
		profitability : undefined,
		mismatched    : undefined,
		miscellaneous : undefined,
		other         : undefined,
	});

	const billId = Router?.query?.billId;
	const { isShipment, searchValue, active_tab:activeTab, view } = Router?.query || {};

	const collectionPartyId = data?.billAdditionalObject?.collectionPartyId || '';

	const { rejectApproveApi } = useApproveReject({
		collectionPartyId,
		remarksVal,
		overAllRemark,
		lineItemsRemarks,
		modalData,
		setApprove,
		billId,
	});

	const handleModalData = (e) => {
		setModalData(e.target.innerText);
		setApprove(true);
	};

	const isApproveDisabled = !isEmpty(Object.keys(lineItemsRemarks))
    || !isEmpty(remarksVal?.billingPartyRemark)
    || !isEmpty(remarksVal?.collectionPartyRemark)
	|| !isEmpty(remarksVal?.invoiceDetailsRemark)
	|| !isEmpty(remarksVal?.taggingRemark);

	const isItemNotChecked = Object.values(checkItem).some((item) => !item);

	const getRoute = () => {
		if (activeTab === 'rejected') {
			return [
				'/business-finance/audit-function/[active_tab]/[view]',
				`/business-finance/audit-function/rejected/${view}`,
			];
		}
		if (isShipment) {
			return [
				`/business-finance/audit-function/[active_tab]/[view]?jobNumber=${jobNumber}`,
				`/business-finance/audit-function/all_invoices/shipment-view?jobNumber=${jobNumber}`,
			];
		}
		return [
			`/business-finance/audit-function/[active_tab]/[view]?jobNumber=${jobNumber}&searchValue=${searchValue}`,
			`/business-finance/audit-function/all_invoices/purchase-view?jobNumber=${jobNumber}
			&searchValue=${searchValue}`,
		];
	};

	const clearRemark = () => {
		setRemarkData({
			profitability : undefined,
			mismatched    : undefined,
			miscellaneous : undefined,
			other         : undefined,
		});
	};

	const additionalRemarks = {
		profitabilityRemarks: remarkData?.profitability?.notBilled || remarkData?.profitability?.billed
		|| remarkData?.profitability?.draft || remarkData?.profitability,
		documentNumberRemarks : remarkData?.mismatched,
		miscellaneousRemarks  : remarkData?.miscellaneous,
	};

	const combinedRemarks = getCombinedRemarks(remarkData);

	return (
		<div>
			<div className={styles.container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => Router.push(
						getRoute()[GLOBAL_CONSTANTS.zeroth_index],
						getRoute()[1],
					)}
					style={{ border: '1px solid' }}
				>
					Go Back
				</Button>
				<div className={styles.sub_container}>
					<Button
						size="md"
						themeType="secondary"
						disabled={isItemNotChecked || isApproveDisabled}
						style={{ border: '1px solid #06a106', color: '#06a106' }}
						onClick={(e) => handleModalData(e)}
					>
						Approve
					</Button>
					<Button
						size="md"
						themeType="secondary"
						style={{ margin: '0 16px' }}
						disabled={status === 'FINANCE_ACCEPTED'}
						onClick={(e) => handleModalData(e)}
					>
						Hold
					</Button>
					<Button
						size="md"
						disabled={isItemNotChecked}
						onClick={(e) => handleModalData(e)}
					>
						Reject
					</Button>
				</div>
			</div>
			<div className={styles.timeline}>
				{TIMELINE_ELIGIBLE_JOB_TYPES.includes(jobType) ? (
					<TimeLineItemCheck
						checkItem={checkItem}
						status={status}
						isTagFound={isTagFound}
						currentTab={currentTab}
						jobType={jobType}
					/>
				) : null}
			</div>

			{approve && (
				<Modal
					size="lg"
					show={approve}
					onClose={() => {
						setApprove(false);
					}}
					closeOnOuterClick={false}
					className={styles.modal_body_section_custom}
				>
					<Modal.Body>
						{
							(modalData === 'Reject' || modalData === 'Hold') && !isApproveDisabled ? (
								<div>
									<AdditionalRemarks
										remarkData={remarkData}
										setRemarkData={setRemarkData}
										modalData={modalData}
									/>
									<div className={styles.btn_container}>
										<Button
											onClick={() => {
												setApprove(false);
												clearRemark();
											}}
											themeType="secondary"
											style={{ marginRight: '8px' }}
										>
											Close
										</Button>

										<Button
											size="md"
											style={{ marginRight: '8px' }}
											disabled={isEmpty(combinedRemarks)}
											onClick={() => rejectApproveApi({
												getRoute,
												isAdditional : true,
												additionalRemarks,
												otherRemarks : remarkData?.other,
											})}
										>
											{modalData}
										</Button>
									</div>
								</div>
							) : (
								<div>
									<div className={styles.heading}>
										Are you sure you want to
										{' '}
										{modalData}
										{' '}
										this invoice ?
									</div>
									<Textarea
										name="remark"
										size="md"
										placeholder="Remarks Here ..."
										value={overAllRemark}
										onChange={(value) => setOverAllRemark(value)}
										style={{ width: '700', height: '100px', marginBottom: '12px' }}
									/>
									<div className={styles.button}>
										<Button
											size="md"
											themeType="secondary"
											style={{ marginRight: '8px' }}
											onClick={() => {
												setApprove(false);
												setOverAllRemark('');
											}}
										>
											No
										</Button>
										<Button
											size="md"
											style={{ marginRight: '8px' }}
											disabled={isEmpty(overAllRemark)}
											onClick={() => rejectApproveApi({ getRoute })}
										>
											Yes
										</Button>
									</div>
								</div>
							)
						}

					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}
export default Header;
