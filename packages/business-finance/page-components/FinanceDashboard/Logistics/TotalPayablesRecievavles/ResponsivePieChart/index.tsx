import { ResponsivePie } from '@cogoport/charts/pie/index';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function ResponsivePieChart({ pieData }) {
	return (
		<ResponsivePie
			data={pieData}
			margin={{ top: 20, right: 80, bottom: 20, left: 0 }}
			startAngle={-180}
			endAngle={336}
			innerRadius={0}
			sortByValue
			colors={['#88CAD1', '#CFEAED']}
			enableArcLabels={false}
			activeOuterRadiusOffset={19}
			activeInnerRadiusOffset={13}
			enableArcLinkLabels={false}
			motionConfig={{
				mass      : 1,
				tension   : 500,
				friction  : 500,
				clamp     : true,
				precision : 0.01,
				velocity  : 0,
			}}
			tooltip={({ datum: { label, value } }) => (

				<div className={styles.toolTip_div}>
					<div className={styles.toolTip_title}>
						<div className={label === 'onAccount' ? styles.color_dot_outstanding : styles.color_dot}> </div>
						{label}
						:
						<div className={styles.toolTip_amount}>
							{formatAmount({
								amount   :	value as any,
								currency : GLOBAL_CONSTANTS.currency_code.INR,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							})}
						</div>
					</div>
				</div>
			)}
			transitionMode="middleAngle"

		/>
	);
}
export default ResponsivePieChart;
