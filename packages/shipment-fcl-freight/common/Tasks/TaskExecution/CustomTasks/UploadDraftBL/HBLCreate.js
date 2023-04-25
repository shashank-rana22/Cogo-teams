// import { TradeDocTemplate } from '@cogo/business-modules/components/trade-documents';
import { Button, FullscreenModal } from '@cogoport/components';
import { forwardRef, useRef, useState } from 'react';

function HBLCreate({
	onSave = () => {},
	hblData,
	completed = false,
	// shipmentData = {},
	// primaryService = {},
}) {
	const [show, setShow] = useState(false);
	// const [mode, setMode] = useState('write');
	const ref = useRef();

	// id change

	// const movement_details =		primaryService?.movement_details
	// 	|| primaryService?.movement_detail
	// 	|| shipmentData?.movement_details
	// 	|| shipmentData?.movement_detail;

	// const templateInitialValues = {
	// 	port_of_loading   : shipmentData?.origin_port?.display_name,
	// 	port_of_discharge : shipmentData?.destination_port?.display_name,
	// 	consigner         : shipmentData?.importer_exporter?.business_name,
	// 	consignee:
	// 		shipmentData?.consignee_details?.company_name
	// 		|| shipmentData?.consignee_detail?.company_name,
	// 	vessel_number: (movement_details || [])
	// 		.map((movment) => `${movment?.vessel}, ${movment?.voyage}`)
	// 		.join(','),
	// 	annexure_vessel_number: (movement_details || [])
	// 		.map((movment) => `${movment?.voyage}`)
	// 		.join(','),
	// 	annexure_vessel: (movement_details || [])
	// 		.map((movment) => `${movment?.vessel}`)
	// 		.join(','),
	// 	...hblData,
	// };

	const handleSave = () => {
		ref?.current?.submit().then(onSave);
		setShow(false);
	};
	return (
		<div>
			{!completed ? (
				<div>
					<div>
						Click the following button to create a new draft HBL
					</div>
					<Button
						ghost={!!hblData}
						onClick={() => setShow(true)}
						size="sm"
						id="bm_pt_draf_hbl_create_btn"
					>
						{hblData ? 'Edit the draft HBL' : 'Create a new draft HBL'}
					</Button>
				</div>
			) : (
				<div>
					<div>
						Draft HBL is already uploaded, you can preview it here
					</div>
					<Button
						ghost={!!hblData}
						onClick={() => {
							setShow(true);
							// setMode('read');
						}}
						id="bm_pt_view_hbl_btn"
						size="sm"
					>
						View HBL
					</Button>
				</div>
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
				<div>
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
				</div>
			</FullscreenModal>
		</div>
	);
}

export default forwardRef(HBLCreate);
