import { Button, Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import NoDataState from '../../../common/NoDataState';
import useGetDrillDownStats from '../../../hooks/useGetDrillDownStats';
import { formatBigNumbers } from '../../../utils/formatBigNumbers';
import SupplyRates from '../RatesList';

import BranchAnimation from './BranchAnimation';
import DrillDownCard from './DrillDownCard';
import styles from './styles.module.css';

const RATE_MODES = ['supply', 'predicted', 'extended'];
const DEFAULT_DELAY = 1.8;
const FACTOR = 1;
const MAXIMUM_CARDS = 4;
const THREE = 3;
const EmptyStateData = [MAXIMUM_CARDS, THREE, THREE, FACTOR];

function DrillDown({ globalFilters = {} }) {
	const { mode } = globalFilters;
	const rateModes = mode ? [mode] : RATE_MODES;
	const [activeParent, setActiveParent] = useState(null);

	const handleClick = (val) => {
		setActiveParent(val);
	};

	const { drillDownCards = [], totalSearches, loading } = useGetDrillDownStats({
		globalFilters,
	});

	const emptyData = !drillDownCards || drillDownCards.length === GLOBAL_CONSTANTS.zeroth_index;

	if (!loading && emptyData) {
		return (
			<div className={cl`${styles.main_container} ${styles.empty_state}`}>
				<NoDataState flow="column" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={cl`${styles.main_container} ${activeParent ? styles.minimize : ''}`}>

				{!activeParent ? (
					<>
						{rateModes.map((type) => (
							<div className={styles.source_card} key={type}>
								{startCase(type)}
							</div>
						))}
						<img
							src={!mode
								? GLOBAL_CONSTANTS.image_url.ic_tree_multiple
								: GLOBAL_CONSTANTS.image_url.ic_tree_single}
							alt="branches"
							className={styles.tree_icon}
						/>
						{!loading && <BranchAnimation mode={mode} />}

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

				{!loading && drillDownCards.map((row, rowIdx) => {
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
				{
					(loading) && EmptyStateData.map((item, rowIdx) => (
						<div
							className={cl`${styles.tree_branch} ${styles[`branch_${rowIdx}`]}`}
							key={item}
						>
							{[...new Array(item).keys()].map((key) => (
								<div
									key={key}
									className={cl`${styles.card_placeholder}
									${key === GLOBAL_CONSTANTS.zeroth_index && styles.long_card}`}
								>
									<Placeholder height="100%" width="100%" />
								</div>
							))}
						</div>
					))
				}
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
