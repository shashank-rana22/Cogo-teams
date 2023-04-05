import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SortComponent({ value, sortFilter, setSortFilter }) {
	const { sort_by = '', sort_type = '' } = sortFilter || {};
	return (
		<div className={styles.icon_div}>
			{sort_by === value && (sort_type === 'asc' || sort_type === '') ? (
				<IcMArrowRotateUp
					width={14}
					height={14}
					onClick={() => {
						setSortFilter({ sort_by: value, sort_type: 'desc' })}}
				/>
			) : (
				<IcMArrowRotateDown
					width={14}
					height={14}
					onClick={() => setSortFilter({ sort_by: value, sort_type: 'asc' })}
				/>
			)}
		</div>
	);
}

export default SortComponent;
