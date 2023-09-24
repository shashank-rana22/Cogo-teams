import { Select } from '@cogoport/components';

import styles from './styles.module.css';

const START_INDEX = 0;
const WORD_LENGTH = 1;

function Header({
	orgName = '', agentId = '',
}) {
	return (
		<div className={styles.container}>
			<div className={styles.company}>
				<h2 className={styles.logo}>{orgName?.slice(START_INDEX, WORD_LENGTH)}</h2>
				<h2 className={styles.name}>{orgName}</h2>
			</div>
			{agentId ? (
				<div>
					<Select
						label="Select Users"
						placeholder="select your fav"
					/>
				</div>
			) : null}
		</div>
	);
}
export default Header;
