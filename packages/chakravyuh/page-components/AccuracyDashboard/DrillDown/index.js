import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetDrillDownStats from '../../../hooks/useGetDrillDownStats';
import { formatBigNumbers } from '../../../utils/formatBigNumbers';
import SupplyRates from '../RatesList';

import BranchAnimation from './BranchAnimation';
import DrillDownCard from './DrillDownCard';
import styles from './styles.module.css';

const RATE_TYPES = ['supply', 'predicted', 'extended'];
const DEFAULT_DELAY = 1.8;
const FACTOR = 1;

function DrillDown({ globalFilters = {} }) {
	const { rate_type } = globalFilters;
	const rateSources = rate_type ? [rate_type] : RATE_TYPES;
	const [activeParent, setActiveParent] = useState(null);

	const handleClick = (val) => {
		setActiveParent(val);
	};

	const { drillDownCards = [], totalSearches } = useGetDrillDownStats({
		globalFilters,
		flag: !activeParent,
	});

	return (
		<div className={styles.container}>
			<div className={cl`${styles.main_container} ${activeParent ? styles.minimize : ''}`}>

				{!activeParent ? (
					<>
						<img
							src={!rate_type
								? GLOBAL_CONSTANTS.image_url.ic_tree_multiple
								: GLOBAL_CONSTANTS.image_url.ic_tree_single}
							alt="branches"
							className={styles.tree_icon}
						/>
						<BranchAnimation rate_type={rate_type} />
						{rateSources.map((type) => (
							<div className={styles.source_card} key={type}>
								{startCase(type)}
							</div>
						))}
						<div className={cl`${styles.source_card} ${styles.main_card}`}>
							<h4>{formatBigNumbers(totalSearches)}</h4>
							<span>Searches</span>
						</div>
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

				{drillDownCards.map((row, rowIdx) => {
					const isActive = activeParent === row[GLOBAL_CONSTANTS.zeroth_index].action_type;

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
									parent={row[GLOBAL_CONSTANTS.zeroth_index].action_type}
								/>
							))}
						</div>
					);
				})}
			</div>
			{activeParent
			&& <SupplyRates />}
		</div>
	);
}

export default DrillDown;
