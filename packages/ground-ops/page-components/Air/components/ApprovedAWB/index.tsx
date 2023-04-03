import { Button } from '@cogoport/components';
import { IcMDownload, IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { ApprovedAWBFields } from '../../configurations/approved_awb';
import UploadModal from '../UploadModal';

function ApprovedAWB({
	data, loading, page, setPage, setGenerate, setItem, setViewDoc, edit, setEdit, listAPi,
}) {
	const [showUpload, setShowUpload] = useState(null);
	const { fields } = ApprovedAWBFields;

	const handleDownloadMAWB = (singleItem) => {
		setViewDoc(true);
		setItem(singleItem);
	};

	const handleEditMAWB = (singleItem, action) => {
		setEdit(action || true);
		setGenerate(true);
		setItem(singleItem);
	};

	const handleClickOnDownload = (documentUrl) => {
		if (typeof window !== 'undefined') {
			window.open(documentUrl, '_blank');
		}
	};

	const functions = {
		handleDownload: (singleItem) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={singleItem?.documentData?.status === 'uploaded'
					? () => { handleClickOnDownload(singleItem.documentUrl); }
					: () => { handleDownloadMAWB(singleItem); }}
			>
				<IcMDownload fill="#8B8B8B" />

			</Button>
		),
		handleEdit: (singleItem) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={singleItem?.documentData?.status === 'uploaded'
					? () => { setShowUpload(singleItem); setEdit('edit'); }
					: () => { handleEditMAWB(singleItem, 'edit'); }}
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
				page={page}
				setPage={setPage}
				loading={loading}
				functions={functions}
			/>
			<UploadModal
				showUpload={showUpload}
				setShowUpload={setShowUpload}
				listAPi={listAPi}
				edit={edit}
				setEdit={setEdit}
			/>
		</>
	);
}

export default ApprovedAWB;
