import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMArrowRotateLeft, IcMArrowRotateRight } from '@cogoport/icons-react';
import { useState, useContext } from 'react';

import Poc from '../../../../common/POC';
import Sop from '../../../../common/SOP';

import styles from './styles.module.css';

function SopAndPoc() {
	const { shipment_data, servicesList, primary_service } = useContext(ShipmentDetailContext);

	const [activeTab, setActiveTab] = useState('poc');
	const [show, setShow] = useState(false);

	const onClose = () => setShow(false);
	return (
		<div>
			<div className={styles.poc_sop_container}>
				<div className={styles.poc_sop_icon}>
					<Button onClick={() => setShow(true)} themeType="tertiary">
						<IcMArrowRotateLeft
							fill="white"
						/>

					</Button>
				</div>
				<div className={styles.poc_sop_text}>POC and SOP</div>
			</div>

			{show
				&& (
					<Modal
						show={show}
						placement="top-right"
						size="md"
						scroll={false}
						onClose={() => setShow(false)}
						closeOnOuterClick={false}
					>
						<Modal.Body>
							<div className={styles.close}>
								<div className={styles.close_icon_container}>
									<Button
										onClick={onClose}
										themeType="tertiary"
									>
										<IcMArrowRotateRight
											fill="white"
										/>
									</Button>
								</div>
								{activeTab === 'poc' && <div className={styles.close_border} />}
							</div>
							<Tabs
								fullWidth
								activeTab={activeTab}
								onChange={setActiveTab}
							>
								<TabPanel name="poc" title="POC">
									<div style={{ height: '80vh', overflow: 'scroll' }}>
										<Poc shipment_data={shipment_data} servicesList={servicesList} />
									</div>
								</TabPanel>
								<TabPanel name="sop" title="SOP">
									<div style={{ height: '80vh', overflow: 'scroll' }}>
										<Sop shipment_data={shipment_data} primary_service={primary_service} />
									</div>
								</TabPanel>
							</Tabs>

						</Modal.Body>
					</Modal>
				)}
		</div>
	);
}

export default SopAndPoc;
