import { Button } from '@cogoport/components';
import { IcMDownload, IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { ApprovalPendingFields } from '../../configurations/approval_pending_fields';

import DownloadModal from './DownloadModal';

function ApprovalPending({ data, loading, setPage, setGenerate, setItem, setViewDoc, setEdit }) {
	const { fields } = ApprovalPendingFields;
	const [show, setShow] = useState(false);

	const handleDownloadMAWB = (singleItem) => {
		setViewDoc(true);
		setItem(singleItem);
	};

	const handleEditMAWB = (singleItem) => {
		setEdit(true);
		setGenerate(true);
		setItem(singleItem);
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
