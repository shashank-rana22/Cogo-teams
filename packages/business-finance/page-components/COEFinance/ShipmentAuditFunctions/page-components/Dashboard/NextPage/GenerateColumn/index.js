import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDummyCircle } from '@cogoport/icons-react';

import Timeline from '../Timeline';

import styles from './styles.module.css';

const FIFTH_INDEX = 5;

function GenerateColumn({
	columnIndex = '',
	accordionStates = [],
	data = [],
	loading = false,
	toggleAccordion = () => {},
}) {
	const modifiedAccordianStates = accordionStates[columnIndex].slice(GLOBAL_CONSTANTS.zeroth_index, data?.length);
	return modifiedAccordianStates.map((isOpen, index) => (
		<div key={`${columnIndex},${index}`}>
			{/* <div className={styles.status_accordian}>
                    <Pill color="#B4F3BE">Approved</Pill>
                </div> */}
			<div key={`${columnIndex},${index}`} style={{ display: 'flex', width: '100%' }}>
				<div className={styles.vertical_timeline}>

					{ index !== FIFTH_INDEX ? (
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
					isOpen={isOpen}
					toggleAccordion={toggleAccordion}
					columnIndex={columnIndex}
					index={index}
					loading={loading}
					income={data?.[index]?.grand_total}
					profitability={data?.[index]?.profitability}
				/>
			</div>
		</div>
	));
}

export default GenerateColumn;
