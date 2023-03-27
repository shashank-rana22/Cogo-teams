import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { useState, useEffect } from 'react';

import AllLogs from './AllLogs';
import NewLog from './NewLog';
import styles from './styles.module.css';

function LogModal({
	modal,
	setModal = () => {},
	item = {},
	setItem = () => {},
	disableNext,
	onSubmit = () => {},
	setDisableNext = () => {},
}) {
	const [activeLogTab, setActiveLogTab] = useState('new');

	useEffect(() => {
		setActiveLogTab(item?.final_decision ? 'all' : 'new');
	}, [item]);

	return (
		<div>
			<Modal
				show={modal === 'logs'}
				onClose={() => {
					setModal('');
					setItem({});
				}}
				size="lg"
			>
				<Modal.Header title="Logs" />
				<div className={styles.upload_modal}>
					<Modal.Body>
						<Tabs
							activeTab={activeLogTab}
							themeType="primary"
							onChange={setActiveLogTab}
						>
							{!item?.final_decision && (
								<TabPanel name="new" title="New Log">
									<NewLog
										item={item}
										setItem={setItem}
										setDisableNext={setDisableNext}
									/>
								</TabPanel>
							)}
							<TabPanel name="all" title="All Logs">
								<AllLogs
									item={item}
								/>
							</TabPanel>
						</Tabs>

					</Modal.Body>
				</div>
				<Modal.Footer>
					<Button
						size="md"
						themeType="tertiary"
						type="button"
						onClick={() => {
							setModal('');
							setItem({});
						}}
					>
						Close
					</Button>

					<Button
						size="md"
						themeType="primary"
						type="submit"
						disabled={disableNext}
						onClick={onSubmit}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default LogModal;
