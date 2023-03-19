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
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/9bf65ee5f87f383fd612574809c21b85/original_1.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/55426b1530eb9c0d272e491af27f16da/original_2.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/f650b721142c5de616a36381e7723014/original_3.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/cf352e6c9dcf0a0eed8a58e7a55fb0bd/copy_4.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/0069e2c6d0daa0ed87814689b4a8673f/copy_5.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/636788e34c112b953e029cea9806d5b9/copy_6.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/c899bf071ae1c48a23264dd8d5052bfc/copy_7.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/0d9c8b964599995b33c5356d2428710c/copy_8.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/64981914a969cd4fe6080f7a7c5436b6/copy_9.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/a3edb2c53a522535daf635828404fcd2/copy_10.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/3b928e4b64bef2ad32d016126d601441/copy_11.png',
	'https://cogoport-testing.sgp1.digitaloceanspaces.com/392325f9bce20900c697414a06a8c2b1/copy_12.png',
];

const backPage = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/3655f8ae312e5307f166cbf187069cde/back.jpg';

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
		if (edit) {
			setEdit(false);
		}
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
				const imgData = canvas.toDataURL('image/png');
				const pdf = new JsPDF();
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();
				footerImages.forEach((item, i) => {
					pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
					if (!whiteout) {
						pdf.addImage(
							item,
							'PNG',
							0,
							pdfHeight - 14,
							pdfWidth,
							4.5,
						);
					}

					if (download24) {
						pdf.addPage();
						pdf.addImage(
							backPage,
							'PNG',
							0,
							0,
							pdfWidth,
							pdfHeight,
						);
					}
					if (i < 11) {
						pdf.addPage();
					}
				});
				pdf.save(taskItem.awbNumber);
			});
		} else {
			html2canvas(document.getElementById('mawb')).then((canvas) => {
				const imgData = canvas.toDataURL('image/png');
				const pdf = new JsPDF();
				const imgProps = pdf.getImageProperties(canvas);
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
				pdf.addImage(imgData, 'PNG', 0, -5, pdfWidth, pdfHeight);
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
						taskItem={taskItem}
						whiteout={whiteout}
					/>
					<ContainerDetails
						formData={filteredData}
						taskItem={taskItem}
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
