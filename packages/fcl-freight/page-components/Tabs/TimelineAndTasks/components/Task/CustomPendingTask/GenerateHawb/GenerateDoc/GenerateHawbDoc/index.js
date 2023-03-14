import React, { createRef, useEffect } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import { Button } from '@cogoport/front/components/admin';
import getFileObject from './getFileObject.js';
import useGetMediaUrl from './useGetMediaUrl.js';
import useCreateShipmentDocument from './useCreateShipmentDocument';
import { Flex, FlexCol } from './styles.js';
import ShipperConsigneeDetails from './ShipperConsigneeDetails';
import ShipmentDetails from './ShipmentDetails';
import ContainerDetails from './ContainerDetails';
import ChargeDetails from './ChargeDetails';

const GenerateMawb = ({
	generateData,
	shipment_data,
	completeTask = () => {},
}) => {
	const { data = {} } = generateData;

	const [image, takeScreenShot] = useScreenshot();
	const { data: docData = {} } = data;
	const serial_id = data?.serial_id || '';

	const { handleUpload } = useGetMediaUrl();
	const { upload, loading, active } = useCreateShipmentDocument({
		completeTask,
	});

	const getImage = () => takeScreenShot(ref.current);
	const ref = createRef(null);

	useEffect(() => {
		getImage();
	}, [JSON.stringify(ref.current)]);

	const handleClick = async () => {
		const { file } = getFileObject(image, 'mawb.pdf');

		const res = await handleUpload('mawb.pdf', file);
		const payload = {
			shipment_id: shipment_data?.id || undefined,
			document_type: 'draft_airway_bill',
			documents: [
				{
					document_url: res,
					file_name: `Draft_Airway_Bill_For_Shipment_${serial_id}_${new Date().getTime()}`,
					data: data || undefined,
				},
			],
			uploaded_by_user_id:
				shipment_data?.agent_id || shipment_data?.booking_agent_id || undefined,
			uploaded_by_org_id:
				shipment_data?.all_services[0]?.service_provider_id || undefined,
			org_account_type: 'service_provider',
			service_type: 'air_freight_services',
			service_id: shipment_data?.all_services[0]?.service_id || undefined,
		};

		await upload({ payload });
	};
	return (
		<FlexCol>
			<FlexCol
				ref={ref}
				style={{ flex: '1', width: '100%', padding: '37.5px' }}
			>
				<ShipperConsigneeDetails docData={docData} />
				<ShipmentDetails docData={docData} />
				<ContainerDetails docData={docData} />
				<ChargeDetails docData={docData} />
			</FlexCol>
			<Flex
				style={{ flex: 1, justifyContent: 'flex-end', paddingRight: '36px' }}
			>
				<Button
					size="md"
					onClick={handleClick}
					disabled={!image || loading || !active}
				>
					Save
				</Button>
			</Flex>
		</FlexCol>
	);
};

export default GenerateMawb;
