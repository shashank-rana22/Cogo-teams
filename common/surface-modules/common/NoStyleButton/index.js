import { Button } from '@cogoport/components';

import styles from './styles.module.css';

export default function NoStyleButton(props) {
	const { children, ...rest } = props;
	return (
		<Button themeType="tertiary" {...rest} className={styles.remove_hover}>
			{children}
		</Button>
	);
}
