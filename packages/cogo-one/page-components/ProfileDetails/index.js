import { useState } from 'react';

import COMPONENT_MAPPING from '../../constants/COMPONENT_MAPPING';

import RightSideNav from './RightSideNav';
import styles from './styles.module.css';

function ProfileDetails({ activeCard }) {
	const [activeSelect, setActiveSelect] = useState('profile');
	const ActiveComp = COMPONENT_MAPPING[activeSelect] || null;
	return (
		<div className={styles.profile_div}>
			<div className={styles.container}>
				{ActiveComp && <ActiveComp activeCard={activeCard} activeSelect={activeSelect} />}
			</div>
			<RightSideNav activeSelect={activeSelect} setActiveSelect={setActiveSelect} />
		</div>
	);
}
export default ProfileDetails;
