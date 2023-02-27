import { Button, Modal } from '@cogoport/components';
import { IcMDownload, IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { ApprovalPendingFields } from '../../configurations/approval_pending_fields';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';

import DownloadModal from './DownloadModal';
import styles from './styles.module.css';

function ApprovalPending({
	data, loading, setPage, setGenerate, setItem, setViewDoc, setEdit, listAPi,
}) {
	const { fields } = ApprovalPendingFields;
	const [showApprove, setShowApprove] = useState(null);
	const [show, setShow] = useState(false);

	const { loading:updateLoading, updateDocument } = useUpdateShipmentDocument();

	const handleDownloadMAWB = (singleItem) => {
		setViewDoc(true);
		setItem(singleItem);
	};

	const handleEditMAWB = (singleItem) => {
		setEdit(true);
		setGenerate(true);
		setItem(singleItem);
	};

	const handleUpdate = async (values) => {
		await updateDocument(values, listAPi);
		setShowApprove(null);
	};

	const functions = {
		handleDownload: (singleItem:any) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => { handleDownloadMAWB(singleItem); }}
			>
				<IcMDownload fill="#8B8B8B" />

			</Button>
		),
		handleEdit: (singleItem:any) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => { handleEditMAWB(singleItem); }}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),
		handleStatus: (singleItem:any) => (
			singleItem.documentState === 'document_amendment_requested'
				? (
					<Button
						themeType="secondary"
						style={{ border: '1px solid #ED3726', color: '#ED3726' }}
						disabled={updateLoading}
						onClick={() => { handleEditMAWB(singleItem); }}
					>
						Amend
					</Button>
				) : (
					<Button
						themeType="secondary"
						style={{ border: '1px solid #333' }}
						disabled={updateLoading}
						onClick={() => { setShowApprove(singleItem); }}
					>
						Approve
					</Button>
				)
		),
	};
	return (
		<>
			<List
				fields={fields}
				data={data}
				loading={loading}
				setPage={setPage}
				functions={functions}
			/>
			{show && <DownloadModal show={show} setShow={setShow} />}
			{showApprove && (
				<Modal
					size="md"
					show={showApprove}
					onClose={() => setShowApprove(false)}
					scroll={false}
				>
					<Modal.Header title={(<h4 style={{ textAlign: 'center' }}>Approval Remark</h4>)} />
					<Modal.Body>
						<div className={styles.sure_approve}>
							Did you get confirmation from your KAM to provide approval?
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							style={{ marginRight: '10px', border: '1px solid #333' }}
							size="md"
							onClick={() => setShowApprove(null)}
							themeType="secondary"
						>
							Cancel
						</Button>
						<Button
							size="md"
							themeType="accent"
							onClick={() => { handleUpdate(showApprove); }}
						>
							Approve

						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}

export default ApprovalPending;
