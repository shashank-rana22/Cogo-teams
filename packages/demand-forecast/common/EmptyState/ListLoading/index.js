import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const DEFAULT_TOTAL_ITEM = 10;
const DEFAULT_ROW_ITEM = 5;

function ListLoading() {
	return (
		<div>
			{[...Array(DEFAULT_TOTAL_ITEM).keys()].map((outerKey) => (
				<div className={styles.container} key={outerKey}>
					{
				[...Array(DEFAULT_ROW_ITEM).keys()].map((innerKey) => (
					<div key={innerKey}><Placeholder height="25px" width="200px" margin="10px 4px" /></div>
				))
			}
				</div>
			))}
		</div>
	);
}

export default ListLoading;
