// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { cl } from '@cogoport/components';
import { IcMDummyCircle } from '@cogoport/icons-react';

import { getTimelineClassNames, getCircleColor } from '../../../../../utils/getStyleAttributes';
import CardContent from '../CardContent';

import styles from './styles.module.css';

const PREV_INDEX = 1;

function GenerateColumn({
	data = {},
	loading = false,
	toggleAccordion,
	setAccordionState,
	category = '',
	accordionState,
	getPrePostShipmentQuotes,
}) {
	return Object.keys(data).map((key, index) => (
		<div key={key}>
			<div style={{ display: 'flex', width: '100%' }}>
				<div className={styles.vertical_timeline}>
					{ (index !== (Object.keys(data).length - PREV_INDEX)) ? (
						<>
							<IcMDummyCircle
								fill={getCircleColor(
									data?.[key]?.finalStatus,
									accordionState,
									`${category}_${key}`,
								)}
								height="20"
								width="20"
							/>
							<div className={cl`${styles.vertical_rule} 
							${getTimelineClassNames(
								data?.[key]?.finalStatus,
								accordionState,
								`${category}_${key}`,
								styles,
							)}`}
							/>
						</>
					) : (
						<IcMDummyCircle
							fill={getCircleColor(
								data?.[key]?.finalStatus,
								accordionState,
								`${category}_${key}`,
							)}
							height="20"
							width="20"
							style={{ marginBottom: '24px' }}
						/>
					) }

				</div>
				<CardContent
					loading={loading}
					data={data}
					title={key}
					services={data?.[key]}
					accordionState={accordionState}
					toggleAccordion={toggleAccordion}
					setAccordionState={setAccordionState}
					category={category}
					getPrePostShipmentQuotes={getPrePostShipmentQuotes}
				/>
			</div>
		</div>
	));
}

export default GenerateColumn;
