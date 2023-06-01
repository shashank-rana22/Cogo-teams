import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function ListLoading() {
	return (
		<div>
			{
				[...Array(10)].map((_, i) => (
					<div className={styles.container} key={i}>
						<div>
							<Placeholder height="25px" width="200px" margin="10px 4px 10px 4px" />
						</div>
						<div><Placeholder height="25px" width="200px" margin="10px 4px 10px 4px" /></div>
						<div><Placeholder height="25px" width="200px" margin="10px 4px 10px 4px" /></div>
						<div><Placeholder height="25px" width="200px" margin="10px 4px 10px 4px" /></div>
					</div>
				))
			}
		</div>
	);
}

export default ListLoading;
