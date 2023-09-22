import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const FIRST = 1;
const SECOND = 2;
const ADJUSTMENT_FACTOR = 1.5;
const POSITION_FACTOR = 150;
const VERTICAL_POSITION_FACTOR = 150;
const HORIZONTAL_POSITION_FACTOR = 180;

const positionMapping = (position, direction) => {
	switch (direction) {
		case 'top': {
			return [position[GLOBAL_CONSTANTS.zeroth_index], position[FIRST] - VERTICAL_POSITION_FACTOR];
		}
		case 'bottom': {
			return [position[GLOBAL_CONSTANTS.zeroth_index], position[FIRST] + VERTICAL_POSITION_FACTOR];
		}
		case 'left': {
			return [position[GLOBAL_CONSTANTS.zeroth_index] - HORIZONTAL_POSITION_FACTOR, position[FIRST]];
		}
		case 'right': {
			return [position[GLOBAL_CONSTANTS.zeroth_index] + HORIZONTAL_POSITION_FACTOR, position[FIRST]];
		}
		default:
			return position;
	}
};

const getIntialPositionForMultiValuedBranch = (position, length) => ([
	position[GLOBAL_CONSTANTS.zeroth_index] + (HORIZONTAL_POSITION_FACTOR * ADJUSTMENT_FACTOR),
	position[FIRST] - length,
]);

const comparePositions = (bound, position) => {
	const [refX, refY] = position;
	const { maxX, minX, maxY, minY } = bound;

	return {
		minX : Math.min(minX, refX),
		maxX : Math.max(maxX, refX),
		minY : Math.min(minY, refY),
		maxY : Math.max(maxY, refY),
	};
};

export const getCardsDataFromGraph = ({
	graph = {},
}) => {
	const CARDS = [];
	let bounds = {
		minX : GLOBAL_CONSTANTS.zeroth_index,
		maxX : GLOBAL_CONSTANTS.zeroth_index,
		minY : GLOBAL_CONSTANTS.zeroth_index,
		maxY : GLOBAL_CONSTANTS.zeroth_index,
	};

	const getCards = (position, graphNode, posIdx) => {
		const { name = '', rates_count = '', drop = '', child = {} } = graphNode;
		bounds = comparePositions(bounds, position);

		CARDS.push({
			action_type : name,
			parent      : name,
			drop,
			rates_count,
			position    : {
				left : position[GLOBAL_CONSTANTS.zeroth_index],
				top  : position[FIRST],
			},
			positionIdx: posIdx,
		});

		Object.entries(child).forEach(([key, items]) => {
			if (items.length === FIRST) {
				const [firstChild] = items;
				getCards(positionMapping(position, key), firstChild, posIdx + FIRST);
			} else {
				const mid = Math.floor(items.length / SECOND);
				const length = (mid * POSITION_FACTOR) - (POSITION_FACTOR / SECOND);
				const intialPosition = getIntialPositionForMultiValuedBranch(position, length);
				items.forEach((childItem) => {
					getCards(intialPosition, childItem, posIdx + FIRST);
					intialPosition[FIRST] += POSITION_FACTOR;
				});
			}
		});
	};

	getCards([GLOBAL_CONSTANTS.zeroth_index, GLOBAL_CONSTANTS.zeroth_index], graph, FIRST);

	return {
		cards: CARDS,
		bounds,
	};
};
