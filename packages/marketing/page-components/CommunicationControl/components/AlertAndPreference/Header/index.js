import { AsyncSelect } from '@cogoport/forms';

import styles from './styles.module.css';

const START_INDEX = 0;
const WORD_LENGTH = 1;

function Header({
	orgName = '', user = '', setUser = () => {}, orgId = '',
}) {
	const params = {
		page_limit : 100,
		filters    : {
			organization_id: orgId,
		},
	};
	const onChange = (val) => {
		setUser(val);
	};
	return (
		<div className={styles.container}>
			<div className={styles.company}>
				<h2 className={styles.logo}>{orgName?.slice(START_INDEX, WORD_LENGTH)}</h2>
				<h2 className={styles.name}>{orgName}</h2>
			</div>
			<div className={styles.input_container}>
				<h3 className={styles.user_title}>Select Users</h3>
				<AsyncSelect
					name="user_select"
					asyncKey="organization_users"
					labelKey="name"
					valueKey="user_id"
					initialCall
					value={user}
					isClearable
					onChange={onChange}
					label="Select Users"
					placeholder="Select All"
					params={params}
				/>
			</div>
		</div>
	);
}
export default Header;
