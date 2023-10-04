import { Select } from '@cogoport/components';

import styles from './styles.module.css';

const START_INDEX = 0;
const WORD_LENGTH = 1;

function Header({
	orgName = '', options = {}, user = '', setUser = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.company}>
				<h2 className={styles.logo}>{orgName?.slice(START_INDEX, WORD_LENGTH)}</h2>
				<h2 className={styles.name}>{orgName}</h2>
			</div>
			<div className={styles.input_container}>
				<h3 className={styles.user_title}>Select Users</h3>
				<Select
					value={user}
					options={options}
					onChange={setUser}
					label="Select Users"
					placeholder="select your fav"
				/>
			</div>
		</div>
	);
}
export default Header;
