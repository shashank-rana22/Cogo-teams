import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import { TEAMS_ICON_MAPPING } from '../../../../../../constants';

import styles from './styles.module.css';

function Header({
	activeComponent = 0,
	selectedGroup = {},
}) {
	const { group_type = '' } = selectedGroup || {};

	const SHOW_HEADER = {
		1 : { type: 'Create A Team', title: 'What kind of a team will this be?', icon: '' },
		2 : {
			type  : `${group_type} Team`,
			title : 'A bit more about your team',
			icon  : TEAMS_ICON_MAPPING[group_type] || '',
		},
	};

	const ActiveCardDetails = SHOW_HEADER[activeComponent];

	const { type = '', title = '', icon = '' } = ActiveCardDetails;

	return (
		<div className={styles.header_container}>
			<div className={styles.group}>
				{icon ? (
					<Image
						src={icon}
						alt="group"
						width={26}
						height={26}
					/>
				) : null}
				<div className={styles.type}>
					{startCase(type)}
				</div>
			</div>
			<div className={styles.title}>
				{title}
			</div>
		</div>
	);
}

export default Header;
