import { IcMArrowRotateRight } from '@cogoport/icons-react';

import DateArrivalHandler from './DateHandler';
import styles from './styles.module.css';

function ArrivalFilter({ handleNav = () => {}, isOpen = false, arrivalDate = {}, setArrivalDate = () => {} }) {
	return (
		<>
			<div className={styles.header} role="presentation" onClick={() => handleNav('arrival')}>
				<div className={styles.nav_heading}>
					Arrival

				</div>
				<div className={styles.column}>
					<IcMArrowRotateRight
						height="8px"
						width="14px"
						fill="#000"
						className={isOpen.includes('arrival') ? styles.open : ''}
					/>
				</div>
			</div>
			{isOpen.includes('arrival') && (
				<div className={styles.date_container}>
					<DateArrivalHandler
						arrivalDate={arrivalDate}
						setArrivalDate={setArrivalDate}
					/>
				</div>
			)}
			<div className={styles.line} />
		</>
	);
}

export default ArrivalFilter;
