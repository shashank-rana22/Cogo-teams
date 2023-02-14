import { cl } from '@cogoport/components';

import { ASSIGNE_COLORS } from '../../constants';

import styles from './styles.module.css';

function AssigneeAvatar({ data = {} }) {
	const { name = '', email = '', isActive = '' } = data || {};
	const { background = '', shadowColor = '', color = '' } = ASSIGNE_COLORS[isActive ? 'active' : 'disabled'];
	const getInitials = () => {
		if (name) {
			const fullName = name.split(' ');
			let initialsArr = fullName?.map((char) => char.charAt(0).toUpperCase());
			initialsArr = initialsArr.length > 2 ? initialsArr.splice(0, 2) : initialsArr;
			const initials = initialsArr.join('');
			return initials;
		}

		return '';
	};
	return (
		<div
			className={cl`${styles.relative_div} ${isActive ? styles.margin_right : ''}`}
		>
			<div className={styles.container} style={{ background: shadowColor }}>
				<div className={styles.name_container} style={{ color, background }}>{getInitials()}</div>
			</div>
			{!isActive && <div className={styles.arrow_right} />}
		</div>
	);
}
export default AssigneeAvatar;
