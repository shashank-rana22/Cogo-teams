import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function ListLoading() {
	return (
		<div className={styles.wrapper}>
			{
				[...Array(10).keys()].map((key) => (
					<div className={styles.container} key={key}>
						<Placeholder height="25px" width="25%" margin="10px 4px 10px 4px" />
						<Placeholder height="25px" width="25%" margin="10px 4px 10px 4px" />
						<Placeholder height="25px" width="25%" margin="10px 4px 10px 4px" />
						<Placeholder height="25px" width="25%" margin="10px 4px 10px 4px" />
					</div>
				))
			}
		</div>
	);
}

export default ListLoading;
