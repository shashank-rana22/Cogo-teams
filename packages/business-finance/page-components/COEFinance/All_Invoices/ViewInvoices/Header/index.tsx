import { Button, Textarea, Modal } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import { RemarksValInterface } from '../../../../commons/Interfaces/index';
import useApproveReject from '../../../hook/useApproveReject';
import TimeLineItemCheck from '../ShipmentDetails/TimelineItemCheck';

import styles from './styles.module.css';

interface BillAdditionalInterface {
	collectionPartyId?: string;
}

interface DataInterface {
	billAdditionalObject?: BillAdditionalInterface;
}
interface HeaderInterface {
	data?: DataInterface;
	remarksVal?: RemarksValInterface;
	overAllRemark?:string;
	setOverAllRemark?:Function;
	lineItemsRemarks: object;
	status: string;
	jobNumber?:string;
	checkItem?: any;
	isTagFound?: boolean;
}

function Header({
	data,
	remarksVal,
	overAllRemark,
	setOverAllRemark,
	lineItemsRemarks,
	status,
	jobNumber,
	checkItem = {},
	isTagFound = false,
}: HeaderInterface) {
	const [approve, setApprove] = useState(false);
	const [modalData, setModalData] = useState('');
	const Router = useRouter();
	const billId = Router?.query?.billId;
	const { isShipment, searchValue } = Router?.query || {};

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

	const handleModalData = (e: any) => {
		setModalData(e.target.innerText);
		setApprove(true);
	};

	const isApproveDisabled = Object.keys(lineItemsRemarks)?.length > 0
    || remarksVal?.billingPartyRemark?.length > 0
    || remarksVal?.collectionPartyRemark?.length > 0
	|| remarksVal?.invoiceDetailsRemark?.length > 0
	|| remarksVal?.taggingRemark?.length > 0;

	const isItemNotChecked = Object.values(checkItem).some((item) => item === false);

	const getRoute = () => {
		if (isShipment) {
			return [
				`/business-finance/coe-finance/[active_tab]/[view]?jobNumber=${jobNumber}`,
				`/business-finance/coe-finance/all_invoices/shipment-view?jobNumber=${jobNumber}`,
			];
		}
		return [
			`/business-finance/coe-finance/[active_tab]/[view]?jobNumber=${jobNumber}&searchValue=${searchValue}`,
			`/business-finance/coe-finance/all_invoices/purchase-view?jobNumber=${jobNumber}
			&searchValue=${searchValue}`,
		];
	};

	return (
		<div>
			<div className={styles.container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => Router.push(
						getRoute()[0],
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
						style={{ marginRight: '8px' }}
						disabled={isItemNotChecked || isApproveDisabled}
						onClick={(e: any) => handleModalData(e)}
					>
						Approve
					</Button>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: '8px' }}
						disabled={status === 'FINANCE_ACCEPTED'}
						onClick={(e: any) => handleModalData(e)}
					>
						Hold
					</Button>
					<Button
						size="md"
						style={{ marginRight: '8px' }}
						disabled={isItemNotChecked || !isApproveDisabled}
						onClick={(e: any) => handleModalData(e)}
					>
						Reject
					</Button>
				</div>
			</div>
			<div className={styles.timeline}>
				<TimeLineItemCheck
					checkItem={checkItem}
					status={status}
					isTagFound={isTagFound}
				/>
			</div>

			{approve && (
				<Modal
					size="md"
					show={approve}
					onClose={() => {
						setApprove(false);
					}}
				>
					<Modal.Body>
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
							onChange={(value: string) => setOverAllRemark(value)}
							style={{ width: '700', height: '100px', marginBottom: '12px' }}
						/>
						<div className={styles.button}>
							<Button
								size="md"
								themeType="secondary"
								style={{ marginRight: '8px' }}
								onClick={() => {
									setApprove(false);
								}}
							>
								No
							</Button>
							<Button
								size="md"
								style={{ marginRight: '8px' }}
								disabled={!(overAllRemark?.length > 0)}
								onClick={() => rejectApproveApi(getRoute)}
							>
								Yes
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}
export default Header;
