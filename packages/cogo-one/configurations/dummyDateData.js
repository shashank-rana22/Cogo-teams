// export const DateChartDummyData = [
// 	{
// 		id: 'on messages',

// 		data: [
// 			{
// 				x : '7-8 Am',
// 				y : 29,
// 			},
// 			{
// 				x : '8-9 Am',
// 				y : 21,
// 			},
// 			{
// 				x : '9-10 Am',
// 				y : 14,
// 			},
// 			{
// 				x : '10-11 Am',
// 				y : 9,
// 			},
// 			{
// 				x : '11-12 Am',
// 				y : 18,
// 			},
// 			{
// 				x : '12-1 Pm',
// 				y : 7,
// 			},
// 			{
// 				x : '1-2 Pm',
// 				y : 28,
// 			},
// 			{
// 				x : '2-3 PM',
// 				y : 31,
// 			},
// 			{
// 				x : '3-4 Pm',
// 				y : 39,
// 			},
// 			{
// 				x : '4-5 Pm',
// 				y : 23,
// 			},
// 			{
// 				x : '5-6 Pm',
// 				y : 40,
// 			},

// 		],
// 	},
// 	{
// 		id: 'on calls',

// 		data: [
// 			{
// 				x : '7-8 Am',
// 				y : 6,
// 			},
// 			{
// 				x : '8-9 Am',
// 				y : 19,
// 			},
// 			{
// 				x : '9-10 Am',
// 				y : 35,
// 			},
// 			{
// 				x : '10-11 Am',
// 				y : 40,
// 			},
// 			{
// 				x : '11-12 Am',
// 				y : 24,
// 			},
// 			{
// 				x : '12-1 Pm',
// 				y : 12,
// 			},
// 			{
// 				x : '1-2 Pm',
// 				y : 9,
// 			},
// 			{
// 				x : '2-3 PM',
// 				y : 34,
// 			},
// 			{
// 				x : '3-4 Pm',
// 				y : 39,
// 			},
// 			{
// 				x : '4-5 Pm',
// 				y : 11,
// 			},
// 			{
// 				x : '5-6 Pm',
// 				y : 13,
// 			},
// 		],
// 	},

// ];

import { format, isEmpty } from '@cogoport/utils';

const emptyChartData = {
	day: {
		call_graph_data: {
			'2023-02-28T00:00:00+00:00 to 2023-02-28T01:00:00+00:00' : 0,
			'2023-02-28T01:00:00+00:00 to 2023-02-28T02:00:00+00:00' : 0,
			'2023-02-28T02:00:00+00:00 to 2023-02-28T03:00:00+00:00' : 0,
			'2023-02-28T03:00:00+00:00 to 2023-02-28T04:00:00+00:00' : 0,
			'2023-02-28T04:00:00+00:00 to 2023-02-28T05:00:00+00:00' : 0,
			'2023-02-28T05:00:00+00:00 to 2023-02-28T06:00:00+00:00' : 0,
			'2023-02-28T06:00:00+00:00 to 2023-02-28T07:00:00+00:00' : 0,
			'2023-02-28T07:00:00+00:00 to 2023-02-28T08:00:00+00:00' : 0,
			'2023-02-28T08:00:00+00:00 to 2023-02-28T09:00:00+00:00' : 0,
			'2023-02-28T09:00:00+00:00 to 2023-02-28T10:00:00+00:00' : 0,
			'2023-02-28T10:00:00+00:00 to 2023-02-28T11:00:00+00:00' : 0,
			'2023-02-28T11:00:00+00:00 to 2023-02-28T12:00:00+00:00' : 0,
			'2023-02-28T12:00:00+00:00 to 2023-02-28T13:00:00+00:00' : 0,
			'2023-02-28T13:00:00+00:00 to 2023-02-28T14:00:00+00:00' : 0,
			'2023-02-28T14:00:00+00:00 to 2023-02-28T15:00:00+00:00' : 0,
			'2023-02-28T15:00:00+00:00 to 2023-02-28T16:00:00+00:00' : 0,
			'2023-02-28T16:00:00+00:00 to 2023-02-28T17:00:00+00:00' : 0,
			'2023-02-28T17:00:00+00:00 to 2023-02-28T18:00:00+00:00' : 0,
			'2023-02-28T18:00:00+00:00 to 2023-02-28T19:00:00+00:00' : 0,
			'2023-02-28T19:00:00+00:00 to 2023-02-28T20:00:00+00:00' : 0,
			'2023-02-28T20:00:00+00:00 to 2023-02-28T21:00:00+00:00' : 0,
			'2023-02-28T21:00:00+00:00 to 2023-02-28T22:00:00+00:00' : 0,
			'2023-02-28T22:00:00+00:00 to 2023-02-28T23:00:00+00:00' : 0,
			'2023-02-28T23:00:00+00:00 to 2023-03-01T00:00:00+00:00' : 0,
		},
		message_graph_data: {
			'2023-02-28T00:00:00+00:00 to 2023-02-28T01:00:00+00:00' : 0,
			'2023-02-28T01:00:00+00:00 to 2023-02-28T02:00:00+00:00' : 0,
			'2023-02-28T02:00:00+00:00 to 2023-02-28T03:00:00+00:00' : 0,
			'2023-02-28T03:00:00+00:00 to 2023-02-28T04:00:00+00:00' : 0,
			'2023-02-28T04:00:00+00:00 to 2023-02-28T05:00:00+00:00' : 0,
			'2023-02-28T05:00:00+00:00 to 2023-02-28T06:00:00+00:00' : 0,
			'2023-02-28T06:00:00+00:00 to 2023-02-28T07:00:00+00:00' : 0,
			'2023-02-28T07:00:00+00:00 to 2023-02-28T08:00:00+00:00' : 0,
			'2023-02-28T08:00:00+00:00 to 2023-02-28T09:00:00+00:00' : 0,
			'2023-02-28T09:00:00+00:00 to 2023-02-28T10:00:00+00:00' : 0,
			'2023-02-28T10:00:00+00:00 to 2023-02-28T11:00:00+00:00' : 0,
			'2023-02-28T11:00:00+00:00 to 2023-02-28T12:00:00+00:00' : 0,
			'2023-02-28T12:00:00+00:00 to 2023-02-28T13:00:00+00:00' : 0,
			'2023-02-28T13:00:00+00:00 to 2023-02-28T14:00:00+00:00' : 0,
			'2023-02-28T14:00:00+00:00 to 2023-02-28T15:00:00+00:00' : 0,
			'2023-02-28T15:00:00+00:00 to 2023-02-28T16:00:00+00:00' : 0,
			'2023-02-28T16:00:00+00:00 to 2023-02-28T17:00:00+00:00' : 0,
			'2023-02-28T17:00:00+00:00 to 2023-02-28T18:00:00+00:00' : 0,
			'2023-02-28T18:00:00+00:00 to 2023-02-28T19:00:00+00:00' : 0,
			'2023-02-28T19:00:00+00:00 to 2023-02-28T20:00:00+00:00' : 0,
			'2023-02-28T20:00:00+00:00 to 2023-02-28T21:00:00+00:00' : 0,
			'2023-02-28T21:00:00+00:00 to 2023-02-28T22:00:00+00:00' : 0,
			'2023-02-28T22:00:00+00:00 to 2023-02-28T23:00:00+00:00' : 0,
			'2023-02-28T23:00:00+00:00 to 2023-03-01T00:00:00+00:00' : 0,
		},
	},
	week: {
		call_graph_data: {
			'2023-02-01T00:00:00+00:00 to 2023-02-02T01:00:00+00:00' : 0,
			'2023-02-02T01:00:00+00:00 to 2023-02-03T02:00:00+00:00' : 0,
			'2023-02-03T02:00:00+00:00 to 2023-02-04T03:00:00+00:00' : 0,
			'2023-02-04T03:00:00+00:00 to 2023-02-05T04:00:00+00:00' : 0,
			'2023-02-05T04:00:00+00:00 to 2023-02-06T05:00:00+00:00' : 0,
			'2023-02-06T05:00:00+00:00 to 2023-02-07T06:00:00+00:00' : 0,
			'2023-02-07T06:00:00+00:00 to 2023-02-08T07:00:00+00:00' : 0,
			'2023-02-08T07:00:00+00:00 to 2023-02-09T08:00:00+00:00' : 0,
			'2023-02-09T08:00:00+00:00 to 2023-02-10T09:00:00+00:00' : 0,
			'2023-02-10T09:00:00+00:00 to 2023-02-11T13:00:00+00:00' : 0,
			'2023-02-11T10:00:00+00:00 to 2023-02-12T11:00:00+00:00' : 0,
			'2023-02-12T11:00:00+00:00 to 2023-02-13T12:00:00+00:00' : 0,
			'2023-02-13T12:00:00+00:00 to 2023-02-14T13:00:00+00:00' : 0,
			'2023-02-14T13:00:00+00:00 to 2023-02-15T14:00:00+00:00' : 0,
			'2023-02-15T14:00:00+00:00 to 2023-02-16T15:00:00+00:00' : 0,
			'2023-02-16T15:00:00+00:00 to 2023-02-17T16:00:00+00:00' : 0,
			'2023-02-17T16:00:00+00:00 to 2023-02-18T17:00:00+00:00' : 0,
			'2023-02-18T17:00:00+00:00 to 2023-02-19T18:00:00+00:00' : 0,
			'2023-02-19T18:00:00+00:00 to 2023-02-20T19:00:00+00:00' : 0,
			'2023-02-20T19:00:00+00:00 to 2023-02-21T20:00:00+00:00' : 0,
			'2023-02-21T20:00:00+00:00 to 2023-02-22T21:00:00+00:00' : 0,
			'2023-02-22T21:00:00+00:00 to 2023-02-23T22:00:00+00:00' : 0,
			'2023-02-23T22:00:00+00:00 to 2023-02-24T23:00:00+00:00' : 0,
			'2023-02-24T23:00:00+00:00 to 2023-03-25T00:00:00+00:00' : 0,
			'2023-02-25T23:00:00+00:00 to 2023-03-26T00:00:00+00:00' : 0,
			'2023-02-26T23:00:00+00:00 to 2023-03-27T00:00:00+00:00' : 0,
			'2023-02-27T23:00:00+00:00 to 2023-03-28T00:00:00+00:00' : 0,

		},
		message_graph_data: {
			'2023-02-01T00:00:00+00:00 to 2023-02-02T01:00:00+00:00' : 0,
			'2023-02-02T01:00:00+00:00 to 2023-02-03T02:00:00+00:00' : 0,
			'2023-02-03T02:00:00+00:00 to 2023-02-04T03:00:00+00:00' : 0,
			'2023-02-04T03:00:00+00:00 to 2023-02-05T04:00:00+00:00' : 0,
			'2023-02-05T04:00:00+00:00 to 2023-02-06T05:00:00+00:00' : 0,
			'2023-02-06T05:00:00+00:00 to 2023-02-07T06:00:00+00:00' : 0,
			'2023-02-07T06:00:00+00:00 to 2023-02-08T07:00:00+00:00' : 0,
			'2023-02-08T07:00:00+00:00 to 2023-02-09T08:00:00+00:00' : 0,
			'2023-02-09T08:00:00+00:00 to 2023-02-10T09:00:00+00:00' : 0,
			'2023-02-10T09:00:00+00:00 to 2023-02-11T13:00:00+00:00' : 0,
			'2023-02-11T10:00:00+00:00 to 2023-02-12T11:00:00+00:00' : 0,
			'2023-02-12T11:00:00+00:00 to 2023-02-13T12:00:00+00:00' : 0,
			'2023-02-13T12:00:00+00:00 to 2023-02-14T13:00:00+00:00' : 0,
			'2023-02-14T13:00:00+00:00 to 2023-02-15T14:00:00+00:00' : 0,
			'2023-02-15T14:00:00+00:00 to 2023-02-16T15:00:00+00:00' : 0,
			'2023-02-16T15:00:00+00:00 to 2023-02-17T16:00:00+00:00' : 0,
			'2023-02-17T16:00:00+00:00 to 2023-02-18T17:00:00+00:00' : 0,
			'2023-02-18T17:00:00+00:00 to 2023-02-19T18:00:00+00:00' : 0,
			'2023-02-19T18:00:00+00:00 to 2023-02-20T19:00:00+00:00' : 0,
			'2023-02-20T19:00:00+00:00 to 2023-02-21T20:00:00+00:00' : 0,
			'2023-02-21T20:00:00+00:00 to 2023-02-22T21:00:00+00:00' : 0,
			'2023-02-22T21:00:00+00:00 to 2023-02-23T22:00:00+00:00' : 0,
			'2023-02-23T22:00:00+00:00 to 2023-02-24T23:00:00+00:00' : 0,
			'2023-02-24T23:00:00+00:00 to 2023-03-25T00:00:00+00:00' : 0,
			'2023-02-25T23:00:00+00:00 to 2023-03-26T00:00:00+00:00' : 0,
			'2023-02-26T23:00:00+00:00 to 2023-03-27T00:00:00+00:00' : 0,
			'2023-02-27T23:00:00+00:00 to 2023-03-28T00:00:00+00:00' : 0,
		},
	},
	month: {
		call_graph_data: {
			'2023-02-01T00:00:00+00:00 to 2023-02-07T01:00:00+00:00' : 0,
			'2023-02-08T01:00:00+00:00 to 2023-02-14T02:00:00+00:00' : 0,
			'2023-02-15T02:00:00+00:00 to 2023-02-21T03:00:00+00:00' : 0,
			'2023-02-22T03:00:00+00:00 to 2023-02-28T04:00:00+00:00' : 0,
		},
		message_graph_data: {
			'2023-02-01T00:00:00+00:00 to 2023-02-07T01:00:00+00:00' : 0,
			'2023-02-08T01:00:00+00:00 to 2023-02-14T02:00:00+00:00' : 0,
			'2023-02-15T02:00:00+00:00 to 2023-02-21T03:00:00+00:00' : 0,
			'2023-02-22T03:00:00+00:00 to 2023-02-28T04:00:00+00:00' : 0,
		},
	},
};

const FORMAT_TYPE = {
	day: {
		label: 'HH',
	},
	week: {
		label: 'dd',
	},
	month: {
		label: 'dd',
	},
};

const chartData = ({ cogoOneDashboardGraph = {} }, timeline) => {
	const { message_graph_data = {}, call_graph_data = {} }	= isEmpty(cogoOneDashboardGraph)
		? emptyChartData[timeline]
		: cogoOneDashboardGraph;

	// console.log('message_ ::', message_graph_data);
	// console.log('message_ ::', call_graph_data);

	const messageChatKeys = Object.keys(message_graph_data);
	const callChatKeys = Object.keys(call_graph_data);

	// console.log('messageChatKeys ::', messageChatKeys);
	// console.log('callChatKeys ::', callChatKeys);

	const messageData = messageChatKeys.map((key) => {
		const dates = key.split(' to ');
		return {
			x : `${format(dates[0], FORMAT_TYPE[timeline]?.label)} ${format(dates[1], FORMAT_TYPE[timeline]?.label)}`,
			y : message_graph_data[key],
		};
	});
	const callData = callChatKeys.map((key) => {
		const dates = key.split(' to ');
		return {
			x : `${format(dates[0], FORMAT_TYPE[timeline]?.label)} ${format(dates[1], FORMAT_TYPE[timeline]?.label)}`,
			y : call_graph_data[key],
		};
	});

	return [
		{
			id   : 'on messages',
			data : messageData || [],
		},
		{
			id   : 'on calls',
			data : callData || [],
		},
	];
};

export default chartData;
