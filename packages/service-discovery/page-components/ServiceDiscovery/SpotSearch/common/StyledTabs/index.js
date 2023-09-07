import { Tabs } from '@cogoport/components';

import styles from './styles.module.css';

function StyledTabs({ children = null, ...rest }) {
	return (
		<Tabs {...rest} className={styles.container}>
			{children}
		</Tabs>
	);
}

export default StyledTabs;
