import { Avatar } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import {
	startCase,
} from '@cogoport/utils';

import styles from './styles.module.css';

function EachMember({ eachPerson = {} }) {
	const {
		partner = '',
	} = eachPerson || {};
	const { name = '' } = partner || {};

	const formattedName = startCase(name);

	return (
		<div className={styles.each_member}>
			<div className={styles.flex_name}>
				<Avatar
					personName={formattedName}
					size="24px"
					className={styles.styled_avatar}
				/>
				<div className={styles.name}>
					{startCase(formattedName)}
				</div>
			</div>
			<IcMCross
				className={styles.cross_styles}
			/>
		</div>
	);
}

function List({ membersList = [] }) {
	return (
		<div className={styles.list}>
			{membersList?.map((eachPerson) => (
				<EachMember
					key={eachPerson?.user_id}
					eachPerson={eachPerson}
				/>
			))}
		</div>
	);
}
export default List;
