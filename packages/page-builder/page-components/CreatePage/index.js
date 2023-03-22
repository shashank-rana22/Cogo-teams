import { useState } from 'react';

import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import styles from './styles.module.css';

function CreatePage() {
	const [activeTab, setActiveTab] = useState('content');
	return (
		<div>
			<section className={styles.heading_container}>
				Customise Landing Pages
			</section>

			<section className={styles.body}>
				<div className={styles.left_panel}>
					<LeftPanel activeTab={activeTab} setActiveTab={setActiveTab} />
				</div>

				<div className={styles.right_panel}>
					<RightPanel />
				</div>
			</section>
		</div>
	);
}

export default CreatePage;
