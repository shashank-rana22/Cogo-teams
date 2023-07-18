import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

// import IcBranch from '../../../assets/ic-tree.svg';
import { DUMMY_DATA } from '../../../constants/drilldown_config';
import SupplyRates from '../RatesList';

import BranchAnimation from './BranchAnimation';
import DrillDownCard from './DrillDownCard';
import styles from './styles.module.css';

const RATE_TYPES = ['supply', 'predicted', 'extended'];
const DEFAULT_DELAY = 1.8;
const FACTOR = 1;

function DrillDown({ rate_type = null }) {
	const rateSources = rate_type ? [rate_type] : RATE_TYPES;
	const [activeParent, setActiveParent] = useState(null);

	const handleClick = (val) => {
		setActiveParent(val);
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.main_container} ${activeParent ? styles.minimize : ''}`}>
				{!activeParent ? (
					<>
						{/* <IcBranch className={styles.tree_icon} /> */}
						<BranchAnimation />
						{rateSources.map((type) => (
							<div className={styles.source_card} key={type}>
								{startCase(type)}
							</div>
						))}
						<div className={cl`${styles.source_card} ${styles.main_card}`}>11000 Searches</div>
					</>
				) : (
					<Button
						themeType="secondary"
						className={styles.show_btn}
						onClick={() => setActiveParent(null)}
					>
						Show All
					</Button>
				)}

				{DUMMY_DATA.map((row, rowIdx) => {
					const isActive = activeParent === row[GLOBAL_CONSTANTS.zeroth_index].parent;

					return (!activeParent || isActive) && (
						<div
							className={cl`${styles.tree_branch} 
							${styles[`branch_${rowIdx}`]}
							${isActive ? styles.to_top : ''}`}
							key={row[GLOBAL_CONSTANTS.zeroth_index].action_type}
						>
							{row.map((item, colIdx) => (
								<DrillDownCard
									key={item.action_type}
									data={item}
									cardIndex={colIdx}
									delay={DEFAULT_DELAY + colIdx * (FACTOR / (row.length - FACTOR || FACTOR))}
									handleClick={handleClick}
									animate={!activeParent}
									isAtTop={isActive}
									parentAction={row[colIdx - FACTOR]?.action_type || 'search'}
								/>
							))}
						</div>
					);
				})}
			</div>
			<SupplyRates visible={activeParent} />
		</div>
	);
}

export default DrillDown;
