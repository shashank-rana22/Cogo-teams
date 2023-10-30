import { Button, Modal } from '@cogoport/components';
import { IcMEyeopen, IcMEdit, IcMDownload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { ApprovedAWBFields } from '../../configurations/approved_awb';
import GenerateManifestDoc from '../GenerateManifestDoc';
import HAWBList from '../HawbList';
import UploadModal from '../UploadModal';

import styles from './styles.module.css';

function ApprovedAWB({
	data, loading, page, setPage, setGenerate, setItem, setViewDoc, edit, setEdit, listAPI, activeTab,
}) {
	const [showUpload, setShowUpload] = useState(null);
	const [triggerManifest, setTriggerManifest] = useState(null);
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
				<IcMEyeopen fill="#8B8B8B" />

			</Button>
		),
		handleDownloadManifest: (singleItem) => (
			singleItem.blCategory === 'hawb' && (
				<Button
					themeType="linkUi"
					style={{ fontSize: 12 }}
					onClick={() => { setTriggerManifest(singleItem.shipmentId); }}
					className={styles.manifest_download_button}
				>
					<IcMDownload />
					{' '}
					Manifest
				</Button>
			)
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
				activeTab={activeTab}
				Child={HAWBList}
				setViewDoc={setViewDoc}
				setItem={setItem}
			/>
			<UploadModal
				showUpload={showUpload}
				setShowUpload={setShowUpload}
				listAPI={listAPI}
				edit={edit}
				setEdit={setEdit}
			/>
			{triggerManifest && (
				<Modal
					show={triggerManifest}
					onClose={() => { setTriggerManifest(false); }}
					size="lg"
				>
					<Modal.Body style={{ minHeight: '90vh' }}>
						<GenerateManifestDoc
							setTriggerManifest={setTriggerManifest}
							shipmentId={triggerManifest}
						/>
					</Modal.Body>

				</Modal>
			)}
		</>
	);
}

export default ApprovedAWB;
