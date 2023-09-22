import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const FIRST = 1;
const SECOND = 2;
const INITIAL_POSITION_X = 128;
const INITIAL_POSITION_Y = 113;

const LENGTH_FACTOR = 112;
const ADJUSTMENT_FACTOR = 0.75;
const HORIZONTAL_LENGTH_FACTOR = 135;
const VERTICAL_LENGTH_FACTOR = 112;
const CURVE_FACTOR = 6;

const D_CONFIG = {
	right  : ` h ${HORIZONTAL_LENGTH_FACTOR} `,
	left   : ` h -${HORIZONTAL_LENGTH_FACTOR} `,
	top    : ` v -${VERTICAL_LENGTH_FACTOR} `,
	bottom : ` v ${VERTICAL_LENGTH_FACTOR} `,
};

const ADJUSTED_D_VALUES = {
	right  : ` h ${(HORIZONTAL_LENGTH_FACTOR * ADJUSTMENT_FACTOR) - CURVE_FACTOR} `,
	left   : ` h -${(HORIZONTAL_LENGTH_FACTOR * ADJUSTMENT_FACTOR) - CURVE_FACTOR} `,
	top    : ` v -${(VERTICAL_LENGTH_FACTOR * ADJUSTMENT_FACTOR) - CURVE_FACTOR} `,
	bottom : ` v ${(VERTICAL_LENGTH_FACTOR * ADJUSTMENT_FACTOR) - CURVE_FACTOR} `,
};

const CONNECTORS = {
	right: {
		top    : ` a ${CURVE_FACTOR} ${CURVE_FACTOR} 0 0 0 ${CURVE_FACTOR} -${CURVE_FACTOR} `,
		bottom : ` a ${CURVE_FACTOR} ${CURVE_FACTOR} 0 0 1 ${CURVE_FACTOR} ${CURVE_FACTOR} `,
	},
	top: {
		right : ` a ${CURVE_FACTOR} ${CURVE_FACTOR} 0 0 1 ${CURVE_FACTOR} -${CURVE_FACTOR} `,
		left  : ` a ${CURVE_FACTOR} ${CURVE_FACTOR} 0 0 0 -${CURVE_FACTOR} -${CURVE_FACTOR} `,
	},
	bottom: {
		right : ` a ${CURVE_FACTOR} ${CURVE_FACTOR} 0 0 0 ${CURVE_FACTOR} ${CURVE_FACTOR} `,
		left  : ` a ${CURVE_FACTOR} ${CURVE_FACTOR} 0 0 1 -${CURVE_FACTOR} ${CURVE_FACTOR} `,
	},
	left: {
		top    : ` a ${CURVE_FACTOR} ${CURVE_FACTOR} 0 0 1 -${CURVE_FACTOR} -${CURVE_FACTOR} `,
		bottom : ` a ${CURVE_FACTOR} ${CURVE_FACTOR} 0 0 0 -${CURVE_FACTOR} ${CURVE_FACTOR} `,
	},
};

const connections = (length) => {
	if (length > GLOBAL_CONSTANTS.zeroth_index) {
		return {
			right  : ` ${CONNECTORS.right.bottom} v ${length} ${CONNECTORS.bottom.right} `,
			left   : ` ${CONNECTORS.left.bottom} v ${length} ${CONNECTORS.bottom.left} `,
			top    : ` ${CONNECTORS.top.right} h ${length} ${CONNECTORS.right.top} `,
			bottom : ` ${CONNECTORS.bottom.right} h ${length} ${CONNECTORS.right.bottom} `,
		};
	}

	return {
		right  : ` ${CONNECTORS.right.top} v ${length} ${CONNECTORS.top.right} `,
		left   : ` ${CONNECTORS.left.top} v ${length} ${CONNECTORS.top.left} `,
		top    : ` ${CONNECTORS.top.left} h ${length} ${CONNECTORS.left.top} `,
		bottom : ` ${CONNECTORS.bottom.left} h ${length} ${CONNECTORS.left.bottom} `,
	};
};

export const generateSVGPaths = ({
	graph = {},
}) => {
	const D_STRING = `M ${INITIAL_POSITION_X} ${INITIAL_POSITION_Y}`;

	const PATHS = [];

	const getPath = (str = '', graphNode = {}) => {
		const { child = {} } = graphNode;
		if (isEmpty(child)) {
			PATHS.push(str);
		} else {
			Object.entries(D_CONFIG).forEach(([dir, dValue]) => {
				if (!isEmpty(child?.[dir])) {
					if (child[dir]?.length === FIRST) {
						const [newChild] = child[dir];
						getPath(`${str} ${dValue}`, newChild);
					} else {
						const mid = Math.floor(child[dir].length / SECOND);
						let length = (
							(LENGTH_FACTOR / SECOND)
							+ SECOND * ADJUSTMENT_FACTOR * CURVE_FACTOR
							- (mid * LENGTH_FACTOR)
						);
						child[dir].forEach((obj) => {
							getPath(
								` ${str} ${ADJUSTED_D_VALUES[dir]} 
								 ${connections(length)[dir]} ${ADJUSTED_D_VALUES[dir]} `,
								obj,
							);
							length += LENGTH_FACTOR;
							if (length > GLOBAL_CONSTANTS.zeroth_index && length < LENGTH_FACTOR) {
								length -= SECOND * SECOND * ADJUSTMENT_FACTOR * CURVE_FACTOR;
							}
						});
					}
				}
			});
		}
	};

	getPath(D_STRING, graph);
	return {
		paths: PATHS,
	};
};
