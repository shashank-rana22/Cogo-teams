import { Tooltip } from '@cogoport/components';

import { ASSIGNE_COLORS } from '../../constants';

import styles from './styles.module.css';

function AssigneeAvatar({ name = '', type = '' }) {
	const { background = '', shadowColor = '', color = '' } = ASSIGNE_COLORS[type] || {};
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
		<Tooltip content={name} placement="bottom">
			<div className={styles.relative_div}>
				<div className={styles.container} style={{ background: shadowColor }}>
					<div className={styles.name_container} style={{ color, background }}>{getInitials()}</div>
				</div>
				{type === 'disabled' && <div className={styles.arrow_right} />}
			</div>
		</Tooltip>
	);
}
export default AssigneeAvatar;
