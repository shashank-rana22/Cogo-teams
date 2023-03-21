import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import POC from '../../../../common/POC';
import SOP from '../../../../common/SOP';

import styles from './styles.module.css';

function SopAndPoc() {
	const [activeTab, setActiveTab] = useState('poc');
	const [show, setShow] = useState(false);

	const onClose = () => setShow(false);
	return (
		<div>
			<Button onClick={() => setShow(true)}>POC and SOP</Button>
			<Modal show={show} placement="top-right" size="md" scroll={false} onClose={() => setShow(false)}>
				<Modal.Body>
					<Tabs
						fullWidth
						activeTab={activeTab}
						onChange={setActiveTab}
						suffix={(
							<div className={styles.close}>
								<Button
									onClick={onClose}
									themeType="linkUi"
								>
									<IcMCross />
								</Button>
							</div>
						)}
					>
						<TabPanel name="poc" title="POC">
							<div style={{ height: '80vh', overflow: 'scroll' }}>
								<POC />
							</div>
						</TabPanel>
						<TabPanel name="sop" title="SOP">
							<div style={{ height: '80vh', overflow: 'scroll' }}>
								<SOP />
							</div>
						</TabPanel>
					</Tabs>

				</Modal.Body>
			</Modal>
		</div>
	);
}

export default SopAndPoc;
