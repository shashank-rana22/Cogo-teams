import { ResponsiveLine } from '@cogoport/charts/line';
import { Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../../../commons/EmptyStateDocs';

import styles from './styles.module.css';

const LIMIT_FOR_LEGEND = 1;

function ResponsiveChart({ data = [], loadingData, entityCode, showCount = true }) {
	data?.sort((a, b) => {
		const dateA = new Date(`${a.year}-${a.date} 00:00:00`);
		const dateB = new Date(`${b.year}-${b.date} 00:00:00`);
		return dateA.getTime() - dateB.getTime();
	});

	const { t = () => '' } = useTranslation(['accountRecievables']);

	const { currency } = GLOBAL_CONSTANTS.cogoport_entities?.[entityCode] || {};

	const AMOUNT_DATA = [];
	const COUNT_DATA = [];

	(data || []).forEach((item) => {
		AMOUNT_DATA.push({
			x : item.date,
			y : item.Amount,
		});
		COUNT_DATA.push({
			x : item.date,
			y : item.Count,
		});
	});

	const finalData = [
		{
			id   : `Amount (in ${currency})`,
			data : AMOUNT_DATA,
		},
		{
			id   : 'Count',
			data : COUNT_DATA,
		},
	];

	const formatdata = showCount ? finalData : [
		{
			id   : `Amount (in ${currency})`,
			data : AMOUNT_DATA,
		},
	];

	if (!data.length && !loadingData) {
		return <EmptyState />;
	}
	return (
		loadingData ? <div className={styles.loader}><Loader style={{ height: '100px', width: '50px' }} /></div>
			: (
				<ResponsiveLine
					data={formatdata}
					margin={{ top: 10, right: 120, bottom: 100, left: 90 }}
					xScale={{ type: 'point' }}
					enableGridX={false}
					colors={['#88CAD1', '#F68B21']}
					enableSlices="x"
					yScale={{ type: 'linear', min: 0, max: 'auto' }}
					yFormat={(value) => formatAmount({
						amount: value,
						currency,
					})}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize       : 5,
						tickPadding    : 10,
						tickRotation   : 36,
						legend         : t('date'),
						legendOffset   : 46,
						legendPosition : 'middle',
					}}
					axisLeft={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : t('amount'),
						legendOffset   : -84,
						legendPosition : 'middle',
						format         : (value) => formatAmount({
							amount  :	value,
							currency,
							options : {
								currencyDisplay : 'code',
								style           : 'currency',
								notation        : 'compact',
								compactDisplay  : 'short',
								currencyWise    : true,
							},
						}),
					}}
					pointSize={5}
					pointBorderWidth={2}
					pointBorderColor={{ from: 'serieColor' }}
					pointLabelYOffset={-12}
					useMesh
					legends={formatdata.length > LIMIT_FOR_LEGEND ? [{
						anchor            : 'bottom-right',
						direction         : 'column',
						justify           : false,
						translateX        : 100,
						translateY        : 0,
						itemsSpacing      : 0,
						itemDirection     : 'left-to-right',
						itemWidth         : 80,
						itemHeight        : 20,
						itemOpacity       : 0.75,
						symbolSize        : 12,
						symbolShape       : 'circle',
						symbolBorderColor : 'rgba(0, 0, 0, .5)',
						effects           : [{
							on    : 'hover',
							style : { itemBackground: 'rgba(0, 0, 0, .03)', itemOpacity: 1 },
						}],
					}] : []}
				/>
			)
	);
}

export default ResponsiveChart;
