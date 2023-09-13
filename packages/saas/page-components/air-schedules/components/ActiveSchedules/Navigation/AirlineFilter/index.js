import { IcMArrowRotateRight } from '@cogoport/icons-react';

import AirlineContent from './AirlineContent';
import styles from './styles.module.css';

function AirlineFilter({ handleCheckList, handleNav, isOpen, carrierList }) {
	return (
		<>
			<div className={styles.header} role="presentation" onClick={() => handleNav('airline')}>
				<div className={styles.nav_heading}>
					Airline
				</div>
				<div className={styles.column}>
					<IcMArrowRotateRight
						height="8px"
						width="14px"
						fill="#000"
						className={isOpen.includes('airline') ? styles.open : ''}
					/>
				</div>
			</div>
			{isOpen.includes('airline') && (
				<AirlineContent
					events={handleCheckList}
					list={carrierList}
					value="carrier"
				/>
			)}
			<div className={styles.line} />
		</>
	);
}
export default AirlineFilter;
