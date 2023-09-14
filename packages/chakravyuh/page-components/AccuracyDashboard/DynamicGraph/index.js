import { cl } from '@cogoport/components';
import React, { useState } from 'react';

import { generateSVGPaths } from '../../../utils/generateSVGPaths';
import { getCardsDataFromGraph } from '../../../utils/getCardsDataFromGraph';

import DrillDownCard from './DrillDownCard';
import styles from './styles.module.css';
import SVGLayout from './SVGLayout';

const DEFAULT_ZOOM_LEVEL = 0;

// const DUMMY_GRAPH = {
// 	name        : 'Spot Search',
// 	rates_count : '1230',
// 	parent      : 'GLOBAL PARENT',
// 	child       : {
// 		right: [{
// 			name        : 'Checkout',
// 			rates_count : '1230',
// 			drop        : '10',
// 			child       : {
// 				right: [{
// 					name        : 'Shipment',
// 					rates_count : '1230',
// 					child       : {
// 						bottom: [{
// 							name        : 'Revenue Desk',
// 							rates_count : '1230',
// 							child       : {
// 								bottom: [{
// 									name        : 'SO1',
// 									rates_count : '1230',
// 									child       : {},
// 								}],
// 							},
// 						}],
// 						right: [{
// 							name        : 'Received',
// 							rates_count : '1230',
// 							child       : {
// 								right: [{
// 									name        : 'Confirmed',
// 									rates_count : '1230',
// 									child       : {
// 										right: [
// 											{
// 												name        : 'Cancelled',
// 												rates_count : '1230',
// 												child       : {},
// 											},
// 											{
// 												name        : 'Aborted',
// 												rates_count : '1230',
// 												child       : {},
// 											},
// 											{
// 												name        : 'Completed',
// 												rates_count : '1230',
// 												child       : {},
// 											},
// 										],
// 									},
// 								}],
// 								top: [{
// 									name        : 'OUTDATED',
// 									rates_count : '1230',
// 									child       : {},
// 								}],
// 							},
// 						}],
// 					},
// 				}],
// 			},
// 		}],
// 	},
// };

const DUMMY_GRAPH = {
	name        : 'Spot Search',
	rates_count : '1230',
	parent      : 'GLOBAL PARENT',
	child       : {
		right: [
			{
				name        : 'Checkout',
				rates_count : '1230',
				drop        : '23',
				child       : {
					right: [
						{
							name        : 'Booking Confirm',
							rates_count : '1230',
							child       : {
								right: [
									{
										name        : 'Revenue Desk',
										rates_count : '1230',
										child       : {
											right: [{
												name        : '',
												rates_count : '1230',
												child       : {},
											}],
										},
									},
								],
							},
						},
					],
				},
			},
			{
				name        : 'Checkout',
				rates_count : '1230',
				child       : {
					right: [
						{
							name        : 'Booking Confirm',
							rates_count : '1230',
							child       : {
								right: [
									{
										name        : 'Revenue Desk',
										rates_count : '1230',
										child       : {
											right: [{
												name        : '',
												rates_count : '1230',
												child       : {},
											}],
										},
									},
								],
							},
						},
					],
				},
			},
			{
				name        : 'Checkout',
				rates_count : '1230',
				child       : {
					right: [
						{
							name        : 'Booking Confirm',
							rates_count : '1230',
							child       : {
								right: [
									{
										name        : 'Revenue Desk',
										rates_count : '1230',
										child       : {
											right: [{
												name        : '',
												rates_count : '1230',
												child       : {},
											}],
										},
									},
								],
							},
						},
					],
				},
			},
			{
				name        : 'Checkout',
				rates_count : '1230',
				child       : {
					right: [
						{
							name        : 'Booking Confirm',
							rates_count : '1230',
							child       : {
								right: [
									{
										name        : 'Revenue Desk',
										rates_count : '1230',
										child       : {
											right: [{
												name        : '',
												rates_count : '1230',
												child       : {},
											}],
										},
									},
								],
							},
						},
					],
				},
			},
		],
	},
};

function DynamicGraph() {
	const [activeParent, setActiveParent] = useState(null);
	const { paths } = generateSVGPaths({
		graph: DUMMY_GRAPH,
	});
	const { cards } = getCardsDataFromGraph({
		graph: DUMMY_GRAPH,
	});
	const handleClick = (val) => {
		setActiveParent(val);
	};

	return (
		<div className={cl`${styles.container} ${styles[`parent_zoom_level_${DEFAULT_ZOOM_LEVEL}`]}`}>
			<div className={cl`${styles.graph_layout} ${styles.zoom_child}`}>
				<div className={styles.svg_layout}>
					<SVGLayout paths={paths} />
				</div>
				<div className={styles.cards_layout}>
					{cards.map((item) => {
						const { position } = item;
						const isActive = activeParent === item.action_type;
						return (
							<div
								className={cl`${styles.card_container} ${isActive ? styles.to_top : ''}`}
								key={item.action_type}
								style={{ ...position }}
							>
								<DrillDownCard
									key={item.action_type}
									data={item}
									cardIndex={1}
                                        // delay={
                                        // 	(FACTOR * rowIdx)
                                        // 	// + (DEFAULT_DELAY + colIdx * (FACTOR / (row.length - FACTOR || FACTOR)))
                                        // }
									delay={0}
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

export default DynamicGraph;
