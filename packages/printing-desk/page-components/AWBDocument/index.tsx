// import ChargeDetails from '@cogoport/air-modules/components/AWBTemplate/ChargeDetails';
// import ContainerDetails from '@cogoport/air-modules/components/AWBTemplate/ContainerDetails';
// import ShipmentDetails from '@cogoport/air-modules/components/AWBTemplate/ShipmentDetails';
// import ShipperConsigneeDetails from '@cogoport/air-modules/components/AWBTemplate/ShipperConsigneeDetails';
// import { Button, Checkbox, Popover, Modal } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import html2canvas from 'html2canvas';
// import { jsPDF as JsPDF } from 'jspdf';
// import React, { useState } from 'react';

// import { FOOTER_VALUES } from '../../constants/footer-values';
// import { BACK_PAGE, FOOTER_IMAGES } from '../../constants/image-copies';

// import SelectDocumentCopies from './SelectDocumentCopies';
// import styles from './styles.module.css';

// const DOWNLOAD_BUTTON = {
// 	document_accepted            : 'Download 12 Copies',
// 	document_uploaded            : 'Download',
// 	document_amendment_requested : 'Download',
// };

// const INCLUDE_TNC = ['original_3', 'original_2', 'original_1'];

function AWBDocument() {
// 	{
// 	// item,
// 	// viewDoc = false,
// 	// // formData = {},
// 	// setGenerate = () => {},
// 	// setViewDoc = () => {},
// 	// edit = false,
// 	// setEdit = () => {},
// 	// setItem = () => {},
// 	// setEditCopies = () => {},
// 	// back = false,
// 	// setBack = () => {},
// }

	return <h1>dsdsd</h1>;
	// const [docCopies, setDocCopies] = useState(null);
	// const [copiesValue, copiesOnChange] = useState<string[]>([]);
	// const [whiteout, setWhiteout] = useState(false);
	// const [saveDocument, setSaveDocument] = useState(false);

	// const taskItem = {
	// 	...item,
	// 	...item?.documentData,
	// };

	// const {
	// 	id, serialId = '', documentId: docId, documentType, awbNumber, state, documentState, blDetailId,
	// 	document_number: documentNumber, serviceId, shipment_id: pendingShipmentId, shipmentId, serviceProviderId,
	// } = taskItem;

	// console.log('taskItem', taskItem);

	// const activeCategory = 'mawb';

	// const handleView = (download24) => {
	// 	if (documentState === 'document_accepted') {
	// 		html2canvas(document.getElementById('mawb')).then((canvas) => {
	// 			const imgData = canvas.toDataURL('image/jpeg');
	// 			const pdf = new JsPDF();
	// 			const pdfWidth = pdf.internal.pageSize.getWidth();
	// 			const pdfHeight = pdf.internal.pageSize.getHeight();

	// 			(docCopies || copiesValue || []).forEach((item, i) => {
	// 				pdf.addImage(Object.values(item)[1] === 'updated'
	// 					? `${Object.values(item)[GLOBAL_CONSTANTS.zeroth_index]}`
	// 					: imgData, 'jpeg', 0, 0, pdfWidth, pdfHeight);
	// 				if (!whiteout) {
	// 					pdf.addImage(FOOTER_IMAGES[Object.keys(item)[GLOBAL_CONSTANTS.zeroth_index]]
	// 						|| FOOTER_IMAGES[item], 'jpeg', 0, pdfHeight - 14, pdfWidth, 4.5);
	// 				}

	// 				if (download24) {
	// 					if (INCLUDE_TNC.includes(Object.keys(item)[GLOBAL_CONSTANTS.zeroth_index] || item)) {
	// 						pdf.addPage();
	// 						pdf.addImage(BACK_PAGE, 'jpeg', 0, 0, pdfWidth, pdfHeight);
	// 					} else {
	// 						pdf.addPage();
	// 					}
	// 				}
	// 				if (i < copiesValue.length - 1) {
	// 					pdf.addPage();
	// 				}
	// 			});
	// 			pdf.save(activeCategory === 'hawb' ? documentNumber : awbNumber);
	// 		});
	// 	} else {
	// 		html2canvas(document.getElementById('mawb')).then((canvas) => {
	// 			const imgData = canvas.toDataURL('image/jpeg');
	// 			const pdf = new JsPDF();
	// 			const pdfWidth = pdf.internal.pageSize.getWidth();
	// 			const pdfHeight = pdf.internal.pageSize.getHeight();
	// 			pdf.addImage(imgData, 'jpeg', 0, 0, pdfWidth, pdfHeight);
	// 			pdf.save(activeCategory === 'hawb' ? documentNumber : awbNumber);
	// 		});
	// 	}
	// 	setSaveDocument(false);
	// };
	// return (
	// 	<div className={styles.file_container}>
	// 		<Modal
	// 			onClose={() => { setBack(false); setViewDoc(false); }}
	// 			show={back || viewDoc}
	// 			animate={false}
	// 			className={styles.modal_container}
	// 			scroll
	// 			placement="center"
	// 		>
	// 			<Modal.Body style={{ minHeight: '90vh' }}>
	// 				<div className={styles.flex_col}>
	// 					{viewDoc
	// 	&& (
	// 		<div
	// 			className={styles.download_button_div}
	// 		>
	// 			<div style={{ marginRight: '36px', display: 'flex', alignItems: 'center' }}>
	// 				{documentState === 'document_accepted' && (
	// 					<div className={styles.flex} style={{ alignItems: 'center', margin: '0 8px' }}>
	// 						<Checkbox
	// 							label="Whiteout"
	// 							value={whiteout}
	// 							onChange={() => setWhiteout((p) => !p)}
	// 						/>
	// 						<Popover
	// 							placement="bottom"
	// 							trigger="click"
	// 							render={(
	// 								<SelectDocumentCopies
	// 									copiesValue={copiesValue}
	// 									copiesOnChange={copiesOnChange}
	// 									setSaveDocument={setSaveDocument}
	// 									handleView={handleView}
	// 									setGenerate={setGenerate}
	// 									setViewDoc={setViewDoc}
	// 									setEdit={setEdit}
	// 									setItem={setItem}
	// 									setDocCopies={setDocCopies}
	// 									setEditCopies={setEditCopies}
	// 									taskItem={taskItem}
	// 									download24
	// 								/>
	// 							)}
	// 						>
	// 							<Button
	// 								className="primary md"
	// 								disabled={saveDocument || whiteout}
	// 							>
	// 								Download 12 Copies with T&C
	// 							</Button>
	// 						</Popover>
	// 					</div>
	// 				)}
	// 				{documentState === 'document_accepted'
	// 					? (
	// 						<Popover
	// 							placement="bottom"
	// 							trigger="click"
	// 							render={(
	// 								<SelectDocumentCopies
	// 									copiesValue={copiesValue}
	// 									copiesOnChange={copiesOnChange}
	// 									setSaveDocument={setSaveDocument}
	// 									handleView={handleView}
	// 									setGenerate={setGenerate}
	// 									setViewDoc={setViewDoc}
	// 									setEdit={setEdit}
	// 									download24={false}
	// 									setItem={setItem}
	// 									setDocCopies={setDocCopies}
	// 									setEditCopies={setEditCopies}
	// 									taskItem={taskItem}
	// 								/>
	// 							)}
	// 						>
	// 							<Button
	// 								className="primary md"
	// 								disabled={saveDocument}
	// 							>
	// 								Download 12 Copies
	// 							</Button>
	// 						</Popover>
	// 					)

	// 					: (
	// 						<Button
	// 							className="primary md"
	// 							onClick={() => {
	// 								setSaveDocument(true);
	// 								handleView(false);
	// 							}}
	// 							disabled={saveDocument}
	// 						>
	// 							{saveDocument ? 'Downloading...' : DOWNLOAD_BUTTON[documentState]}
	// 						</Button>
	// 					)}
	// 			</div>
	// 		</div>
	// 	)}

	// 					<div
	// 						className={styles.flex_col}
	// 						id="mawb"
	// 						style={{
	// 							flex       : '1',
	// 							width      : '100%',
	// 							height     : '100%',
	// 							padding    : '25px 10px',
	// 							opacity    : 1,
	// 							background : '#fff',
	// 						}}
	// 					>
	// 						{/* {((viewDoc && documentState !==
	// 'document_accepted') || (!viewDoc && editCopies === null))
	// 		&& <Watermark text="draft" rotateAngle="315deg" />} */}

	// 						<div style={{ position: 'relative' }}>
	// 							<ShipperConsigneeDetails
	// 								formData={taskItem}
	// 								taskItem={taskItem}
	// 								whiteout={whiteout}
	// 								activeCategory={activeCategory}
	// 								edit={edit}
	// 								viewDoc={viewDoc}
	// 							/>
	// 							<ShipmentDetails
	// 								formData={taskItem}
	// 								whiteout={whiteout}
	// 								taskItem={taskItem}
	// 							/>
	// 							<ContainerDetails
	// 								formData={taskItem}
	// 								chargeableWeight={6}
	// 								whiteout={whiteout}
	// 							/>
	// 							<ChargeDetails
	// 								taskItem={taskItem}
	// 								footerValues={FOOTER_VALUES}
	// 								formData={taskItem}
	// 								whiteout={whiteout}
	// 								activeCategory={activeCategory}
	// 								edit={edit}
	// 								viewDoc={viewDoc}
	// 							/>
	// 						</div>
	// 					</div>

	// 					{/* {!viewDoc
	// 	&& (
	// 		<div
	// 			className={styles.button_div}
	// 		>
	// 			{edit || back ? (
	// 				<div style={{ marginRight: '20px' }}>
	// 					<Button
	// 						size="md"
	// 						onClick={() => {
	// 							handleClick();
	// 						}}
	// 						disabled={loading || saveDocument}
	// 					>
	// 						Edit
	// 					</Button>
	// 				</div>
	// 			) : null}
	// 			<div style={{ marginRight: '36px' }}>
	// 				<Button
	// 					size="md"
	// 					onClick={() => {
	// 						setSaveDocument(true);
	// 						handleSave();
	// 					}}
	// 					disabled={loading || saveDocument}
	// 				>
	// 					{loading || saveDocument ? 'Saving...' : 'Save'}
	// 				</Button>
	// 			</div>
	// 		</div>
	// 	)} */}
	// 				</div>
	// 			</Modal.Body>
	// 		</Modal>
	// 	</div>
	// );
}

export default AWBDocument;
