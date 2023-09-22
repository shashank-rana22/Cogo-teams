import { Placeholder } from '@cogoport/components';
import React, { useState } from 'react';

import useGetFclFreightRateLifecycle from '../../../hooks/useGetFclFreightRateLifecycle';

import GraphLayout from './GraphLayout';
import styles from './styles.module.css';
// const DUMMY_GRAPH_1 = {
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
// 						right: [{
// 							name        : 'Confirmed',
// 							rates_count : '1230',
// 							child       : {
// 								right: [
// 									{
// 										name        : 'Completed',
// 										rates_count : '1230',
// 										child       : {},
// 									},
// 									{
// 										name        : 'Aborted',
// 										rates_count : '1230',
// 										child       : {},
// 									},
// 									{
// 										name        : 'Cancelled',
// 										rates_count : '1230',
// 										child       : {},
// 									},
// 								],
// 								bottom: [{
// 									name        : 'Revenue Desk',
// 									rates_count : '1230',
// 									child       : {
// 										bottom: [{
// 											name        : 'SO1',
// 											rates_count : '1230',
// 											child       : {},
// 										}],
// 									},
// 								}],
// 							},
// 						}],
// 					},
// 				}],
// 			},
// 		}],
// 	},
// };

// const DUMMY_GRAPH_2 = {
// 	name        : 'Spot Search',
// 	rates_count : '1230',
// 	parent      : 'GLOBAL PARENT',
// 	child       : {
// 		right: [
// 			{
// 				name        : 'Rate Shown',
// 				rates_count : '1230',
// 				child       : {
// 					right: [
// 						{
// 							name        : 'Disliked',
// 							rates_count : '1230',
// 							child       : {
// 								right: [
// 									{
// 										name        : 'Feedback Recieved',
// 										rates_count : '1230',
// 										child       : {
// 											right: [
// 												{
// 													name        : 'Rate Reverted Feedbacks',
// 													rates_count : '1230',
// 													child       : {
// 														right: [
// 															{
// 																name        : 'Rates Reverted',
// 																rates_count : '1230',
// 																child       : {},
// 															},
// 														],
// 													},
// 												},
// 											],
// 										},
// 									},
// 								],
// 							},
// 						},
// 						{
// 							name        : 'Liked',
// 							rates_count : '1230',
// 							child       : {},
// 						},
// 					],
// 				},
// 			},
// 		],
// 	},
// };

// const DUMMY_GRAPH_3 = {
// 	name        : 'Spot Search',
// 	rates_count : '1230',
// 	parent      : 'GLOBAL PARENT',
// 	child       : {
// 		right: [{
// 			name        : 'Rates Requested',
// 			rates_count : '1230',
// 			parent      : 'GLOBAL PARENT',
// 			child       : {
// 				right: [{
// 					name        : 'Requests Closed',
// 					rates_count : '1230',
// 					parent      : 'GLOBAL PARENT',
// 					child       : {
// 						right: [{
// 							name        : 'Rates Reverted',
// 							rates_count : '1230',
// 							parent      : 'GLOBAL PARENT',
// 							child       : {},
// 						}],
// 					},
// 				}],
// 			},
// 		}],
// 	},
// };
const PLACEHOLDER_LENGTH = 3;
function DynamicGraph({ globalFilters = {} }) {
	const [activeParent, setActiveParent] = useState(null);
	const { loading, graphs } = useGetFclFreightRateLifecycle({ globalFilters });
	// const graphsList = [DUMMY_GRAPH_1, DUMMY_GRAPH_2, DUMMY_GRAPH_3];
	const graphsList = Object.entries(graphs || {}).map(([title, value]) => ({
		title,
		graph: value,
	})) || [];

	return (
		<>
			{graphsList.map(({ title = 'rate_lifecycle', graph }) => (
				<GraphLayout
					key={graph}
					graph={graph}
					title={title}
					activeParent={activeParent}
					setActiveParent={setActiveParent}
				/>
			))}
			{loading
				? [...Array(PLACEHOLDER_LENGTH).keys()].map((key) => (
					<Placeholder
						key={key}
						className={styles.graph_placeholder}
						width="100%"
						height="400px"
						margin="24px 0"
					/>
				))
				: null}
		</>
	);
}

export default DynamicGraph;
