import { cl } from '@cogoport/components';

import { generateSVGPaths } from '../../../../utils/generateSVGPaths';
import { getCardsDataFromGraph } from '../../../../utils/getCardsDataFromGraph';
import DrillDownCard from '../DrillDownCard';
import styles from '../styles.module.css';
import SVGLayout from '../SVGLayout';

const DEFAULT_ZOOM_LEVEL = 0;
const DELAY_CONSTANT = 0.1;

const INITIAL_POSITION_X = 100;
const INITIAL_POSITION_Y = 100;
const EXTRA_HEIGHT = 300;

function GraphLayout({ graph = {}, activeParent = null, setActiveParent = () => {} }) {
	const { paths } = generateSVGPaths({
		graph,
	});
	const { cards, bounds } = getCardsDataFromGraph({
		graph,
	});
	const { minX, minY, maxY } = bounds;

	const handleClick = (val) => {
		setActiveParent(val);
	};

	return (
		<div className={cl`${styles.container} ${styles[`parent_zoom_level_${DEFAULT_ZOOM_LEVEL}`]}`}>
			<h3>Rate Lifecycle</h3>
			<div
				className={cl`${styles.graph_layout} ${styles.zoom_child}`}
				style={{ height: `${maxY - minY + EXTRA_HEIGHT}px` }}
			>
				<div
					className={styles.svg_layout}
					style={{
						top  : `${-minY}px`,
						left : `${-minX}px`,
					}}
				>
					<SVGLayout mode="background" paths={paths} bounds={bounds} />
				</div>
				<div
					className={styles.svg_layout}
					style={{
						top  : `${-minY}px`,
						left : `${-minX}px`,
					}}
				>
					<SVGLayout paths={paths} bounds={bounds} />
				</div>
				<div className={styles.cards_layout}>
					{cards.map((item) => {
						const { position, positionIdx } = item;
						const { top, left } = position;
						const isActive = activeParent === item.action_type;
						return (
							<div
								className={cl`${styles.card_container} ${isActive ? styles.to_top : ''}`}
								key={item.action_type}
								style={{
									top  : `${top + INITIAL_POSITION_Y - minY}px`,
									left : `${left + INITIAL_POSITION_X - minX}px`,
								}}
							>
								<DrillDownCard
									key={item.action_type}
									data={item}
									cardIndex={1}
									delay={positionIdx * DELAY_CONSTANT}
									handleClick={handleClick}
									animate={!activeParent}
									isAtTop={isActive}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default GraphLayout;
