import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

// import PrintDoc from '../../../UploadedDocuments/PrintDoc';

function Actions({
	// shipment_data,
	// showHbl,
	updateFreightCertificate,
	setUpdateFreightCertificate,
	// shipmentDocumentsRefetch,
	// updateAirwayBill,
	// setUpdateAirwayBill,
	// setShowHbl,
}) {
	const {
		general: { scope = '' },
	} = useSelector((state) => state);
	return (
		<>
			{/* {showHbl ? (
				<PrintDoc
					summary={shipment_data}
					services={shipment_data?.all_services || []}
					show={showHbl}
					setShow={setShowHbl}
				/>
			) : null} */}
			{updateFreightCertificate && (
				<Modal
					show={updateFreightCertificate}
					onClose={() => setUpdateFreightCertificate(false)}
					className="primary lg"
				>
					{/* <UpdateFreightCertificate
							setUpdateFreightCertificate={setUpdateFreightCertificate}
							refetch={shipmentDocumentsRefetch}
						/> */}
				</Modal>
			)}

		</>
	);
}

export default Actions;
