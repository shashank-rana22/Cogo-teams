import { Button, Checkbox, Popover } from '@cogoport/components';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';
import React, { createRef, useState, ReactFragment } from 'react';

import { footerValues } from '../Helpers/configurations/footerValues';
import { backPage, footerImages } from '../Helpers/configurations/imageCopies';

import ChargeDetails from './ChargeDetails';
import ContainerDetails from './ContainerDetails';
import getFileObject from './getFileObject';
import SelectDocumentCopies from './SelectDocumentCopies';
import ShipmentDetails from './ShipmentDetails';
import ShipperConsigneeDetails from './ShipperConsigneeDetails';
import styles from './styles.module.css';
import useCreateShipmentDocument from './useCreateShipmentDocument';
import useGetMediaUrl from './useGetMediaUrl';
import Watermark from './watermark';

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
	hawbDetails?: Array<string>;
	activeHawb?: NestedObj;
	setHawbDetails?:Function;
	setActiveHawb?: Function;
	setActiveKey?: Function;
	pendingTaskId?: string;
	category?: string;
	setViewDoc?: Function;
}

const downloadButton = {
	document_accepted            : 'Download 12 Copies',
	document_uploaded            : 'Download',
	document_amendment_requested : 'Download',
};

const includeTnC = ['original_3', 'original_2', 'original_1'];

function GenerateMawb({
	taskItem = {},
	formData = {},
	setBack = () => {},
	back = false,
	edit,
	setEdit = () => {},
	viewDoc = false,
	chargeableWeight,
	setGenerate = () => {},
	activeCategory = 'mawb',
	hawbDetails = [],
	setHawbDetails = () => {},
	activeHawb = {},
	setActiveHawb,
	setActiveKey,
	pendingTaskId = '',
	category = 'mawb',
	setViewDoc = () => {},
}:Props) {
	const filteredData = { ...formData };

	const serialId = taskItem?.serialId || '';

	const { handleUpload } = useGetMediaUrl();

	const ref = createRef(null);

	const [saveDocument, setSaveDocument] = useState(false);

	const [whiteout, setWhiteout] = useState(false);

	const [copiesValue, copiesOnChange] = useState<string[]>([]);

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

	const takeImageScreenShot = async (node) => {
		const dataURI = await htmlToImage.toJpeg(node);
		return dataURI;
	};

	const downloadScreenshot = () => takeImageScreenShot(document.getElementById('mawb'));

	const documentId = category === 'mawb' ? taskItem?.documentId : taskItem?.id;
	const mawbPendingTaskId = edit === 'edit' ? undefined : pendingTaskId;
	const hawbPendingTaskId = taskItem.state === 'document_amendment_requested' ? pendingTaskId : undefined;

	const handleSave = async () => {
		const newImage = await downloadScreenshot();
		const { file } = getFileObject(newImage, 'mawb.pdf');
		const res = await handleUpload('mawb.pdf', file);
		const payload = {
			shipment_id         : taskItem?.shipmentId || taskItem?.shipment_id,
			uploaded_by_org_id  : taskItem?.serviceProviderId,
			performed_by_org_id : taskItem?.serviceProviderId,
			document_type       : activeCategory === 'mawb' ? 'draft_airway_bill' : 'draft_house_airway_bill',
			id                  : documentId,
			service_id          : taskItem?.serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : category === 'mawb' || activeCategory === 'mawb'
				? mawbPendingTaskId : hawbPendingTaskId,
			data: {
				...filteredData,
				status          : 'generated',
				document_number : activeCategory === 'hawb'
					? formData?.document_number || activeHawb?.documentNo : taskItem?.awbNumber,
				service_id   : taskItem?.serviceId,
				service_type : 'air_freight_service',
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
							? formData?.document_number || activeHawb?.documentNo : taskItem?.awbNumber,
						service_id   : taskItem?.serviceId,
						service_type : 'air_freight_service',
						...filteredData,
						status       : 'generated',
						bl_detail_id : taskItem?.blDetailId,
					},
				},
			],
		};

		upload({ payload });
		setSaveDocument(false);
	};

	const handleView = (download24) => {
		if (taskItem.documentState === 'document_accepted') {
			html2canvas(document.getElementById('mawb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();
				(copiesValue || []).forEach((item, i) => {
					pdf.addImage(imgData, 'jpeg', 0, 0, pdfWidth, pdfHeight);
					if (!whiteout) {
						pdf.addImage(footerImages[item], 'jpeg', 0, pdfHeight - 14, pdfWidth, 4.5);
					}

					if (download24) {
						if (includeTnC.includes(item)) {
							pdf.addPage();
							pdf.addImage(backPage, 'jpeg', 0, 0, pdfWidth, pdfHeight);
						} else {
							pdf.addPage();
						}
					}
					if (i < copiesValue.length - 1) {
						pdf.addPage();
					}
				});
				pdf.save(taskItem.awbNumber);
			});
		} else {
			html2canvas(document.getElementById('mawb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/jpeg');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();
				pdf.addImage(imgData, 'jpeg', 0, 0, pdfWidth, pdfHeight);
				pdf.save(taskItem.awbNumber);
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
						{taskItem.documentState === 'document_accepted' && (
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
						{taskItem.documentState === 'document_accepted'
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
											download24={false}
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
									{saveDocument ? 'Downloading...' : downloadButton[taskItem.documentState]}
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
				{taskItem?.documentState !== 'document_accepted' && <Watermark text="draft" rotateAngle="315deg" />}
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
