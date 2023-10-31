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

const RANK_COLOR_MAPPING = {
	1 : '#F5B02E',
	2 : '#D5D5D5',
	3 : '#c59d54',
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

	const COLOR = RANK_COLOR_MAPPING[rank];

	const PERSONA = getInitials(name);

	return (

		<div className={styles.image_container} style={SIZE_STYLE}>
			<div className={styles.rank} style={{ backgroundColor: COLOR }}><b>{rank}</b></div>

			{picture ? (
				<img
					className={styles.image}
					style={{ borderColor: COLOR }}
					src={picture}
					alt="profile"
				/>
			) : <div className={styles.persona} style={{ borderColor: COLOR }}>{PERSONA}</div>}
		</div>

	);
}

export default Avatar;
