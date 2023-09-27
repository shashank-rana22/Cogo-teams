import { Button } from '@cogoport/components';
import { IcMArrowRotateRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SortByFilter({ setSortBy = () => {}, isOpen = false, handleNav = () => {} }) {
	return (
		<>
			<div className={styles.header} role="presentation" onClick={() => handleNav('sortby')}>
				<div className={styles.nav_heading}>
					Sort By
				</div>
				<div className={styles.column}>
					<IcMArrowRotateRight
						height="8px"
						width="14px"
						className={isOpen.includes('sortby') ? styles.open : ''}
					/>
				</div>
			</div>
			{isOpen.includes('sortby') && (
				<div>
					<div className={styles.filter_item}>
						<div>

							<Button themeType="tertiary" onClick={() => { setSortBy('arrival'); }}>Arrival</Button>
						</div>
					</div>
					<div className={styles.filter_item}>
						<div>
							<Button themeType="tertiary" onClick={() => { setSortBy('departure'); }}>Departure</Button>
						</div>
					</div>
					<div className={styles.filter_item}>
						<div>
							<Button
								themeType="tertiary"
								onClick={() => { setSortBy('transit_time'); }}
							>
								Transit Time

							</Button>
						</div>
					</div>
				</div>
			)}
			<div className={styles.line} />
		</>
	);
}

export default SortByFilter;
