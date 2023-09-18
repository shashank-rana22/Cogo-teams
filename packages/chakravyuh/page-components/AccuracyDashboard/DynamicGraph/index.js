import React, { useState } from 'react';

import GraphLayout from './GraphLayout';

const DUMMY_GRAPH_1 = {
	name        : 'Spot Search',
	rates_count : '1230',
	parent      : 'GLOBAL PARENT',
	child       : {
		right: [{
			name        : 'Checkout',
			rates_count : '1230',
			drop        : '10',
			child       : {
				right: [{
					name        : 'Shipment',
					rates_count : '1230',
					child       : {
						right: [{
							name        : 'Confirmed',
							rates_count : '1230',
							child       : {
								right: [
									{
										name        : 'Completed',
										rates_count : '1230',
										child       : {},
									},
									{
										name        : 'Aborted',
										rates_count : '1230',
										child       : {},
									},
									{
										name        : 'Cancelled',
										rates_count : '1230',
										child       : {},
									},
								],
								bottom: [{
									name        : 'Revenue Desk',
									rates_count : '1230',
									child       : {
										bottom: [{
											name        : 'SO1',
											rates_count : '1230',
											child       : {},
										}],
									},
								}],
							},
						}],
					},
				}],
			},
		}],
	},
};

const DUMMY_GRAPH_2 = {
	name        : 'Spot Search',
	rates_count : '1230',
	parent      : 'GLOBAL PARENT',
	child       : {
		right: [
			{
				name        : 'Rate Shown',
				rates_count : '1230',
				child       : {
					right: [
						{
							name        : 'Disliked',
							rates_count : '1230',
							child       : {
								right: [
									{
										name        : 'Feedback Recieved',
										rates_count : '1230',
										child       : {
											right: [
												{
													name        : 'Rate Reverted Feedbacks',
													rates_count : '1230',
													child       : {
														right: [
															{
																name        : 'Rates Reverted',
																rates_count : '1230',
																child       : {},
															},
														],
													},
												},
											],
										},
									},
								],
							},
						},
						{
							name        : 'Liked',
							rates_count : '1230',
							child       : {},
						},
					],
				},
			},
		],
	},
};

const DUMMY_GRAPH_3 = {
	name        : 'Spot Search',
	rates_count : '1230',
	parent      : 'GLOBAL PARENT',
	child       : {
		right: [{
			name        : 'Rates Requested',
			rates_count : '1230',
			parent      : 'GLOBAL PARENT',
			child       : {
				right: [{
					name        : 'Requests Closed',
					rates_count : '1230',
					parent      : 'GLOBAL PARENT',
					child       : {
						right: [{
							name        : 'Rates Reverted',
							rates_count : '1230',
							parent      : 'GLOBAL PARENT',
							child       : {},
						}],
					},
				}],
			},
		}],
	},
};

function DynamicGraph() {
	const [activeParent, setActiveParent] = useState(null);
	const graphsList = [DUMMY_GRAPH_1, DUMMY_GRAPH_2, DUMMY_GRAPH_3];

	return (
		graphsList.map((graph) => (
			<GraphLayout
				key={graph}
				graph={graph}
				activeParent={activeParent}
				setActiveParent={setActiveParent}
			/>
		))
	);
}

export default DynamicGraph;
