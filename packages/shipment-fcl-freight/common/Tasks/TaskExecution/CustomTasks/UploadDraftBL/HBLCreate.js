// import { TradeDocTemplate } from '@cogo/business-modules/components/trade-documents';
import { Button, Flex, FullscreenModal, Text } from '@cogoport/components';
import { forwardRef, useRef, useState } from 'react';

function HBLCreate({
	onSave = () => {},
	hblData,
	completed = false,
	summary = {},
	services = [],
}) {
	const [show, setShow] = useState(false);
	const [mode, setMode] = useState('write');
	const ref = useRef();

	// id change

	const fcl_or_lcl_service =		services.find(
		(service) => service?.service_type === 'fcl_freight_service'
				|| service?.service_type === 'lcl_freight_service',
	) || {};

	const movement_details =		fcl_or_lcl_service?.movement_details
		|| fcl_or_lcl_service?.movement_detail
		|| summary?.movement_details
		|| summary?.movement_detail;

	const templateInitialValues = {
		port_of_loading   : summary?.origin_port?.display_name,
		port_of_discharge : summary?.destination_port?.display_name,
		consigner         : summary?.importer_exporter?.business_name,
		consignee:
			summary?.consignee_details?.company_name
			|| summary?.consignee_detail?.company_name,
		vessel_number: (movement_details || [])
			.map((movment) => `${movment?.vessel}, ${movment?.voyage}`)
			.join(','),
		annexure_vessel_number: (movement_details || [])
			.map((movment) => `${movment?.voyage}`)
			.join(','),
		annexure_vessel: (movement_details || [])
			.map((movment) => `${movment?.vessel}`)
			.join(','),
		...hblData,
	};

	const handleSave = () => {
		ref?.current?.submit().then(onSave);
		setShow(false);
	};
	return (
		<div>
			{!completed ? (
				<Flex display="block">
					<Text marginBottom={8}>
						Click the following button to create a new draft HBL
					</Text>
					<Button
						ghost={!!hblData}
						onClick={() => setShow(true)}
						size="sm"
						id="bm_pt_draf_hbl_create_btn"
					>
						{hblData ? 'Edit the draft HBL' : 'Create a new draft HBL'}
					</Button>
				</Flex>
			) : (
				<Flex display="block">
					<Text marginBottom={8}>
						Draft HBL is already uploaded, you can preview it here
					</Text>
					<Button
						ghost={!!hblData}
						onClick={() => {
							setShow(true);
							setMode('read');
						}}
						id="bm_pt_view_hbl_btn"
						size="sm"
					>
						View HBL
					</Button>
				</Flex>
			)}
			<FullscreenModal
				heading="Create House BL"
				headerActions={
					!completed ? (
						<Button
							style={{ marginLeft: 8 }}
							onClick={handleSave}
							size="sm"
							id="bm_pt_draf_hbl_save_btn"
						>
							Save
						</Button>
					) : null
				}
				show={show}
				setShow={setShow}
			>
				<Flex
					style={{ overflow: 'auto' }}
					bgColor="#E0E0E0"
					padding={16}
					justifyContent="center"
				>
					{/* <TradeDocTemplate
						ref={ref}
						mode={mode}
						documentType="bluetide_hbl"
						initialValues={templateInitialValues}
						summary={summary}
						service={fcl_or_lcl_service}
						watermark="draft"
					/> */}
					THis is trade doc
				</Flex>
			</FullscreenModal>
		</div>
	);
}

export default forwardRef(HBLCreate);
