import React, { useState } from 'react';
import styles from './styles.module.css';

const Tabs = () => {
	const [activeTab,setActiveTab]=useState('open')

  return (
	<div className={styles.container}>
		<div className={styles.tabs}>
<div className={styles.styled_buttons}>Open</div>
<div className={styles.styled_buttons}>Reassigned</div>
<div className={styles.styled_buttons}>Closed</div>
		</div>
	</div>
  )
}

export default Tabs