import { Button, Checkbox, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';
import React, { useState } from 'react';

import { BACK_PAGE, FOOTER_IMAGES } from '../../../constants/image-copies';
import useUpdateIndividualEditing from '../../../hooks/useUpdateIndividualEditing';
import getFileObject from '../../../utils/getFileObject';
import useGetMediaUrl from '../../../utils/useGetMediaUrl';
import SelectDocumentCopies from '../SelectDocumentCopies';

import styles from './styles.module.css';

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
	setEditCopies = () => {},
}) {
	const [docCopies, setDocCopies] = useState(null);
	const [copiesValue, copiesOnChange] = useState([]);

	const {
		document_number: documentNumber, awbNumber, documentType, id,
		documentState, documentId, serviceId,
	} = taskItem || {};

	const { handleUpload } = useGetMediaUrl();

	const { updateIndividualEditing, loading } = useUpdateIndividualEditing({});

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
			data: {
				...taskItem,
				status          : 'generated',
				document_number : documentNumber,
				service_id      : serviceId,
				service_type    : 'air_freight_service',
			},
			id,
			documentId,
			documentType: documentType === 'draft_airway_bill'
				? 'draft_airway_bill' : 'draft_house_airway_bill',
			documentNumber,
			documentUrl: res || undefined,
		};
		updateIndividualEditing(payload);
		setSaveDocument(false);
	};

	const handleView = (download24) => {
		if (documentState === 'document_accepted') {
			html2canvas(document.getElementById('awb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();

				(docCopies || copiesValue || []).forEach((itm, i) => {
					pdf.addImage(Object.values(itm)[UPDATE_CHECK_INDEX] === 'updated'
						? `${Object.values(itm)[GLOBAL_CONSTANTS.zeroth_index]}`
						: imgData, 'jpeg', ZERO_COORDINATE, ZERO_COORDINATE, pdfWidth, pdfHeight);
					if (!whiteout) {
						pdf.addImage(
							FOOTER_IMAGES[Object.keys(itm)[GLOBAL_CONSTANTS.zeroth_index]]
							|| FOOTER_IMAGES[itm],
							'jpeg',
							ZERO_COORDINATE,
							pdfHeight - PDF_HEIGHT_ADJUST_VALUE,
							pdfWidth,
							PDF_SCALE,
						);
					}

					if (download24) {
						if (INCLUDE_TNC.includes(Object.keys(itm)[GLOBAL_CONSTANTS.zeroth_index] || itm)) {
							pdf.addPage();
							pdf.addImage(BACK_PAGE, 'jpeg', ZERO_COORDINATE, ZERO_COORDINATE, pdfWidth, pdfHeight);
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
		handleSave();
	};

	return (
		<div className={styles.download_button_div}>
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
									setViewDoc={setViewDoc}
									setEdit={setEdit}
									setItem={setItem}
									setDocCopies={setDocCopies}
									setEditCopies={setEditCopies}
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
									setEditCopies={setEditCopies}
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
