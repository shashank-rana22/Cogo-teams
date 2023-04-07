import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import AllLogs from './AllLogs';
import NewLog from './NewLog';
import styles from './styles.module.css';

function LogModal({
	modal,
	setModal = () => {},
	item = {},
	setItem = () => {},
	onSubmit = () => {},
	source = '',
}) {
	const [activeLogTab, setActiveLogTab] = useState(
		(item.final_decision || source === 'manager_dashboard') ? 'all' : 'new',
	);

	const isDisabled = item.tags.length === item.disabledTags.length && !item.comment;

	return (
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
				<Modal.Body
					style={{ maxHeight: '500px' }}
				>
					<Tabs
						activeTab={activeLogTab}
						themeType="primary"
						onChange={setActiveLogTab}
					>
						{!item?.final_decision && (
							<TabPanel
								name="new"
								title="New Log"
							>
								<NewLog
									item={item}
									setItem={setItem}
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

				{activeLogTab === 'new' && (
					<Button
						size="md"
						themeType="primary"
						type="submit"
						disabled={isDisabled}
						onClick={onSubmit}
					>
						Submit
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}

export default LogModal;
