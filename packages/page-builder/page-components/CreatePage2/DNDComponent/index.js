import { Button, Modal } from '@cogoport/components';
// import { IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import LeftPanel from '../LeftPanel';
import Content from '../LeftPanel/Content';
import RightPanel from '../RightPanel';

import styles from './styles.module.css';
// import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function CreatePage() {
	const [activeTab, setActiveTab] = useState('content');
	const [components, setComponents] = useState([]);

	console.log('djhsjhdj', components);
	const [showContentModal, setShowContentModal] = useState(false);
	const [parentComponentId, setParentComponentId] = useState(null);

	const onClose = () => {
		setShowContentModal(false);
	};

	return (
		<div>
			<section className={styles.heading_container}>
				Customise Landing Pages
			</section>

			<section className={styles.body}>
				<div className={styles.left_panel}>
					<LeftPanel
						activeTab={activeTab}
						components={components}
						setComponents={setComponents}
						setActiveTab={setActiveTab}
						showContentModal={showContentModal}
						setShowContentModal={setShowContentModal}
						parentComponentId={parentComponentId}
						setParentComponentId={setParentComponentId}
					/>
				</div>

				<div className={styles.right_panel}>

					<section className={styles.header}>
						<div>
							<Button type="button" size="md" themeType="secondary">Preview</Button>
						</div>

						<div className={styles.button_container}>
							<Button
								style={{ marginRight: '8px' }}
								type="button"
								size="md"
								themeType="secondary"
							>
								Save

							</Button>
							<Button type="button" size="md">Save & Close</Button>
						</div>
					</section>

					<RightPanel components={components} setComponents={setComponents} />

				</div>

			</section>

			<section>

				<Modal
					size="md"
					show={showContentModal}
					onClose={onClose}
					placement="top"
					scroll={false}
				>
					<Modal.Header title="choose content" />
					<Content
						components={components}
						setComponents={setComponents}
						parentComponentId={parentComponentId}
						setParentComponentId={setParentComponentId}
						setShowContentModal={setShowContentModal}
					/>

				</Modal>
			</section>
		</div>
	);
}

export default CreatePage;
