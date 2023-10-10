import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { TradeDocTemplate } from '@cogoport/ocean-modules';
import React, { useContext, useState, useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import styles from './styles.module.css';

const PRINT_TIME = 200;

function PrintDocument({ shipment_data = {}, primary_service = {}, show = {}, setShow = () => { }, data = {} }) {
	const { servicesList = [] } = useContext(ShipmentDetailContext);
	const printRef = useRef();
	const ref = useRef();
	const [watermarkText, setWatermarkText] = useState(null);

	const fcl_service = servicesList?.find(
		(service) => service?.service_type === 'fcl_freight_service',
	) || {};

	const movement_details = fcl_service?.movement_details
        || primary_service?.movement_details;

	const templateInitialValues = {
		port_of_loading   : primary_service?.origin_port?.display_name,
		port_of_discharge : primary_service?.destination_port?.display_name,
		consigner         : shipment_data?.importer_exporter?.business_name,
		vessel_number     : (movement_details || [])
			?.map((movment) => `${movment?.vessel}, ${movment?.voyage}`)
			.join(','),
		annexure_vessel_number: (movement_details || [])
			?.map((movment) => `${movment?.voyage}`)
			.join(','),
		annexure_vessel: (movement_details || [])
			?.map((movment) => `${movment?.vessel}`)
			.join(','),
		...(data || {}),
	};

	const handlePrint = useReactToPrint({
		content      : () => printRef?.current,
		onAfterPrint : () => setWatermarkText(null),
	});

	const handlePrintOnButton = (text) => {
		setWatermarkText(text);
		setTimeout(() => {
			handlePrint();
		}, PRINT_TIME);
	};

	function HeaderAction() {
		return (
			<header className={styles.header_action}>
				<p>Create House BL</p>
				<div>
					{primary_service?.bl_type !== 'seaway' && (
						<Button
							themeType="primary"
							onClick={() => handlePrintOnButton('Original')}
						>
							Print Original
						</Button>
					)}
					<Button
						themeType="primary"
						onClick={() => handlePrintOnButton('Non-Negotiable')}
					>
						Print Non-Negotiable
					</Button>
					<Button
						themeType="primary"
						onClick={() => handlePrintOnButton('draft')}
					>
						Print Draft
					</Button>
					<Button
						themeType="secondary"
						onClick={() => setShow(false)}
					>
						Close
					</Button>
				</div>
			</header>
		);
	}

	return (
		<div>
			<Modal
				size="fullscreen"
				show={show}
				onClose={() => setShow(false)}
				className={styles.custom_modal}
				showCloseIcon={false}
				closeOnOuterClick={false}
			>
				<Modal.Header title={HeaderAction()} />
				<Modal.Body>
					<div ref={printRef}>
						<TradeDocTemplate
							documentType="bluetide_hbl"
							mode="read"
							initialValues={templateInitialValues}
							ref={ref}
							watermark={watermarkText || 'draft'}
						/>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default forwardRef(PrintDocument);
