import { Button, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen, IcMDownload, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const BL_MAPPING = {
	draft_airway_bill       : 'MAWB',
	draft_house_airway_bill : 'HAWB',
};

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
		handleDocumentNumber: (singleItem) => (
			<p>{singleItem?.documentData?.document_number}</p>
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
				<div className={styles.tooltip_container}>
					<Tooltip
						content={`Preview ${BL_MAPPING[singleItem?.documentType]}`}
						placement="right"
						interactive
					>
						<IcMEyeopen fill="var(--color-accent-orange-2)" />
					</Tooltip>
				</div>
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
					<div className={styles.tooltip_container}>
						<Tooltip
							content={`Edit ${BL_MAPPING[singleItem?.documentType]}`}
							placement="right"
							interactive
						>
							<IcMEdit fill="var(--color-accent-orange-2)" />
						</Tooltip>
					</div>
				</Button>
			)
		),
		handleHandoverDate: (singleItem) => (
			formatDate({
				date       : singleItem?.cargoHandedOverAtOriginAt,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			})
		),
	}
	);
};

export default commonFunctions;
