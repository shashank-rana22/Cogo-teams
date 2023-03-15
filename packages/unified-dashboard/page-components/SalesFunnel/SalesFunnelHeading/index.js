import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import Filter from '../../../common/Filter';
import { startDateOfMonth } from '../../../utils/startDateOfMonth';

import styles from './styles.module.css';

function SalesFunnelHeading({
	setFilters = {},
	range,
	setRange,
}) {
	// eslint-disable-next-line no-unused-vars
	const [date, setDate] = useState({});

	const handleApplyFilters = () => {
		const dates = startDateOfMonth(date);
		setFilters((prevFilters) => ({
			...prevFilters,
			...dates,
		}));
	};

	return (
		<div className={styles.header}>
			<div className={styles.heading_container}>
				<div className={styles.heading_text}>
					Sales View As On Date&nbsp;
					<div className={styles.tooltip}>
						<Tooltip
							content={
								<>All the values are calculated on the basis of action date</>
						}
						>
							<IcMInfo
								style={{
									width  : '20px',
									height : '14px',
								}}
							/>

						</Tooltip>

					</div>

				</div>
			</div>
			<div>
				<Filter
					setFilters={handleApplyFilters}
					range={range}
					setRange={setRange}
				/>
			</div>

		</div>

	);
}
export default SalesFunnelHeading;
