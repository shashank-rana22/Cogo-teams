import React, { useState } from 'react';
import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import Form from './Form';
import styles from './styles.module.css';

const blLabelMapping = {
	house_bill_of_lading: 'HBL',
	bill_of_lading: 'MBL',
	draft_house_bill_of_lading: 'HBL',
	draft_bill_of_lading: 'BL',
	delivery_order: 'DO',
	do_noc_certificate: 'DO NOC',
};

const getValidDocuments = (trade_type) => {
	if (trade_type === 'import') {
		return ['delivery_order', 'do_noc_certificate'];
	}

	return [
		'house_bill_of_lading',
		'bill_of_lading',
		'draft_house_bill_of_lading',
		'draft_bill_of_lading',
	];
};

function ReleaseCard({ blDetails = {}, shipmentState = {}, selectedTab }) {
	const [open, setOpen] = useState(false);
	const [hold, setHold] = useState(false);
	const [surrender, setSurrender] = useState(false);

	const { primaryService } = shipmentState;

	const releasedBLData = [];
	const blsAvailable = blDetails?.data?.filter(
		(item) =>
			!isEmpty(item?.bl_document_id || item?.do_document_id) &&
			!['surrendered', 'surrender_pending'].includes(item?.status),
	);

	const tradeType =
		shipmentState?.data?.shipment_type === 'fcl_freight_local'
			? primaryService?.trade_type
			: incoTerms[primaryService?.inco_term];

	const validDocuments = getValidDocuments(tradeType);

	blsAvailable?.forEach((item) => {
		if (
			validDocuments?.includes(item?.bl_document_type || item?.do_document_type)
		) {
			releasedBLData.push({
				label: `${
					blLabelMapping[item?.bl_document_type || item?.do_document_type]
				}${item?.bl_number || item?.do_number}`,
				value: item?.id,
				document_type: item?.bl_document_type,
				status: item?.status,
				category: item?.category,
			});
		}
	});

	const handleClick = () => {
		setHold(true);
		setOpen(true);
	};

	const handleClose = () => {
		setHold(false);
		setOpen(false);
		setSurrender(false);
	};

	const handleSurrender = () => {
		setSurrender(true);
		setOpen(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.bttn_wrap}>
				{['eligible', 'requested'].includes(selectedTab) ? (
					<Button onClick={handleClick}>
						Hold
					</Button>
				) : null}

				{selectedTab !== 'released' ? (
					<Button onClick={() => setOpen(true)}>
						{selectedTab === 'approved' ? 'Approve for Release' : 'Approve'}
					</Button>
				) : null}

				{selectedTab === 'approved' ? (
					<Button onClick={handleSurrender}>
						Approve for Surrender
					</Button>
				) : null}
			</div>

			<Modal
				show={open}
				onClose={handleClose}
				width={380}
				className="primary md"
			>
				<Form
					setOpen={setOpen}
					blData={releasedBLData}
					tradeType={tradeType}
					hold={hold}
					surrender={surrender}
					selectedTab={selectedTab}
				/>
			</Modal>
		</div>
	);
}

export default ReleaseCard;
