import { ResponsiveLine } from '@cogoport/charts/line';
import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function WorkingHrs({ title, graph_detail }) {
	return (
		<div className={styles.container}>
			<div className={styles.header_title}>
				{title}
			</div>
			<div className={styles.line}>
				<ResponsiveLine
					data={graph_detail || []}
					colors={['#FB896B', '#6956E5']}
					margin={{ top: 15, right: 10, bottom: 15, left: 10 }}
					curve="natural"
					lineWidth={1}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min     : 0,
						max     : 'auto',
						stacked : true,
						reverse : false,
					}}
					axisTop={null}
					axisRight={null}
					axisBottom={null}
					axisLeft={null}
					enableGridX={false}
					enableGridY={false}
					enablePoints={false}
					legends={[]}
					animate
				/>
			</div>
			<div className={styles.lengendsData}>
				<div className={styles.legends} style={{ marginRight: 12 }}>
					<div className={cl`${styles.bg_orange} ${styles.legends_dot}`} />
					{' '}
					You
				</div>
				<div className={styles.legends}>
					<div className={cl`${styles.bg_purple} ${styles.legends_dot}`} />
					{' '}
					Your Team
				</div>
			</div>
		</div>
	);
}

export default WorkingHrs;
