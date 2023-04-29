import { Button, Tooltip, Modal, Pill } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import getFormattedPrice from '../../../../commons/utils/getFormattedPrice';

import AddUrgencyTag from './AddUrgencyTag/index';
import { urgencyOptions } from './controls';
import RemoveTagConfirmation from './RemoveTagConfirmation/index';
import styles from './styles.module.css';

interface BillInterFace {
	grandTotal: number;
	billCurrency: string;
	id?: string;
	recurringState?:string,
	billType: string;
	isProforma: boolean;
}
interface BillAdditionalObject {
	collectionPartyId?: string;
	urgencyTag?: string;
	urgencyRemarks?: string;
}
interface RemarkObj {
	remarks?: [];
}
interface DataProps {
	bill: BillInterFace;
	billAdditionalObject?: BillAdditionalObject;
	remarks?: Array<RemarkObj>;
	serviceType?: string;
}
interface Props {
	data: DataProps;
	getBillRefetch: () => void;
}
function InvoiceDetails({ data, getBillRefetch }: Props) {
	const [remark, setRemark] = useState('');
	const { bill, remarks = [], serviceType, billAdditionalObject } = data || {};
	const { urgencyTag, urgencyRemarks } = billAdditionalObject || {};
	const { grandTotal, billCurrency, id, billType, isProforma } = bill || {};
	const [removeTag, setRemoveTag] = useState(false);
	const [showAddTag, setShowAddTag] = useState(false);
	const [tagValue, setTagValue] = useState('');

	if (serviceType === 'air_freight') {
		urgencyOptions.push({ label: 'Airlines DO Payments', value: 'air_do' });
	}
	let invoiceType = startCase(billType);

	if (billType === 'BILL') {
		if (isProforma === true) {
			invoiceType = 'PROFORMA INVOICE';
		} else {
			invoiceType = 'PURCHASE INVOICE';
		}
	}

	let displayTag = '';
	urgencyOptions.forEach((option) => {
		if (option.value === urgencyTag) {
			displayTag = option.label;
		}
	});

	const remarkRender = () => (
		<div>
			Urgent Remarks -
			{urgencyRemarks}
		</div>
	);

	const renderEditTag = (
		<div className={styles.flexdiv}>
			<div className={styles.card_field}>
				<div className={styles.tags}>
					{displayTag}
					<div>{remark}</div>
				</div>

				{!isEmpty(urgencyRemarks)
        && urgencyTag === 'urgent' ? (
	<Tooltip placement="bottom" interactive content={remarkRender()}>
		<IcMInfo />
	</Tooltip>
					) : null}
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					size="md"
					onClick={() => setRemoveTag(true)}
				>
					Remove Tag
				</Button>

				<Button
					themeType="secondary"
					size="md"
					onClick={() => setShowAddTag(true)}
				>
					Edit Tag
				</Button>
			</div>
		</div>
	);

	const renderEmpty = (
		<div className={styles.flexdiv}>
			<div>No Urgency Tag &nbsp;</div>
			<Button
				themeType="secondary"
				size="md"
				onClick={() => setShowAddTag(true)}
			>
				Add Tag
			</Button>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div className={styles.details}>Invoice Details</div>
				<Pill color="blue">{invoiceType}</Pill>
			</div>

			{showAddTag ? (
				<AddUrgencyTag
					remark={remark}
					setRemark={setRemark}
					billId={id}
					serviceType={data?.serviceType}
					showAddTag={showAddTag}
					tagValue={tagValue}
					setTagValue={setTagValue}
					getBillRefetch={getBillRefetch}
					setShowAddTag={setShowAddTag}
				/>
			) : null}
			<div className={styles.small_hr} />
			<div className={styles.card}>
				<div className={styles.card_field_first}>
					Invoice Amount - &nbsp;
					{' '}
					<span className={styles.amount}>
						{getFormattedPrice(grandTotal, billCurrency)}
					</span>
				</div>
				<div className={styles.vertical_small_hr} />
				<div className={styles.card_field_second}>
					Tag - &nbsp;
					{' '}
					<span className={styles.tag}>
						{urgencyTag
							? renderEditTag
							: !isEmpty(data) && renderEmpty}
					</span>
				</div>
				<div className={styles.vertical_small_hr} />
				<div className={styles.card_field_third}>
					Remarks -
					{' '}
					<span className={styles.remarks}>
						{remarks?.[0]?.remarks || 'No Remarks'}
					</span>
				</div>
			</div>

			{removeTag ? (
				<Modal
					show={removeTag}
					onClose={() => setRemoveTag(false)}
					className="secondary sm"
				>
					<RemoveTagConfirmation
						setRemoveTag={setRemoveTag}
						getBillRefetch={getBillRefetch}
						billId={id}
					/>
				</Modal>
			) : null}
		</div>
	);
}

export default InvoiceDetails;
