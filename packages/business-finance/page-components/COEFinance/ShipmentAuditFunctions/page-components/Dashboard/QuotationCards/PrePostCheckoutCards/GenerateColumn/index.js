/* eslint-disable react/no-array-index-key */
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDummyCircle } from '@cogoport/icons-react';

import Timeline from '../Timeline';

import styles from './styles.module.css';

const PREV_INDEX = 1;

function GenerateColumn({
	data = {},
	loading = false,
	toggleAccordion,
	setAccordionState,
	category,
	accordionState,
	getPrePostShipmentQuotes,
}) {
	return Object.keys(data).map((key, index) => (
		<div key={key}>
			{/* <div className={styles.status_accordian}>
	                <Pill color="#B4F3BE">Approved</Pill>
	            </div> */}

			<div style={{ display: 'flex', width: '100%' }}>
				<div className={styles.vertical_timeline}>
					{ (index !== (Object.keys(data).length - PREV_INDEX)) ? (
						<>
							<IcMDummyCircle
								fill="#EE3425"
								height="20"
								width="20"
							/>
							<div className={styles.vertical_rule} />
						</>
					) : (
						<IcMDummyCircle
							fill="#EE3425"
							height="20"
							width="20"
							style={{ marginBottom: '24px' }}
						/>
					) }
				</div>
				<Timeline
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
