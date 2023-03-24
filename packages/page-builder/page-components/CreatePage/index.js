import { useState } from 'react';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function CreatePage() {
	const [activeTab, setActiveTab] = useState('content');
	const [components, setComponents] = useState([]);

	return (
		<div>
			<section className={styles.heading_container}>
				Customise Landing Pages
			</section>

			<section className={styles.body}>
				<div className={styles.left_panel}>
					<LeftPanel
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						components={components}
						setComponents={setComponents}
					/>
				</div>

				<div className={styles.right_panel}>
					<RightPanel
						components={components}
						setComponents={setComponents}
					/>
				</div>
			</section>
		</div>
	);
}

export default CreatePage;
