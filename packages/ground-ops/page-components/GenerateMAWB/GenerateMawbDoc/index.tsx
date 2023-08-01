import ChargeDetails from '@cogoport/air-modules/components/AWBTemplate/ChargeDetails';
import ContainerDetails from '@cogoport/air-modules/components/AWBTemplate/ContainerDetails';
import ShipmentDetails from '@cogoport/air-modules/components/AWBTemplate/ShipmentDetails';
import ShipperConsigneeDetails from '@cogoport/air-modules/components/AWBTemplate/ShipperConsigneeDetails';
import { Button, Checkbox, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';
import React, { createRef, useState, ReactFragment } from 'react';

import { footerValues } from '../Helpers/configurations/footerValues';
import { backPage, footerImages } from '../Helpers/configurations/imageCopies';
import useUpdateIndividualEditing from '../Helpers/hooks/useUpdateIndividualEditing';

import getFileObject from './getFileObject';
import SelectDocumentCopies from './SelectDocumentCopies';
import styles from './styles.module.css';
import useCreateShipmentDocument from './useCreateShipmentDocument';
import useGetMediaUrl from './useGetMediaUrl';

interface NestedObj {
	[key: string]: ReactFragment;
}

interface Props {
	taskItem?: NestedObj;
	formData?: NestedObj;
	setBack?: Function;
	back?: boolean;
	edit?: boolean | string;
	setEdit?: Function;
	viewDoc?: boolean;
	chargeableWeight?:number;
	setGenerate?:Function;
	activeCategory?: string;
	hawbDetails?: Array<NestedObj>;
	activeHawb?: NestedObj;
	setHawbDetails?:Function;
	setActiveHawb?: Function;
	setActiveKey?: Function;
	pendingTaskId?: string;
	category?: string;
	setViewDoc?: Function;
	setItem?: Function;
	editCopies?: string;
	setEditCopies?: Function;
}

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

function GenerateMawb({
	taskItem = {},
	formData = {},
	setBack = () => {},
	back = false,
	edit = false,
	setEdit = () => {},
	viewDoc = false,
	chargeableWeight = 0,
	setGenerate = () => {},
	activeCategory = 'mawb',
	hawbDetails = [],
	setHawbDetails = () => {},
	activeHawb = {},
	setActiveHawb = () => {},
	setActiveKey = () => {},
	pendingTaskId = '',
	category = 'mawb',
	setViewDoc = () => {},
	setItem = () => {},
	editCopies = '',
	setEditCopies = () => {},
}:Props) {
	const filteredData = { ...formData };

	const {
		id, serialId = '', documentId: docId, documentType, awbNumber, state, documentState, blDetailId,
		document_number: documentNumber, serviceId, shipment_id: pendingShipmentId, shipmentId, serviceProviderId,
	} = taskItem;

	const { handleUpload } = useGetMediaUrl();

	const ref = createRef(null);

	const [saveDocument, setSaveDocument] = useState(false);

	const [whiteout, setWhiteout] = useState(false);

	const [copiesValue, copiesOnChange] = useState<string[]>([]);
	const [docCopies, setDocCopies] = useState(null);

	const handleClick = () => {
		if (back) {
			setBack(!back);
		}
	};

	const { upload, loading } = useCreateShipmentDocument({
		edit,
		setGenerate,
		setEdit,
		activeCategory,
		hawbDetails,
		setHawbDetails,
		setActiveHawb,
		setActiveKey,
		handleClick,
		activeHawb,
	});

	const { updateIndividualEditing } = useUpdateIndividualEditing({
		setGenerate,
		setEdit,
	});

	const takeImageScreenShot = async (node) => {
		const dataURI = await htmlToImage.toJpeg(node);
		return dataURI;
	};

	console.log('category', category);

	const downloadScreenshot = () => takeImageScreenShot(document.getElementById('mawb'));

	const documentId = category === 'mawb' ? docId : id;
	const mawbPendingTaskId = edit === 'edit' ? undefined : pendingTaskId;
	const hawbPendingTaskId = state === 'document_amendment_requested' ? taskItem?.taskId : undefined;

	const handleSave = async () => {
		const newImage = await downloadScreenshot();
		const { file } = getFileObject(newImage, 'mawb.pdf');
		const res = await handleUpload('mawb.pdf', file);
		const payload = {
			shipment_id         : shipmentId || pendingShipmentId,
			uploaded_by_org_id  : serviceProviderId,
			performed_by_org_id : serviceProviderId,
			document_type       : activeCategory === 'mawb' ? 'draft_airway_bill' : 'draft_house_airway_bill',
			id                  : documentId,
			service_id          : serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : category === 'mawb' || activeCategory === 'mawb'
				? mawbPendingTaskId : hawbPendingTaskId,
			data: {
				...filteredData,
				status          : 'generated',
				document_number : activeCategory === 'hawb'
					? formData?.document_number || activeHawb?.documentNo : awbNumber,
				service_id      : serviceId,
				service_type    : 'air_freight_service',
				handedOverForTd : false,
			},
			document_url: res || undefined,
			file_name:
				`Draft_Airway_Bill_For_Shipment_${serialId}_${new Date().getTime()}`
				|| undefined,
			documents: [
				{
					file_name:
						`Draft_Airway_Bill_For_Shipment_${serialId}_${new Date().getTime()}`
						|| undefined,
					document_url : res || undefined,
					data         : {
						document_number: activeCategory === 'hawb'
							? formData?.document_number || activeHawb?.documentNo : awbNumber,
						service_id      : serviceId,
						service_type    : 'air_freight_service',
						...filteredData,
						status          : 'generated',
						bl_detail_id    : blDetailId,
						handedOverForTd : false,
					},
				},
			],
		};

		const individualCopyPayload = {
			id,
			documentId   : docId,
			documentType : documentType === 'draft_airway_bill'
				? 'draft_airway_bill' : 'draft_house_airway_bill',
			documentNumber,
			data: {
				...filteredData,
				status          : 'generated',
				document_number : documentNumber,
				service_id      : serviceId,
				service_type    : 'air_freight_service',
			},
			documentUrl: res || undefined,
		};

		if (editCopies) {
			updateIndividualEditing(individualCopyPayload);
		} else {
			upload({ payload });
		}

		setSaveDocument(false);
	};

	const handleView = (download24) => {
		if (documentState === 'document_accepted') {
			html2canvas(document.getElementById('mawb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();

				(docCopies || copiesValue || []).forEach((item, i) => {
					pdf.addImage(Object.values(item)[UPDATE_CHECK_INDEX] === 'updated'
						? `${Object.values(item)[GLOBAL_CONSTANTS.zeroth_index]}`
						: imgData, 'jpeg', ZERO_COORDINATE, ZERO_COORDINATE, pdfWidth, pdfHeight);
					if (!whiteout) {
						pdf.addImage(
							footerImages[Object.keys(item)[GLOBAL_CONSTANTS.zeroth_index]]
							|| footerImages[item],
							'jpeg',
							ZERO_COORDINATE,
							pdfHeight - PDF_HEIGHT_ADJUST_VALUE,
							pdfWidth,
							PDF_SCALE,
						);
					}

					if (download24) {
						if (INCLUDE_TNC.includes(Object.keys(item)[GLOBAL_CONSTANTS.zeroth_index] || item)) {
							pdf.addPage();
							pdf.addImage(backPage, 'jpeg', ZERO_COORDINATE, ZERO_COORDINATE, pdfWidth, pdfHeight);
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
			html2canvas(document.getElementById('mawb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();
				pdf.addImage(imgData, 'jpeg', ZERO_COORDINATE, ZERO_COORDINATE, pdfWidth, pdfHeight);
				pdf.save(category === 'hawb' ? documentNumber : awbNumber);
			});
		}
		setSaveDocument(false);
	};

	let agentCharge = 0;
	formData?.agentOtherCharges?.forEach((item) => {
		agentCharge += Number(item.price);
	});
	let carrierCharge = 0;
	formData?.carrierOtherCharges?.forEach((item) => {
		carrierCharge += Number(item.price);
	});
	const data = {
		totalCharge: Number(formData.amount),
		agentCharge,
		carrierCharge,
		finalCharge:
		Number(formData.amount) + agentCharge + carrierCharge,
	};

	return (
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
				ref={ref}
				style={{
					flex       : '1',
					width      : '100%',
					height     : '100%',
					padding    : '40px 40px',
					opacity    : 1,
					background : '#fff',
				}}
			>

				<div style={{ position: 'relative' }}>
					<ShipperConsigneeDetails
						formData={filteredData}
						taskItem={taskItem}
						whiteout={whiteout}
						activeCategory={activeCategory}
						edit={edit}
						viewDoc={viewDoc}
						activeHawb={activeHawb}
					/>
					<ShipmentDetails
						formData={filteredData}
						whiteout={whiteout}
						taskItem={taskItem}
					/>
					<ContainerDetails
						formData={filteredData}
						chargeableWeight={chargeableWeight}
						whiteout={whiteout}
					/>
					<ChargeDetails
						taskItem={taskItem}
						footerValues={footerValues}
						formData={filteredData}
						data={data}
						whiteout={whiteout}
						activeCategory={activeCategory}
						edit={edit}
						viewDoc={viewDoc}
						activeHawb={activeHawb}
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
								size="md"
								onClick={() => {
									handleClick();
								}}
								disabled={loading || saveDocument}
							>
								Edit
							</Button>
						</div>
					) : null}
					<div style={{ marginRight: '36px' }}>
						<Button
							size="md"
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
	);
}

export default GenerateMawb;
