/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
/* eslint-disable import/no-unresolved */
import ChargeDetails from '@cogoport/air-modules/components/AWBTemplate/ChargeDetails';
import ContainerDetails from '@cogoport/air-modules/components/AWBTemplate/ContainerDetails';
import ShipmentDetails from '@cogoport/air-modules/components/AWBTemplate/ShipmentDetails';
import ShipperConsigneeDetails from '@cogoport/air-modules/components/AWBTemplate/ShipperConsigneeDetails';
import { cl, Button, Modal } from '@cogoport/components';
import * as htmlToImage from 'html-to-image';
import React, { createRef, useState } from 'react';

import { FOOTER_VALUES } from '../../constants/footer-values';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';

import getFileObject from './getFileObject';
import styles from './styles.module.css';
import TopButtonContainer from './TopButtonContainer';
import useGetMediaUrl from './useGetMediaUrl';

function AWBDocument({
	item = {},
	viewDoc = false,
	formData = {},
	setGenerate = () => {},
	setViewDoc = () => {},
	edit = false,
	setEdit = () => {},
	setItem = () => {},
	setEditCopies = () => {},
	back = false,
	setBack = () => {},
}) {
	const [whiteout, setWhiteout] = useState(false);
	const [saveDocument, setSaveDocument] = useState(false);

	const ref = createRef(null);

	const { documentData } = item || {};

	const taskItem = {
		...item,
		...documentData,
		...formData,
	};

	const {
		id, serialId = '', documentId, documentType = 'mawb', state, documentState, blDetailId,
		serviceId, shipment_id: pendingShipmentId, shipmentId, serviceProviderId,
	} = taskItem;

	const { handleUpload } = useGetMediaUrl();

	const { updateShipment, loading } = useUpdateShipmentDocument();

	const category = documentType === 'draft_airway_bill'
		? 'mawb' : 'hawb';

	const takeImageScreenShot = async (node) => {
		const dataURI = await htmlToImage.toJpeg(node);
		return dataURI;
	};

	const downloadScreenshot = () => takeImageScreenShot(document.getElementById('mawb'));

	const handleSave = async () => {
		const newImage = await downloadScreenshot();
		console.log('newImage', newImage);
		const { file } = getFileObject(newImage, 'mawb.pdf');
		const res = await handleUpload('awb.pdf', file);
		const payload = {
			id            : documentId,
			shipment_id   : shipmentId || pendingShipmentId,
			...formData,
			document_type : category === 'mawb' ? 'draft_airway_bill' : 'draft_house_airway_bill',
			service_id    : serviceId,
			document_url  : res || undefined,
		};

		// const individualCopyPayload = {
		// 	id,
		// 	documentId   : docId,
		// 	documentType : documentType === 'draft_airway_bill'
		// 		? 'draft_airway_bill' : 'draft_house_airway_bill',
		// 	documentNumber,
		// 	data: {
		// 		...formData,
		// 		status          : 'generated',
		// 		document_number : documentNumber,
		// 		service_id      : serviceId,
		// 		service_type    : 'air_freight_service',
		// 	},
		// 	documentUrl: res || undefined,
		// };

		// if (editCopies) {
		// 	updateIndividualEditing(individualCopyPayload);
		// } else {
		updateShipment({ payload });
		// }

		setSaveDocument(false);
	};

	return (
		<div className={styles.file_container}>
			<Modal
				onClose={() => { setBack(false); setViewDoc(false); }}
				show={back || viewDoc}
				animate={false}
				className={styles.modal_container}
				scroll
				placement="center"
			>
				<Modal.Body style={{ minHeight: '90vh' }}>
					<div className={styles.flex_col}>
						{viewDoc && (
							<TopButtonContainer
								whiteout={whiteout}
								setWhiteout={setWhiteout}
								saveDocument={saveDocument}
								setSaveDocument={setSaveDocument}
								setEdit={setEdit}
								category={category}
								taskItem={taskItem}
								setGenerate={setGenerate}
								setViewDoc={setViewDoc}
								setItem={setItem}
								setEditCopies={setEditCopies}
							/>
						)}

						<div
							className={cl`${styles.flex_col} ${styles.document}`}
							id="mawb"
							ref={ref}
						>
							{/* {((viewDoc && documentState !== 'document_accepted')
							 || (!viewDoc && editCopies === null))
			&& <Watermark text="draft" rotateAngle="315deg" />} */}

							<div style={{ position: 'relative' }}>
								<ShipperConsigneeDetails
									formData={taskItem}
									taskItem={taskItem}
									whiteout={whiteout}
									activeCategory={category}
									edit={edit}
									viewDoc={viewDoc}
								/>
								<ShipmentDetails
									formData={taskItem}
									whiteout={whiteout}
									taskItem={taskItem}
								/>
								<ContainerDetails
									formData={taskItem}
									chargeableWeight={6}
									whiteout={whiteout}
								/>
								<ChargeDetails
									taskItem={taskItem}
									footerValues={FOOTER_VALUES}
									formData={taskItem}
									whiteout={whiteout}
									activeCategory={category}
									edit={edit}
									viewDoc={viewDoc}
								/>
							</div>
						</div>

						{!viewDoc && (
							<div
								className={styles.button_div}
							>
								{edit || back ? (
									<div style={{ marginRight: '20px' }}>
										<Button
											themeType="secondary"
											onClick={() => {
												if (back) {
													setBack(!back);
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
						)}
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default AWBDocument;
