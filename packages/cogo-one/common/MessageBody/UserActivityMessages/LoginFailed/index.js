import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function LoginFailed({ name = '', data = {} }) {
	return (
		<>
			<div className={styles.title}>{startCase(name)}</div>
			<div className={styles.message}>
				{startCase(data?.error)}
			</div>
		</>
	);
}

export default LoginFailed;
