import { Input, Button } from '@cogoport/components';

import styles from './styles.module.css';

function CourseTopics() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Which topics of knowledge will you cover in the Course?</div>
			<div className={styles.tag_line}>
				Don’t worry, you can change that later. We just need a name for creation
			</div>
			<div className={styles.input_container}>
				<Input size="md" placeholder="Type name..." />
			</div>
			<div className={styles.footer}>
				<Button size="md" themeType="accent">Continue</Button>
			</div>
		</div>
	);
}

export default CourseTopics;
