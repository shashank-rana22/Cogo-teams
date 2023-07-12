/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-lines-per-function */
import ChargeDetails from '@cogoport/air-modules/components/AWBTemplate/ChargeDetails';
import ContainerDetails from '@cogoport/air-modules/components/AWBTemplate/ContainerDetails';
import ShipmentDetails from '@cogoport/air-modules/components/AWBTemplate/ShipmentDetails';
import ShipperConsigneeDetails from '@cogoport/air-modules/components/AWBTemplate/ShipperConsigneeDetails';
import { Button, Checkbox, Popover, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';
import React, { useState } from 'react';

import { FOOTER_VALUES } from '../../constants/footer-values';
import { BACK_PAGE, FOOTER_IMAGES } from '../../constants/image-copies';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';

import getFileObject from './getFileObject';
import SelectDocumentCopies from './SelectDocumentCopies';
import styles from './styles.module.css';
import useGetMediaUrl from './useGetMediaUrl';

const DOWNLOAD_BUTTON = {
	document_accepted            : 'Download 12 Copies',
	document_uploaded            : 'Download',
	document_amendment_requested : 'Download',
};

const INCLUDE_TNC = ['original_3', 'original_2', 'original_1'];

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
	const [docCopies, setDocCopies] = useState(null);
	const [copiesValue, copiesOnChange] = useState([]);
	const [whiteout, setWhiteout] = useState(false);
	const [saveDocument, setSaveDocument] = useState(false);

	const { documentData } = item || {};

	const taskItem = {
		...item,
		...documentData,
		...formData,
	};

	const {
		id, serialId = '', documentId, documentType = 'mawb', awbNumber, state, documentState, blDetailId,
		document_number: documentNumber, serviceId, shipment_id: pendingShipmentId, shipmentId, serviceProviderId,
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

	const handleView = (download24) => {
		if (documentState === 'document_accepted') {
			html2canvas(document.getElementById('mawb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();

				(docCopies || copiesValue || []).forEach((itm, i) => {
					pdf.addImage(Object.values(itm)[1] === 'updated'
						? `${Object.values(itm)[GLOBAL_CONSTANTS.zeroth_index]}`
						: imgData, 'jpeg', 0, 0, pdfWidth, pdfHeight);
					if (!whiteout) {
						pdf.addImage(FOOTER_IMAGES[Object.keys(itm)[GLOBAL_CONSTANTS.zeroth_index]]
							|| FOOTER_IMAGES[itm], 'jpeg', 0, pdfHeight - 14, pdfWidth, 4.5);
					}

					if (download24) {
						if (INCLUDE_TNC.includes(Object.keys(itm)[GLOBAL_CONSTANTS.zeroth_index] || itm)) {
							pdf.addPage();
							pdf.addImage(BACK_PAGE, 'jpeg', 0, 0, pdfWidth, pdfHeight);
						} else {
							pdf.addPage();
						}
					}
					if (i < copiesValue.length - 1) {
						pdf.addPage();
					}
				});
				pdf.save(category === 'hawb' ? documentNumber : awbNumber);
			});
		} else {
			html2canvas(document.getElementById('mawb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();
				pdf.addImage(imgData, 'jpeg', 0, 0, pdfWidth, pdfHeight);
				pdf.save(category === 'hawb' ? documentNumber : awbNumber);
			});
		}
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
						{viewDoc
		&& (
			<div
				className={styles.download_button_div}
			>
				<div style={{ marginRight: '36px', display: 'flex', alignItems: 'center' }}>
					{documentState === 'document_accepted' && (
						<div className={styles.flex} style={{ alignItems: 'center', margin: '0 8px' }}>
							<Checkbox
								label="Whiteout"
								value={whiteout}
								onChange={() => setWhiteout((p) => !p)}
							/>
							<Popover
								placement="bottom"
								trigger="click"
								render={(
									<SelectDocumentCopies
										copiesValue={copiesValue}
										copiesOnChange={copiesOnChange}
										setSaveDocument={setSaveDocument}
										handleView={handleView}
										setGenerate={setGenerate}
										setViewDoc={setViewDoc}
										setEdit={setEdit}
										setItem={setItem}
										setDocCopies={setDocCopies}
										setEditCopies={setEditCopies}
										taskItem={taskItem}
										download24
									/>
								)}
							>
								<Button
									className="primary md"
									disabled={saveDocument || whiteout}
								>
									Download 12 Copies with T&C
								</Button>
							</Popover>
						</div>
					)}
					{documentState === 'document_accepted'
						? (
							<Popover
								placement="bottom"
								trigger="click"
								render={(
									<SelectDocumentCopies
										copiesValue={copiesValue}
										copiesOnChange={copiesOnChange}
										setSaveDocument={setSaveDocument}
										handleView={handleView}
										setGenerate={setGenerate}
										setViewDoc={setViewDoc}
										setEdit={setEdit}
										download24={false}
										setItem={setItem}
										setDocCopies={setDocCopies}
										setEditCopies={setEditCopies}
										taskItem={taskItem}
									/>
								)}
							>
								<Button
									className="primary md"
									disabled={saveDocument}
								>
									Download 12 Copies
								</Button>
							</Popover>
						)

						: (
							<Button
								className="primary md"
								onClick={() => {
									setSaveDocument(true);
									handleView(false);
								}}
								disabled={saveDocument}
							>
								{saveDocument ? 'Downloading...' : DOWNLOAD_BUTTON[documentState]}
							</Button>
						)}
				</div>
			</div>
		)}

						<div
							className={styles.flex_col}
							id="mawb"
							style={{
								flex       : '1',
								width      : '100%',
								height     : '100%',
								padding    : '40px 10px',
								opacity    : 1,
								background : '#fff',
							}}
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

						{!viewDoc
		&& (
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
