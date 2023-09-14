import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const FIRST = 1;
const SECOND = 2;
const ADJUSTMENT_FACTOR = 1.5;
const POSITION_FACTOR = 150;
const VERTICAL_POSITION_FACTOR = 150;
const HORIZONTAL_POSITION_FACTOR = 150;
const INITAL_POSITION_X = 50;
const INITAL_POSITION_Y = 250;
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

export const getCardsDataFromGraph = ({
	graph = {},
}) => {
	const CARDS = [];

	const getCards = (position, graphNode) => {
		const { name = '', rates_count = '', drop = '', child = {} } = graphNode;
		CARDS.push({
			action_type : name,
			parent      : name,
			drop,
			rates_count,
			position    : {
				left : `${position[GLOBAL_CONSTANTS.zeroth_index]}px`,
				top  : `${position[FIRST]}px`,
			},
		});
		Object.entries(child).forEach(([key, items]) => {
			if (items.length === FIRST) {
				const [firstChild] = items;
				getCards(positionMapping(position, key), firstChild);
			} else {
				const mid = Math.floor(items.length / SECOND);
				const length = (mid * POSITION_FACTOR) - (POSITION_FACTOR / SECOND);
				const intialPosition = [
					position[GLOBAL_CONSTANTS.zeroth_index] + (HORIZONTAL_POSITION_FACTOR * ADJUSTMENT_FACTOR),
					position[FIRST] - length,
				];
				items.forEach((childItem) => {
					getCards(intialPosition, childItem);
					intialPosition[FIRST] += POSITION_FACTOR;
				});
			}
		});
	};

	getCards([INITAL_POSITION_X, INITAL_POSITION_Y], graph);

	return { cards: CARDS };
};
