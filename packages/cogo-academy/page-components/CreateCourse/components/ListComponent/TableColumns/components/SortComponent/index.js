import { IcMSort } from '@cogoport/icons-react';

import styles from './styles.module.css';

const SORT_MAPPING = {
	asc  : 'desc',
	desc : 'asc',
};

function SortComponent({ value, params, setParams }) {
	const { sort_type = '' } = params || {};

	return (
		<div className={styles.icon_div}>
			<IcMSort
				width={14}
				height={14}
				onClick={() => {
					setParams((prev) => ({ ...prev, sort_by: value, sort_type: SORT_MAPPING[sort_type || 'desc'] }));
				}}
			/>
		</div>
	);
}

export default SortComponent;
