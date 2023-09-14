import { Button } from '@cogoport/components';
import * as htmlToImage from 'html-to-image';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useUpdateShipmentDocument from '../../../hooks/useUpdateShipmentDocument';
import getFileObject from '../../../utils/getFileObject';
import useGetMediaUrl from '../../../utils/useGetMediaUrl';

import styles from './styles.module.css';

function SaveDocumentContainer({
	back = false,
	edit = false,
	setEdit = () => {},
	setBack = () => {},
	setViewDoc = () => {},
	saveDocument = false,
	setSaveDocument = () => {},
	category = 'mawb',
	taskItem = {},
	formData = {},
	listAPI = () => {},
}) {
	const { t } = useTranslation(['printingDesk']);
	const { documentId, serviceId, shipment_id: pendingShipmentId, shipmentId } = taskItem;

	const { updateShipment, loading } = useUpdateShipmentDocument({ listAPI });

	const { handleUpload } = useGetMediaUrl();

	const takeImageScreenShot = async (node) => {
		const dataURI = await htmlToImage.toJpeg(node);
		return dataURI;
	};

	const downloadScreenshot = () => takeImageScreenShot(document.getElementById('awb'));

	const handleSave = async () => {
		const newImage = await downloadScreenshot();
		const { file } = getFileObject(newImage, 'awb.pdf');
		const res = await handleUpload('awb.pdf', file);
		const payload = {
			id           : documentId,
			shipmentId   : shipmentId || pendingShipmentId,
			...formData,
			documentType : category === 'mawb' ? 'draft_airway_bill' : 'draft_house_airway_bill',
			serviceId,
			documentUrl  : res || undefined,
		};

		updateShipment({ payload }).then(() => {
			setViewDoc(false);
			setBack(false);
			setEdit(false);
		});

		setSaveDocument(false);
	};

	return (
		<div className={styles.button_div}>
			{edit || back ? (
				<div style={{ marginRight: '20px' }}>
					<Button
						themeType="secondary"
						onClick={() => {
							if (back) {
								setBack(!back);
								setEdit(true);
							}
						}}
						disabled={loading || saveDocument}
					>
						{t('printingDesk:awb_document_save_document_container_edit_button')}
					</Button>
				</div>
			) : null}
			<div style={{ marginRight: '36px' }}>
				<Button
					onClick={() => {
						setSaveDocument(true);
						handleSave();
					}}
					disabled={loading || saveDocument}
				>
					{loading || saveDocument
						? t('printingDesk:awb_document_save_document_container_saving_button')
						: t('printingDesk:awb_document_save_document_container_save_button')}
				</Button>
			</div>
		</div>
	);
}

export default SaveDocumentContainer;
