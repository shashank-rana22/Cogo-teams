import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SortComponent({ activeTab = '', setParams = () => { }, params = {} }) {
	const onClick = (type, val) => {
		setParams((p) => ({ ...p, sort_type: type, sort_by: val }));
	};

	return (
		<div>
			{activeTab === 'pending_approval' && (
				<div className={styles.flex}>
					<div style={{ marginRight: 8 }}>Elapsed Time</div>
					{params?.sort_type === 'desc'
						? (
							<IcMArrowRotateDown
								style={{ cursor: 'pointer' }}
								onClick={() => onClick('asc', 'created_at')}
							/>
						)
						: (
							<IcMArrowRotateUp
								style={{ cursor: 'pointer' }}
								onClick={() => onClick('desc', 'created_at')}
							/>
						)}
				</div>
			)}
			{activeTab === 'cooling_period' && (
				<div className={styles.flex}>
					<div style={{ marginRight: 8 }}>Cooling Period</div>
					{params?.sort_type === 'desc'
						? (
							<IcMArrowRotateDown
								onClick={() => onClick('asc', 'cooling_days')}
								style={{ cursor: 'pointer' }}
							/>
						)
						: (
							<IcMArrowRotateUp
								onClick={() => onClick('desc', 'cooling_days')}
								style={{ cursor: 'pointer' }}
							/>
						)}
				</div>
			)}
		</div>
	);
}
export default SortComponent;
