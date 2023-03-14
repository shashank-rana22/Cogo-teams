import React, { createRef, useState } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import Button from '@cogoport/front/components/admin/Button';
import { saveAs } from 'file-saver';
import Watermark from '@cogo/business-modules/components/trade-documents/TradeDocTemplate/commons/Watermark';
import getFileObject from './getFileObject';
import useGetMediaUrl from './useGetMediaUrl';
import useCreateShipmentDocument from './useCreateShipmentDocument';
import { Flex, FlexCol, ButtonContainer } from './styles';
import ShipperConsigneeDetails from './ShipperConsigneeDetails';
import ShipmentDetails from './ShipmentDetails';
import ContainerDetails from './ContainerDetails';
import ChargeDetails from './ChargeDetails';

const GenerateMawb = ({
	shipment_data = {},
	completeTask = () => {},
	task = {},
	details = {},
	viewDoc = false,
	setIsAmended = () => {},
	isAmended,
	formData = {},
	setBack = () => {},
	back = false,
	primary_service,
}) => {
	const [show, setShow] = useState(false);
	const filtered_data = { ...formData };

	const footer_values = [
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

	// eslint-disable-next-line no-unused-vars
	const [image, takeScreenShot] = useScreenshot();
	const serial_id = shipment_data?.serial_id || '';

	const { handleUpload } = useGetMediaUrl();
	const { upload, loading } = useCreateShipmentDocument({
		completeTask,
		isAmended,
	});

	const getImage = (item) => {
		document.getElementById(`footer`).innerHTML = `${item}`;
		return takeScreenShot(document.getElementById('mawb'));
	};
	const ref = createRef(null);

	const [saveDocument, setSaveDocument] = useState(false);

	const handleClick = () => {
		if (isAmended) {
			setIsAmended(false);
		}
		if (back) {
			setBack(!back);
		}
	};

	const handleView = async () => {
		const a = footer_values.map((item) => async () => {
			const newImage = await getImage(item);
			saveAs(newImage, item);
		});
		await a.map((i) => {
			return i();
		});
	};

	const handleSave = async () => {
		const newImage = await takeScreenShot(document.getElementById('mawb'));
		const { file } = getFileObject(newImage, 'mawb.pdf');
		const res = await handleUpload('mawb.pdf', file);
		const payload = {
			shipment_id: task?.shipment_id,
			uploaded_by_org_id: task?.organization_id,
			performed_by_org_id: task?.organization_id,
			document_type: 'draft_airway_bill',
			id: details?.id,
			service_id: task?.service_id,
			service_type: task?.service_type,
			data: {
				...filtered_data,
				status: 'generated',
				document_number: shipment_data?.booking_reference_number,
				service_id: shipment_data?.service_id,
				service_type: shipment_data?.service_type,
			},
			document_url: res || undefined,
			file_name:
				`Draft_Airway_Bill_For_Shipment_${serial_id}_${new Date().getTime()}` ||
				undefined,
			documents: [
				{
					file_name:
						`Draft_Airway_Bill_For_Shipment_${serial_id}_${new Date().getTime()}` ||
						undefined,
					document_url: res || undefined,
					data: {
						document_number: shipment_data?.booking_reference_number,
						service_id: shipment_data?.service_id,
						service_type: shipment_data?.service_type,
						...filtered_data,
						status: 'generated',
					},
				},
			],
		};

		upload({ payload });
		setSaveDocument(false);
	};
	const chargeable_weight = Math.max(
		primary_service?.weight,
		primary_service?.volume * 166.67,
	).toFixed(2);
	let agent_charge = 0;
	formData.agent_other_charges.forEach((item) => {
		agent_charge += Number(item.price);
	});
	let carrier_charge = 0;
	formData.carrier_other_charges.forEach((item) => {
		carrier_charge += Number(item.price);
	});
	const data = {
		total_charge: chargeable_weight * formData.rate_per_kg,
		agent_charge,
		carrier_charge,
		final_charge:
			chargeable_weight * formData.rate_per_kg + agent_charge + carrier_charge,
	};

	const isEligible = shipment_data?.stakeholder_types?.some((ele) =>
		['superadmin', 'service_ops2'].includes(ele),
	);

	return (
		<FlexCol>
			{viewDoc && (
				<ButtonContainer>
					{isEligible && (
						<Button
							className="primary md"
							onClick={() => {
								setSaveDocument(true);
								setShow(true);
								handleView();
							}}
							disabled={saveDocument}
						>
							{saveDocument ? 'Downloading...' : 'Download All 12 Copies'}
						</Button>
					)}
				</ButtonContainer>
			)}
			<FlexCol
				id="mawb"
				ref={ref}
				style={{
					flex: '1',
					width: '100%',
					padding: '37.5px',
					opacity: show ? 0.5 : 1,
				}}
			>
				{!viewDoc && <Watermark text="draft" rotateAngle="315deg" />}
				<div style={{ position: 'relative' }}>
					<ShipperConsigneeDetails
						formData={formData}
						primary_service={primary_service}
					/>
					<ShipmentDetails
						formData={formData}
						primary_service={primary_service}
					/>
					<ContainerDetails
						formData={formData}
						primary_service={primary_service}
						chargeable_weight={chargeable_weight}
					/>
					<ChargeDetails
						shipment_data={shipment_data}
						footer_values={footer_values}
						fields={formData}
						primary_service={primary_service}
						data={data}
					/>
				</div>
			</FlexCol>

			<Flex
				style={{
					justifyContent: 'flex-end',
					width: '100%',
				}}
			>
				{isAmended || back ? (
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
				{!viewDoc && (
					<>
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
					</>
				)}
			</Flex>
		</FlexCol>
	);
};

export default GenerateMawb;
