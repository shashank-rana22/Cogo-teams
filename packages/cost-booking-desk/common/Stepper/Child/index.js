import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function Step({ item = {}, value = '', onChange = () => {} }) {
	const isActive = item?.value === value;

	return (
		<div
			className={cl`${styles.container} ${
				isActive ? styles.active : styles.remaining
			} `}
			role="button"
			tabIndex={0}
			onClick={isActive ? null : () => onChange(item?.value)}
		>
			<div className={cl`${styles.text} ${isActive ? styles.active_text : ''}`}>
				{item?.label || ''}
			</div>
		</div>
	);
}

export default Step;
