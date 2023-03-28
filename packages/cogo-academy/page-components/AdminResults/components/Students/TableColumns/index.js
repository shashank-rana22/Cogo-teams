import { startCase, format } from '@cogoport/utils';

import SortComponent from './SortComponent';

const tableColumns = ({ sortType, sortBy, setSortBy, setSortType }) => [
	{
		Header: (
			<div style={{ display: 'flex', alignItems: 'baseline' }}>
				<div style={{ marginRight: '12px' }}>NAME</div>

				<SortComponent
					val="user"
					sortBy={sortBy}
					sortType={sortType}
					setSortBy={setSortBy}
					setSortType={setSortType}
				/>
			</div>
		),
		id       : 'a',
		accessor : ({ user = '' }) => <section>{user}</section>,
	},

	{
		Header   : <div>PASSED/FAILED</div>,
		id       : 'ss',
		accessor : ({ result = 0 }) => (
			<section>{startCase(result) || '-'}</section>
		),
	},
	{
		Header: (
			<div style={{ display: 'flex', alignItems: 'baseline' }}>
				<div style={{ marginRight: '12px' }}>SCORE</div>

				<SortComponent
					val="score_achieved"
					sortBy={sortBy}
					sortType={sortType}
					setSortBy={setSortBy}
					setSortType={setSortType}
				/>
			</div>
		),
		id       : 'e',
		accessor : ({ score_achieved = '', total_score }) => (
			<section>
				{score_achieved || '0'}
				/
				{total_score}
			</section>
		),
	},
	{
		Header: (
			<div style={{ display: 'flex', alignItems: 'baseline' }}>
				<div style={{ marginRight: '12px' }}>PERCENTILE</div>

				<SortComponent
					val="percentile"
					sortBy={sortBy}
					sortType={sortType}
					setSortBy={setSortBy}
					setSortType={setSortType}
				/>
			</div>
		),
		id       : 'results',
		accessor : ({ percentile = '' }) => (
			<div>{percentile !== null ? percentile.toFixed(2) : ' '}</div>
		),
	},
	{
		Header: (
			<div style={{ display: 'flex', alignItems: 'baseline' }}>
				<div style={{ marginRight: '12px' }}>TIME TAKEN</div>

				<SortComponent
					val="time_taken"
					sortBy={sortBy}
					sortType={sortType}
					setSortBy={setSortBy}
					setSortType={setSortType}
				/>
			</div>
		),
		id       : 'time',
		accessor : ({ time_taken = '' }) => <div>{time_taken}</div>,
	},
	{
		Header: (
			<div style={{ display: 'flex', alignItems: 'baseline' }}>
				<div style={{ marginRight: '12px' }}>ATTEMPTED ON</div>

				<SortComponent
					val="attempted_on"
					sortBy={sortBy}
					sortType={sortType}
					setSortBy={setSortBy}
					setSortType={setSortType}
				/>
			</div>
		),
		id       : 'updatedAt',
		accessor : ({ attempted_on = '' }) => (
			<section>{format(attempted_on, 'dd MMM yyyy hh:mm a')}</section>
		),
	},
];

export default tableColumns;
