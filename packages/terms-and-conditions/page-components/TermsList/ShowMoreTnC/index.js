import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ShowMoreTNC({ description = [] }) {
	if (isEmpty(description)) {
		return (
			<div className={styles.not_found}>
				Data not Found
			</div>
		);
	}
	return (
		<div>
			{description?.map((item, index) => (
				<div key={item?.id} className={styles.applied_terms}>
					<div className={styles.index}>
						{index + GLOBAL_CONSTANTS.one}
						.
					</div>
					{item || ''}
				</div>
			))}
		</div>
	);
}

export default ShowMoreTNC;
