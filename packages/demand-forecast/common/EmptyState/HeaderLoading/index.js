import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function HeaderLoading() {
	return (
		<div className={styles.container}>
			<Placeholder height="25px" width="100px" margin="10px 4px" />
			<Placeholder height="25px" width="300px" margin="10px 4px" />
			<Placeholder height="25px" width="100px" margin="10px 4px" />
			<Placeholder height="25px" width="300px" margin="10px 4px" />
			<Placeholder height="25px" width="200px" margin="10px 4px" />
			<Placeholder height="25px" width="200px" margin="10px 4px" />
		</div>
	);
}

export default HeaderLoading;
