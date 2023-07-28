import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetDrillDownStats from '../../../hooks/useGetDrillDownStats';
import { formatBigNumbers } from '../../../utils/formatBigNumbers';
import SupplyRates from '../RatesList';

import BranchAnimation from './BranchAnimation';
import DrillDownCard from './DrillDownCard';
import styles from './styles.module.css';

const RATE_MODES = ['supply', 'predicted', 'extended'];
const DEFAULT_DELAY = 1.8;
const FACTOR = 1;

function DrillDown({ globalFilters = {}, loading = false }) {
	const { mode } = globalFilters;
	const rateModes = mode ? [mode] : RATE_MODES;
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
							src={!mode
								? GLOBAL_CONSTANTS.image_url.ic_tree_multiple
								: GLOBAL_CONSTANTS.image_url.ic_tree_single}
							alt="branches"
							className={styles.tree_icon}
						/>
						{!loading && <BranchAnimation mode={mode} />}
						{rateModes.map((type) => (
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
						<IcMArrowDown />
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
									parentCount={row[GLOBAL_CONSTANTS.zeroth_index].rates_count}
								/>
							))}
						</div>
					);
				})}
			</div>
			{activeParent
			&& (
				<SupplyRates
					globalFilters={globalFilters}
					activeParent={activeParent}
					className={styles.list}
				/>
			)}
		</div>
	);
}

export default DrillDown;
