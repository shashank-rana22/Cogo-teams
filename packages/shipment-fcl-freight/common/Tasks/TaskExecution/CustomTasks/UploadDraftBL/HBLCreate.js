import { Button, Modal } from '@cogoport/components';
import { TradeDocTemplate } from '@cogoport/ocean-modules';
import { omit } from '@cogoport/utils';
import { forwardRef, useRef, useState } from 'react';

import styles from './styles.module.css';

const EXCLUDED_KEYS = ['container_number',
	'marks_and_number', 'package_description', 'gross_weight', 'measurement'];

function HBLCreate({
	onSave = () => {},
	hblData,
	completed = false,
	shipmentData = {},
	primaryService = {},
}) {
	const [show, setShow] = useState(false);
	const [mode, setMode] = useState('write');
	const ref = useRef();

	const movement_details = primaryService?.movement_details;

	const templateInitialValues = {
		port_of_loading   : primaryService?.origin_port?.display_name,
		port_of_discharge : primaryService?.destination_port?.display_name,
		consigner         : shipmentData?.importer_exporter?.business_name,
		consignee         : shipmentData?.consignee_shipper?.business_name,
		vessel_number     : (movement_details || [])
			.map((movment) => `${movment?.vessel}, ${movment?.voyage}`).join(','),
		annexure_vessel_number: (movement_details || [])
			.map((movment) => `${movment?.voyage}`).join(','),
		annexure_vessel: (movement_details || [])
			.map((movment) => `${movment?.vessel}`).join(','),
		...hblData,
	};

	const handleSave = () => {
		ref?.current?.submit((data) => {
			const containerDetails = {
				container_number    : data.container_number,
				marks_and_number    : data.marks_and_number,
				package_description : data.package_description,
				gross_weight        : data.gross_weight,
				measurement         : data.measurement,
			};
			data.containers.push(containerDetails);

			const finalData = omit(data, EXCLUDED_KEYS);

			onSave(finalData);
		})();
		setShow(false);
	};

	const headerAction = () => (
		<header className={styles.header_action}>
			<p>Trade Document Template</p>
			<div>
				<Button themeType="secondary" onClick={() => setShow(false)}>Close</Button>
				{mode === 'write' && <Button onClick={handleSave}>Save</Button>}
			</div>
		</header>

	);

	return (
		<div className={styles.container}>
			{completed ? (
				<div className={styles.container_child}>
					<div>
						Draft HBL is already uploaded, you can preview it here
					</div>
					<Button
						onClick={() => {
							setShow(true);
							setMode('read');
						}}
						size="sm"
					>
						View HBL
					</Button>
				</div>

			) : (
				<div className={styles.container_child}>
					<div>
						Click the following button to create a new draft HBL
					</div>
					<Button
						onClick={() => setShow(true)}
						size="sm"
					>
						{hblData ? 'Edit the draft HBL' : 'Create a new draft HBL'}
					</Button>
				</div>
			)}
			<Modal
				size="fullscreen"
				show={show}
				onClose={() => setShow(false)}
				className={styles.custom_modal}
				showCloseIcon={false}
			>
				<Modal.Header title={headerAction()} />
				<Modal.Body>
					<TradeDocTemplate
						documentType="bluetide_hbl"
						mode={mode}
						initialValues={templateInitialValues}
						ref={ref}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default forwardRef(HBLCreate);
