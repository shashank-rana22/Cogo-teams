import { Button } from '@cogoport/components';
import * as htmlToImage from 'html-to-image';
import React from 'react';

import useUpdateIndividualEditing from '../../../hooks/useUpdateIndividualEditing';
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
	editCopies = '',
	setEditCopies = () => {},
	listAPI = () => {},
}) {
	const {
		id, documentId, documentType = 'mawb',
		serviceId, shipment_id: pendingShipmentId, shipmentId, documentNumber,
	} = taskItem;

	const { updateShipment, loading } = useUpdateShipmentDocument({ listAPI });

	const { updateIndividualEditing } = useUpdateIndividualEditing({ setEdit });

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

		const individualCopyPayload = {
			id,
			documentId,
			documentType: documentType === 'draft_airway_bill'
				? 'draftairway_bill' : 'draft_house_airway_bill',
			documentNumber,
			data: {
				...formData,
				status          : 'generated',
				document_number : documentNumber,
				service_id      : serviceId,
				service_type    : 'air_freight_service',
			},
			documentUrl: res || undefined,
		};

		if (editCopies) {
			updateIndividualEditing(individualCopyPayload).then(() => {
				setViewDoc(false);
				setBack(false);
				setEditCopies('');
				listAPI();
			});
		} else {
			updateShipment({ payload }).then(() => {
				setViewDoc(false);
				setBack(false);
			});
		}

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
						Edit
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
					{loading || saveDocument ? 'Saving...' : 'Save'}
				</Button>
			</div>
		</div>
	);
}

export default SaveDocumentContainer;
