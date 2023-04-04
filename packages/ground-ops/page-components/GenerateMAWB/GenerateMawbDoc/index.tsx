import { Button, Checkbox } from '@cogoport/components';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';
import React, { createRef, useState, ReactFragment } from 'react';

import ChargeDetails from './ChargeDetails';
import ContainerDetails from './ContainerDetails';
import { footerValues } from './footerValues';
import getFileObject from './getFileObject';
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
}

const downloadButton = {
	document_accepted            : 'Download 12 Copies',
	document_uploaded            : 'Download',
	document_amendment_requested : 'Download',
};

const footerImages = [
	'https://cogoport-production.sgp1.digitaloceanspaces.com/1fcd0257b396ea304a7aebfeaceaee76/original_3.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/34f4ab91d2f08e432f5e99cec869e07b/original_2.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/30186a4d8094f78fffba0aeac1847cd0/original_1.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/5b6c3ea3e1a28d1c3060f835ad206e99/copy_9.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/1c5be0fc713882e9b85303b62d3f1ac8/copy_4.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/3a65756e817610ddf75769c89145eb84/copy_5.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/84eaddd1db3e444b25d1ce0066f19581/copy_6.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/ca3a74c08dd2aabcba392de64cd04ed6/copy_7.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/c56cba1039292819dd6d700d5d8f5d07/copy_8.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/94fec99404e921d7a1de47c30a4e5afa/copy_10.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/daabebf1b3ade5afb890dbc79ce3b9eb/copy_11.png',
	'https://cogoport-production.sgp1.digitaloceanspaces.com/7c2328f811865365b3c50d0fc23849fc/copy_12.png',
];

const backPage = 'https://cogoport-production.sgp1.digitaloceanspaces.com/8b7f9de6c16ef64db501a7e71dc7aa96/back.jpg';

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
}:Props) {
	const filteredData = { ...formData };

	const serialId = taskItem?.serialId || '';

	const { handleUpload } = useGetMediaUrl();
	const { upload, loading } = useCreateShipmentDocument({
		edit,
		setGenerate,
		setEdit,
	});

	const ref = createRef(null);

	const [saveDocument, setSaveDocument] = useState(false);

	const [whiteout, setWhiteout] = useState(false);

	const handleClick = () => {
		if (back) {
			setBack(!back);
		}
	};

	const takeImageScreenShot = async (node) => {
		const dataURI = await htmlToImage.toJpeg(node);
		return dataURI;
	};

	const downloadScreenshot = () => takeImageScreenShot(document.getElementById('mawb'));

	const handleSave = async () => {
		const newImage = await downloadScreenshot();
		const { file } = getFileObject(newImage, 'mawb.pdf');
		const res = await handleUpload('mawb.pdf', file);
		const payload = {
			shipment_id         : taskItem?.shipmentId,
			uploaded_by_org_id  : taskItem?.serviceProviderId,
			performed_by_org_id : taskItem?.serviceProviderId,
			document_type       : 'draft_airway_bill',
			id                  : taskItem?.documentId,
			service_id          : taskItem?.serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : edit === 'edit' ? undefined : taskItem?.id,
			data                : {
				...filteredData,
				status          : 'generated',
				document_number : taskItem?.awbNumber,
				service_id      : taskItem?.serviceId,
				service_type    : 'air_freight_service',
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
						document_number : taskItem?.awbNumber,
						service_id      : taskItem?.serviceId,
						service_type    : 'air_freight_service',
						...filteredData,
						status          : 'generated',
						bl_detail_id    : taskItem?.blDetailId,
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
				footerImages.forEach((item, i) => {
					pdf.addImage(imgData, 'jpeg', 0, 0, pdfWidth, pdfHeight);
					if (!whiteout) {
						pdf.addImage(item, 'jpeg', 0, pdfHeight - 14, pdfWidth, 4.5);
					}
					if (download24) {
						if (i < 3) {
							pdf.addPage();
							pdf.addImage(backPage, 'jpeg', 0, 0, pdfWidth, pdfHeight);
						} else {
							pdf.addPage();
						}
					}
					if (i < 11) {
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
		totalCharge: chargeableWeight * formData.ratePerKg,
		agentCharge,
		carrierCharge,
		finalCharge:
		chargeableWeight * formData.ratePerKg + agentCharge + carrierCharge,
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
								<Button
									className="primary md"
									onClick={() => {
										setSaveDocument(true);
										handleView(true);
									}}
									disabled={saveDocument || whiteout}
								>
									Download 12 Copies with T&C
								</Button>
							</div>
						)}
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
				{taskItem?.documentState !== 'document_accepted'
				&& <Watermark text="draft" rotateAngle="315deg" />}
				<div style={{ position: 'relative' }}>
					<ShipperConsigneeDetails
						formData={filteredData}
						taskItem={taskItem}
						whiteout={whiteout}
					/>
					<ShipmentDetails
						formData={filteredData}
						whiteout={whiteout}
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
