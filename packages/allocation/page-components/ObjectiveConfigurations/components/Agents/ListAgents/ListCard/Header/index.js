import { Button, Pill } from '@cogoport/components';

import styles from './styles.module.css';

function Header(props) {
	const { role, user, partner } = props;
	return 			(
		<div className={styles.card_header}>
			<div className={styles.agent_detail}>
				<h4 className={styles.agent}>
					{role.name}
					:
					{' '}
					<strong>{user.name}</strong>
				</h4>

				<Pill size="md">
					Entity:
					{' '}
					{partner.business_name}
				</Pill>

				<Pill size="md">
					Channel:
					{' '}
					{role.role_sub_function}
				</Pill>
			</div>

			<Button type="button" themeType="secondary">Edit Distribution</Button>
		</div>
	);
}

export default Header;
