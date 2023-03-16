/* eslint-disable indent */
import { ResponsiveLine } from '@cogoport/charts/line';
import { ResponsivePie } from '@cogoport/charts/pie';

import useListFaqSearchHistories from '../hooks/ListFaqSearchHistories';

import Filters from './Filters';
import styles from './styles.module.css';

const data = [
  {
    id    : 'Search',
    color : 'hsl(112, 70%, 50%)',
    data  : [
      {
        x : 'Jan',
        y : 15,
      },
      {
        x : 'Feb',
        y : 56,
      },
      {
        x : 'Mar',
        y : 264,
      },
      {
        x : 'Apr',
        y : 15,
      },
      {
        x : 'May',
        y : 154,
      },
      {
        x : 'Jun',
        y : 264,
      },
      {
        x : 'Jul',
        y : 27,
      },
      {
        x : 'Aug',
        y : 8,
      },
      {
        x : 'Sep',
        y : 182,
      },
      {
        x : 'Oct',
        y : 79,
      },
      {
        x : 'Nov',
        y : 254,
      },
      {
        x : 'Dec',
        y : 140,
      },
    ],
  },
  {
    id    : 'Answer Available',
    color : 'hsl(71, 70%, 50%)',
    data  : [
      {
        x : 'Jan',
        y : 15,
      },
      {
        x : 'Feb',
        y : 56,
      },
      {
        x : 'Mar',
        y : 264,
      },
      {
        x : 'Apr',
        y : 15,
      },
      {
        x : 'May',
        y : 154,
      },
      {
        x : 'Jun',
        y : 264,
      },
      {
        x : 'Jul',
        y : 27,
      },
      {
        x : 'Aug',
        y : 8,
      },
      {
        x : 'Sep',
        y : 182,
      },
      {
        x : 'Oct',
        y : 79,
      },
      {
        x : 'Nov',
        y : 254,
      },
      {
        x : 'Dec',
        y : 140,
      },
    ],
  },
  {
    id    : 'Answer Requested',
    color : 'hsl(24, 70%, 50%)',
    data  : [
      {
        x : 'Jan',
        y : 15,
      },
      {
        x : 'Feb',
        y : 56,
      },
      {
        x : 'Mar',
        y : 264,
      },
      {
        x : 'Apr',
        y : 15,
      },
      {
        x : 'May',
        y : 154,
      },
      {
        x : 'Jun',
        y : 264,
      },
      {
        x : 'Jul',
        y : 27,
      },
      {
        x : 'Aug',
        y : 8,
      },
      {
        x : 'Sep',
        y : 18,
      },
      {
        x : 'Oct',
        y : 79,
      },
      {
        x : 'Nov',
        y : 25,
      },
      {
        x : 'Dec',
        y : 14,
      },
    ],
  },
];

function GraphUI() {
  const props = useListFaqSearchHistories({}) || undefined;
  console.log(props);
  const { pie_chart_data } = props?.data || 0;
  const {
        total_dislike = 0,
        total_dislike_percentage = 0,
        total_like = 0,
        total_like_percentage = 0,
        total_requested_questions = 0,
        total_requested_questions_percentage = 0,
        total_search_result_available = 0,
        total_search_result_available_percentage = 0,
        total_search_result_not_available = 0,
        total_search_result_not_available_percentage = 0,
        total_searches = 0,
        total_searches_percentage = 0,
        total_viewed_only_questions = 0,
        total_viewed_only_questions_percentage = 0,
  } = pie_chart_data;

  const data2 = [
    {
      id    : 'Like',
      label : 'Likes',
      value : total_like,
    },
    {
      id    : 'Dislikes',
      label : 'Dislikes',
      value : total_dislike,
    },
    {
      id    : 'Requested',
      label : 'Requested',
      value : total_requested_questions,
    },
    {
      id    : 'Total Search',
      label : 'Total Search',
      value : total_searches,
    },
    {
      id    : 'Viewed Only',
      label : 'Viewed Only',
      value : total_viewed_only_questions,
    },
    {
      id    : 'Search Available',
      label : 'Search Available',
      value : total_search_result_available,
    },
    {
      id    : 'Search not Available',
      label : 'Search not Available',
      value : total_search_result_not_available,
    },
  ];
  return (
	<>
		<Filters />
		<div
			style={{
          margin          : '20px',
          borderRadius    : '10px',
          height          : '400px',
          width           : '1337px',
          backgroundColor : '#FFF',
          justifyContent  : 'space-between',
          display         : 'flex',
			}}
		>
			<div style={{ width: '100%' }}>
				<ResponsiveLine
					style={{ flexBasis: '10%' }}
					data={data}
					margin={{ right: 10, top: 50, bottom: 50, left: 60 }}
					xScale={{ type: 'point' }}
					yScale={{
              type    : 'linear',
              min     : 'auto',
              max     : 'auto',
              stacked : true,
              reverse : false,
					}}
					yFormat=" >-.2f"
					axisTop={null}
					axisRight={null}
					axisBottom={{
              orient         : 'bottom',
              tickSize       : 5,
              tickPadding    : 5,
              tickRotation   : 0,
              legend         : 'transportation',
              legendOffset   : 36,
              legendPosition : 'middle',
					}}
					axisLeft={{
              orient         : 'left',
              tickSize       : 5,
              tickPadding    : 5,
              tickRotation   : 0,
              legend         : 'count',
              legendOffset   : -40,
              legendPosition : 'middle',
					}}
					pointSize={10}
					pointColor={{ theme: 'background' }}
					pointBorderWidth={2}
					pointBorderColor={{ from: 'serieColor' }}
					pointLabelYOffset={-14}
					useMesh
					legends={[
              {
                anchor            : 'upper-left',
                direction         : 'row',
                justify           : false,
                translateX        : 100,
                translateY        : 0,
                itemsSpacing      : 40,
                itemDirection     : 'left-to-right',
                itemWidth         : 90,
                itemHeight        : 90,
                itemOpacity       : 0.75,
                symbolSize        : 16,
                symbolShape       : 'circle',
                symbolBorderColor : 'rgba(0, 0, 0, .5)',
                effects           : [
                  {
                    on    : 'hover',
                    style : {
                      itemBackground : 'rgba(0, 0, 0, .03)',
                      itemOpacity    : 1,
                    },
                  },
                ],
              },
					]}
				/>
			</div>

			<div className={styles.pie_container}>
				<div className={styles.inner_pie}>
					<ResponsivePie
						data={data2}
						margin={{ top: 50, right: 10, bottom: 80, left: 40 }}
						innerRadius={0}
						padAngle={0.7}
						cornerRadius={3}
						activeOuterRadiusOffset={8}
						borderWidth={1}
						borderColor={{
                from      : 'color',
                modifiers : [['darker', 0.2]],
						}}
						enableArcLabels={false}
						enableArcLinkLabels={false}
						defs={[
                {
                  id         : 'dots',
                  type       : 'patternDots',
                  background : 'inherit',
                  color      : 'rgba(255, 255, 255, 0.3)',
                  size       : 4,
                  padding    : 1,
                  stagger    : true,
                },
                {
                  id         : 'lines',
                  type       : 'patternLines',
                  background : 'inherit',
                  color      : 'rgba(255, 255, 255, 0.3)',
                  rotation   : -45,
                  lineWidth  : 6,
                  spacing    : 10,
                },
						]}
						fill={[
                {
                  match: {
                    id: 'ruby',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'c',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'go',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'python',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'scala',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'lisp',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'elixir',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'javascript',
                  },
                  id: 'lines',
                },
						]}
					/>
				</div>

				<div className={styles.outer_pie}>
					<ResponsivePie
						data={data2}
						margin={{ top: 50, right: 10, bottom: 80, left: 40 }}
						innerRadius={0.8}
						padAngle={0.7}
						cornerRadius={3}
						activeOuterRadiusOffset={8}
						borderWidth={1}
						borderColor={{
                from      : 'color',
                modifiers : [['darker', 0.2]],
						}}
						enableArcLabels={false}
						enableArcLinkLabels={false}
						defs={[
                {
                  id         : 'dots',
                  type       : 'patternDots',
                  background : 'inherit',
                  color      : 'rgba(255, 255, 255, 0.3)',
                  size       : 4,
                  padding    : 1,
                  stagger    : true,
                },
                {
                  id         : 'lines',
                  type       : 'patternLines',
                  background : 'inherit',
                  color      : 'rgba(255, 255, 255, 0.3)',
                  rotation   : -45,
                  lineWidth  : 6,
                  spacing    : 10,
                },
						]}
						fill={[
                {
                  match: {
                    id: 'ruby',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'c',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'go',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'python',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'scala',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'lisp',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'elixir',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'javascript',
                  },
                  id: 'lines',
                },
						]}
						legends={[
                {
                  anchor        : 'bottom',
                  direction     : 'row',
                  justify       : false,
                  translateX    : 0,
                  translateY    : 56,
                  itemsSpacing  : 0,
                  itemWidth     : 80,
                  itemHeight    : 18,
                  itemTextColor : '#999',
                  itemDirection : 'left-to-right',
                  itemOpacity   : 1,
                  symbolSize    : 18,
                  symbolShape   : 'circle',
                  effects       : [
                    {
                      on    : 'hover',
                      style : {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
						]}
					/>
				</div>
			</div>
		</div>
	</>
  );
}
export default GraphUI;
