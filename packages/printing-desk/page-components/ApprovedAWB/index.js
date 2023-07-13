import { Button, Modal } from '@cogoport/components';
import { IcMEyeopen, IcMEdit, IcMDownload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../common/CardList';
import { ApprovedAWBFields } from '../../configurations/approved_awb';
import GenerateManifestDoc from '../GenerateManifestDoc';
// import HAWBList from '../HawbList';

import styles from './styles.module.css';

function ApprovedAWB({
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	setGenerate = () => {},
	setItem = () => {},
	setViewDoc = () => {},
	setEdit = () => {},
}) {
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
		handleSerialId: (singleItem) => (
			<div>
				#
				{singleItem.serialId}
			</div>
		),
		handleBlCategory: (singleItem) => (
			<div style={{ textTransform: 'uppercase' }}>
				{singleItem.blCategory}
			</div>
		),
		handleDownload: (singleItem) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={singleItem?.documentData?.status === 'uploaded'
					? () => { handleClickOnDownload(singleItem.documentUrl); }
					: () => { handleDownloadMAWB(singleItem); }}
			>
				<IcMEyeopen fill="var(--color-accent-orange-2)" />

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
			singleItem?.documentData?.status !== 'uploaded' && (
				<Button
					themeType="linkUi"
					style={{ fontSize: 12 }}
					onClick={() => { handleEditMAWB(singleItem, 'edit'); }}
				>
					<IcMEdit fill="var(--color-accent-orange-2)" />
				</Button>
			)
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
				// activeTab={activeTab}
				// Child={HAWBList}
				// setViewDoc={setViewDoc}
				// setItem={setItem}
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
