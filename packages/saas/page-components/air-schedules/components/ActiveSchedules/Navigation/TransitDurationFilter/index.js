import { IcMArrowRotateRight } from '@cogoport/icons-react';

import styles from './styles.module.css';
import TransitDuration from './TransitDuration';

function TransitDurationFilter({ handleNav = () => {}, isOpen = false, durationValue = 0, onChange = () => {} }) {
	return (
		<>
			<div className={styles.header} role="presentation" onClick={() => handleNav('transit')}>
				<div className={styles.nav_heading}>
					Transit Duration (Hours)
				</div>
				<div className={styles.column}>
					<IcMArrowRotateRight
						height="8px"
						width="14px"
						fill="#000"
						className={isOpen.includes('transit') ? styles.open : ''}
					/>
				</div>
			</div>
			{isOpen.includes('transit') && (
				<TransitDuration durationValue={durationValue} onChange={onChange} />
			)}
			<div className={styles.line} />
		</>
	);
}
export default TransitDurationFilter;
