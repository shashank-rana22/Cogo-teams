import { ResponsiveStream } from '@cogoport/charts/stream/index';
import { Loader } from '@cogoport/components';

import { getformatPrice } from '../../../../../../commons/getFormatPrice';

import styles from './styles.module.css';

function ResponsiveChart({ data, loadingData }) {
	return (
		loadingData ? <div className={styles.loader}><Loader style={{ height: '100px', width: '50px' }} /></div>
			: (
				<ResponsiveStream
					data={data}
					keys={[
						'Count',
						'Amount',
					]}
					margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize     : 5,
						tickPadding  : 5,
						tickRotation : 0,
						legend       : '',
						legendOffset : 36,
					}}
					axisLeft={{
						tickSize     : 5,
						tickPadding  : 5,
						tickRotation : 0,
						legend       : '',
						legendOffset : -40,
						format       : (value) => getformatPrice(value),
					}}
					enableGridX={false}
					enableGridY
					curve="linear"
					offsetType="none"
					colors={['#FFE8A4']}
					fillOpacity={0.7}
					borderColor={{ theme: 'background' }}
					legends={[
						{
							anchor        : 'bottom-right',
							direction     : 'column',
							translateX    : 100,
							itemWidth     : 80,
							itemHeight    : 20,
							itemTextColor : '#999999',
							symbolSize    : 12,
							symbolShape   : 'circle',
							effects       : [
								{
									on    : 'hover',
									style : {
										itemTextColor: '#000000',
									},
								},
							],
						},
					]}
				/>
			)
	);
}
export default ResponsiveChart;
