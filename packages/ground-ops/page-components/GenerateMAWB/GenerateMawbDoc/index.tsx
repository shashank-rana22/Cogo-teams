import { Button, Checkbox } from '@cogoport/components';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import React, { createRef, useState, ReactFragment } from 'react';
import { useScreenshot } from 'use-react-screenshot';

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

	const [, takeScreenShot] = useScreenshot();

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

	const getImage = (item) => {
		document.getElementById('footer').innerHTML = `${item}`;
		return takeScreenShot(document.getElementById('mawb'));
	};

	const handleView = async () => {
		if (taskItem.documentState === 'document_accepted') {
			const a = footerValues.map((item) => async () => {
				const newImage = await getImage(item);
				saveAs(newImage, `${item}-${taskItem.awbNumber.substring(9, 13)}`);
			});
			await a.map((i) => i());
		} else {
			const newImage = await takeImageScreenShot(document.getElementById('mawb'));
			saveAs(newImage, taskItem.awbNumber);
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
							<Checkbox
								label="Whiteout"
								value={whiteout}
								onChange={() => setWhiteout((p) => !p)}
							/>
						)}
						<Button
							className="primary md"
							onClick={() => {
								setSaveDocument(true);
								handleView();
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
					padding    : '40px 12px',
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
