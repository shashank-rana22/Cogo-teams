import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const DEFAULT_TOTAL_ITEM = 10;

function ListLoading() {
	return (
		<div>
			{
				[...Array(DEFAULT_TOTAL_ITEM).keys()].map((key) => (
					<div className={styles.container} key={key}>
						<div>
							<Placeholder height="25px" width="200px" margin="10px 4px 10px 4px" />
						</div>
						<div><Placeholder height="25px" width="200px" margin="10px 4px 10px 4px" /></div>
						<div><Placeholder height="25px" width="200px" margin="10px 4px 10px 4px" /></div>
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
