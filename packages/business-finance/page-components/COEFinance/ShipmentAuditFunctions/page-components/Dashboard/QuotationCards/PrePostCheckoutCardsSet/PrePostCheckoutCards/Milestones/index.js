import { cl } from '@cogoport/components';
import { IcMDummyCircle } from '@cogoport/icons-react';

import { getTimelineClassNames, getCircleColor } from '../../../../../../utils/getStyleAttributes';
import MilestoneCardContent from '../MilestoneCardContent';

import styles from './styles.module.css';

const PREV_INDEX = 1;

function Milestones({
	data = {},
	loading = false,
	toggleAccordion = () => {},
	category = '',
	accordionState = {},
	getPrePostShipmentQuotes = () => {},
	shipment_id = '',
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
				<MilestoneCardContent
					loading={loading}
					data={data}
					title={key}
					services={data?.[key]}
					accordionState={accordionState}
					shipment_id={shipment_id}
					toggleAccordion={toggleAccordion}
					category={category}
					getPrePostShipmentQuotes={getPrePostShipmentQuotes}
				/>
			</div>
		</div>
	));
}

export default Milestones;
