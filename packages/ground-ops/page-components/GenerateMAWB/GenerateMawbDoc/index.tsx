import { Button } from '@cogoport/components';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import React, { createRef, useState } from 'react';
// import { useScreenshot } from 'use-react-screenshot';

import ChargeDetails from './ChargeDetails';
import ContainerDetails from './ContainerDetails';
import getFileObject from './getFileObject';
import ShipmentDetails from './ShipmentDetails';
import ShipperConsigneeDetails from './ShipperConsigneeDetails';
import styles from './styles.module.css';
import useCreateShipmentDocument from './useCreateShipmentDocument';
import useGetMediaUrl from './useGetMediaUrl';
import Watermark from './watermark';

interface Props {
	taskItem?: any;
	formData?: any;
	setBack?: any;
	back?: boolean;
	edit?: boolean;
	setEdit?: any;
	viewDoc?: boolean;
}

// function camelToUnderscore(key) {
// 	const result = key.replace(/([A-Z])/g, ' $1');
// 	return result.split(' ').join('_').toLowerCase();
// }

function GenerateMawb({
	taskItem = {},
	formData = {},
	setBack = () => {},
	back = false,
	edit = false,
	setEdit = () => {},
	viewDoc = false,
}:Props) {
	const filteredData = { ...formData };

	// const filteredData = {};

	// Object.keys(filteredFormData).forEach((control) => {
	// 	filteredData[camelToUnderscore(control)] = filteredFormData[control];
	// });

	const footerValues = [
		'COPY 12(FOR CUSTOMS)',
		'COPY 11(EXTRA COPY FOR CARRIER)',
		'COPY 10(EXTRA COPY FOR CARRIER)',
		'COPY 9(FOR AGENT)',
		'COPY 8(FOR FIRST CARRIER)',
		'COPY 7(FOR SECOND CARRIER)',
		'COPY 6(FOR THIRD CARRIER)',
		'COPY 5(FOR AIRPORT OF DESTINATION)',
		'COPY 4(DELIVERY RECEIPT)',
		'ORIGINAL 3 (FOR SHIPPER)',
		'ORIGINAL 2 (FOR CONSIGNEE)',
		'ORIGINAL 1 (FOR ISSUING CARRIER)',
	];

	// const [, takeScreenShot] = useScreenshot();

	const serialId = taskItem?.serialId || '';

	const { handleUpload } = useGetMediaUrl();
	const { upload, loading } = useCreateShipmentDocument({
		edit,
	});

	const ref = createRef(null);

	const [saveDocument, setSaveDocument] = useState(false);

	const handleClick = () => {
		if (edit) {
			setEdit(false);
		}
		if (back) {
			setBack(!back);
		}
	};

	const takeScreenShot = async (node) => {
		const dataURI = await htmlToImage.toJpeg(node);
		return dataURI;
	};

	const downloadScreenshot = () => takeScreenShot(document.getElementById('mawb'));

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
			pending_task_id     : taskItem?.id,
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

	const getImage = (item) => {
		document.getElementById('footer').innerHTML = `${item}`;
		return takeScreenShot(document.getElementById('mawb'));
	};

	const handleView = async () => {
		const a = footerValues.map((item) => async () => {
			const newImage = await getImage(item);
			saveAs(newImage, item);
		});
		await a.map((i) => i());
	};

	const chargeableWeight:any = Math.max(
		taskItem?.weight,
		// eslint-disable-next-line no-unsafe-optional-chaining
		taskItem?.volume * 166.67,
	).toFixed(2);
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
					<div style={{ marginRight: '36px' }}>
						<Button
							className="primary md"
							onClick={() => {
								setSaveDocument(true);
								handleView();
							}}
							disabled={saveDocument}
						>
							{saveDocument ? 'Downloading...' : 'Download All 12 Copies'}
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
					padding    : '40px 12px',
					opacity    : 1,
					background : '#fff',
				}}
			>
				{!viewDoc && <Watermark text="draft" rotateAngle="315deg" />}
				<div style={{ position: 'relative' }}>
					<ShipperConsigneeDetails
						formData={formData}
						taskItem={taskItem}
					/>
					<ShipmentDetails
						formData={formData}
						taskItem={taskItem}
					/>
					<ContainerDetails
						formData={formData}
						taskItem={taskItem}
						chargeableWeight={chargeableWeight}
					/>
					<ChargeDetails
						taskItem={taskItem}
						footerValues={footerValues}
						formData={formData}
						data={data}
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
