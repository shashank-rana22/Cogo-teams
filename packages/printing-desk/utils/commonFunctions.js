import { Button } from '@cogoport/components';
import { IcMEyeopen, IcMDownload, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const commonFunctions = ({
	setViewDoc = () => {},
	setItem = () => {},
	setTriggerManifest = () => {},
	setEdit = () => {},
}) => {
	const handleClickOnDownload = (documentUrl) => {
		if (typeof window !== 'undefined') {
			window.open(documentUrl, '_blank');
		}
	};

	const handleDownloadMAWB = (singleItem) => {
		setViewDoc(true);
		setItem(singleItem);
	};

	const handleEditMAWB = (singleItem, action) => {
		setEdit(action || true);
		setItem(singleItem);
	};

	return ({
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
					onClick={() => { handleEditMAWB(singleItem, 'edit'); }}
				>
					<IcMEdit fill="var(--color-accent-orange-2)" />
				</Button>
			)
		),
	}
	);
};

export default commonFunctions;
