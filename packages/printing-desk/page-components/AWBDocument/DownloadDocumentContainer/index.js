import { cl, Button, Checkbox, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';
import React, { useState } from 'react';

import useUpdateShipmentDocument from '../../../hooks/useUpdateShipmentDocument';
import getFileObject from '../../../utils/getFileObject';
import useGetMediaUrl from '../../../utils/useGetMediaUrl';
import SelectDocumentCopies from '../SelectDocumentCopies';

import styles from './styles.module.css';

const { image_url } = GLOBAL_CONSTANTS;

const DOWNLOAD_BUTTON = {
	document_accepted            : 'Download 12 Copies',
	document_uploaded            : 'Download',
	document_amendment_requested : 'Download',
};

const INCLUDE_TNC = ['original_3', 'original_2', 'original_1'];

const ZERO_COORDINATE = 0;
const UPDATE_CHECK_INDEX = 1;
const PDF_HEIGHT_ADJUST_VALUE = 14;
const PDF_SCALE = 4.5;
const TWELEVE_COPIES_LAST_INDEX = 1;

function DownloadDocumentContainer({
	whiteout = false,
	setWhiteout = () => {},
	saveDocument = false,
	setSaveDocument = () => {},
	setEdit = () => {},
	category = 'mawb',
	taskItem = {},
	setViewDoc = () => {},
	setItem = () => {},
}) {
	const [docCopies, setDocCopies] = useState([]);
	const [copiesValue, copiesOnChange] = useState([]);

	const {
		document_number: documentNumber, awbNumber, documentType, shipmentId, pendingShipmentId,
		documentState, documentId, serviceId, blCategory,
	} = taskItem || {};

	const { handleUpload } = useGetMediaUrl();

	const { updateShipment, loading } = useUpdateShipmentDocument({});

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
			...taskItem,
			id           : documentId,
			shipmentId   : shipmentId || pendingShipmentId,
			documentType : documentType === 'draft_airway_bill'
				? 'draft_airway_bill' : 'draft_house_airway_bill',
			serviceId,
			documentUrl: res || undefined,
		};
		updateShipment({ payload }).then(() => {
			setSaveDocument(false);
		});
	};

	const handleView = (download24) => {
		if (documentState === 'document_accepted') {
			html2canvas(document.getElementById('awb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();

				const copiesArray = isEmpty(docCopies) ? copiesValue : docCopies;

				(copiesArray || []).forEach((itm, i) => {
					pdf.addImage(Object.values(itm)[UPDATE_CHECK_INDEX] === 'updated'
						? `${Object.values(itm)[GLOBAL_CONSTANTS.zeroth_index]}`
						: imgData, 'jpeg', ZERO_COORDINATE, ZERO_COORDINATE, pdfWidth, pdfHeight);
					if (!whiteout) {
						pdf.addImage(
							image_url.awb_docs_images[Object.keys(itm)[GLOBAL_CONSTANTS.zeroth_index]]
							|| image_url.awb_docs_images[itm],
							'jpeg',
							ZERO_COORDINATE,
							pdfHeight - PDF_HEIGHT_ADJUST_VALUE,
							pdfWidth,
							PDF_SCALE,
						);
					}

					if (download24) {
						if (INCLUDE_TNC.includes(itm)) {
							pdf.addPage();
							pdf.addImage(
								image_url.awb_docs_tnc_page,
								'jpeg',
								ZERO_COORDINATE,
								ZERO_COORDINATE,
								pdfWidth,
								pdfHeight,
							);
						} else {
							pdf.addPage();
						}
					}
					if (i < copiesValue.length - TWELEVE_COPIES_LAST_INDEX) {
						pdf.addPage();
					}
				});
				pdf.save(category === 'hawb' ? documentNumber : awbNumber);
			});
		} else {
			html2canvas(document.getElementById('awb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();
				pdf.addImage(imgData, 'jpeg', ZERO_COORDINATE, ZERO_COORDINATE, pdfWidth, pdfHeight);
				pdf.save(category === 'hawb' ? documentNumber : awbNumber);
			});
		}
		if (blCategory === 'hawb') {
			handleSave();
		}
	};

	return (
		<div className={styles.download_button_div}>
			<div className={styles.button_flex}>
				{documentState === 'document_accepted' && (
					<div className={cl`${styles.flex} ${styles.whiteout}`}>
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
									setViewDoc={setViewDoc}
									setEdit={setEdit}
									setItem={setItem}
									setDocCopies={setDocCopies}
									taskItem={taskItem}
									loading={loading}
									download24
								/>
							)}
						>
							<Button
								className="primary md"
								disabled={saveDocument || loading || whiteout}
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
									setViewDoc={setViewDoc}
									setEdit={setEdit}
									download24={false}
									setItem={setItem}
									setDocCopies={setDocCopies}
									taskItem={taskItem}
									loading={loading}
								/>
							)}
						>
							<Button
								className="primary md"
								disabled={saveDocument || loading}
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
	);
}

export default DownloadDocumentContainer;
