import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const MAX_INITIAL_LENGTH = 2;
const INCEREMENT = 1;

const SIZE_MAPPING = {
	lg: {
		width: '50%',
	},
	md: {
		width: '45%',
	},
	sm: {
		width: '40%',
	},
};

const getInitials = (name) => {
	const parts = name?.split(' ');
	let initials = '';
	for (let i = 0; i < parts?.length && initials.length < MAX_INITIAL_LENGTH; i += INCEREMENT) {
		if (!isEmpty(parts[i]) && parts[i] !== '') {
			initials += parts[i][GLOBAL_CONSTANTS.zeroth_index];
		}
	}
	return initials;
};

function Avatar(props) {
	const { user, size = 'lg', rank } = props;

	const { picture, name } = user || {};

	const SIZE_STYLE = SIZE_MAPPING[size];

	const PERSONA = getInitials(name);

	return (

		<div className={styles.image_container} style={SIZE_STYLE}>
			<div className={cl`${styles.rank} ${styles[`rank_${rank}`]}`}><b>{rank}</b></div>

			<div className={cl`${styles.avatar_wrap} ${styles[`rank_${rank}`]}`}>
				{picture ? (
					<img
						className={styles.image}
						src={picture}
						alt="profile"
					/>
				) : <div className={styles.persona}>{PERSONA}</div>}
			</div>
		</div>

	);
}

export default Avatar;
