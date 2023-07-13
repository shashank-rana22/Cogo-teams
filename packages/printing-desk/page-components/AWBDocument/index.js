import ChargeDetails from '@cogoport/air-modules/components/AWBTemplate/ChargeDetails/index.tsx';
import ContainerDetails from '@cogoport/air-modules/components/AWBTemplate/ContainerDetails/index.tsx';
import ShipmentDetails from '@cogoport/air-modules/components/AWBTemplate/ShipmentDetails/index.tsx';
import ShipperConsigneeDetails from '@cogoport/air-modules/components/AWBTemplate/ShipperConsigneeDetails/index.tsx';
import { cl, Button } from '@cogoport/components';
import * as htmlToImage from 'html-to-image';
import React, { createRef, useState } from 'react';

import Modal from '../../common/Modal';
import { FOOTER_VALUES } from '../../constants/footer-values';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';

import getFileObject from './getFileObject';
import styles from './styles.module.css';
import TopButtonContainer from './TopButtonContainer';
import useGetMediaUrl from './useGetMediaUrl';
import Watermark from './watermark';

function AWBDocument({
	item = {},
	viewDoc = false,
	formData = {},
	setGenerate = () => {},
	setViewDoc = () => {},
	edit = false,
	setEdit = () => {},
	setItem = () => {},
	back = false,
	setBack = () => {},
}) {
	const [whiteout, setWhiteout] = useState(false);
	const [saveDocument, setSaveDocument] = useState(false);
	const [editCopies, setEditCopies] = useState('');

	const ref = createRef(null);

	const { documentData } = item || {};

	const taskItem = {
		...item,
		...documentData,
		...formData,
	};

	const {
		documentId, documentType = 'mawb', documentState,
		serviceId, shipment_id: pendingShipmentId, shipmentId,
	} = taskItem;

	const { handleUpload } = useGetMediaUrl();

	const { updateShipment, loading } = useUpdateShipmentDocument();

	const category = documentType === 'draft_airway_bill'
		? 'mawb' : 'hawb';

	const takeImageScreenShot = async (node) => {
		const dataURI = await htmlToImage.toJpeg(node);
		return dataURI;
	};

	const downloadScreenshot = () => takeImageScreenShot(document.getElementById('awb'));

	const handleSave = async () => {
		const newImage = await downloadScreenshot();
		const { file } = getFileObject(newImage, 'mawb.pdf');
		const res = await handleUpload('awb.pdf', file);
		const payload = {
			id            : documentId,
			shipment_id   : shipmentId || pendingShipmentId,
			...formData,
			document_type : category === 'mawb' ? 'draft_airway_bill' : 'draft_house_airway_bill',
			serviceId,
			documentUrl   : res || undefined,
		};

		// const individualCopyPayload = {
		// 	id,
		// 	documentId   : docId,
		// 	documentType : documentType === 'draft_airway_bill'
		// 		? 'draftairway_bill' : 'draft_house_airway_bill',
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
			{(back || viewDoc) && (
				<Modal
					onClose={() => { setBack(false); setViewDoc(false); }}
					style={{ width: '900px', height: '92vh' }}
				>
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
							id="awb"
							ref={ref}
						>
							{((viewDoc && documentState !== 'document_accepted') || (!viewDoc && editCopies === ''))
									&& <Watermark text="draft" rotateAngle="315deg" />}

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
						)}
					</div>
				</Modal>
			)}
		</div>
	);
}

export default AWBDocument;
