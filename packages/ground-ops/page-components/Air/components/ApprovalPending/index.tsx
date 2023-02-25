import { Button } from '@cogoport/components';
import { IcMDownload, IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { ApprovalPendingFields } from '../../configurations/approval_pending_fields';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';

import DownloadModal from './DownloadModal';

function ApprovalPending({
	data, loading, setPage, setGenerate, setItem, setViewDoc, setEdit, listAPi,
}) {
	const { fields } = ApprovalPendingFields;
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

	const handleUpdate = (values) => {
		updateDocument(values, listAPi);
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
						onClick={() => { handleUpdate(singleItem); }}
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
		</>
	);
}

export default ApprovalPending;
