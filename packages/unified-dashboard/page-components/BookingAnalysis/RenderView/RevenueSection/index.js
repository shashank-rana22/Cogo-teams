import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Card from '../../../../common/Card';
import RevenueCardHeading from '../../../../common/RevenueCardHeading';
import DeclaredRevenue from '../../DeclaredRevenue';

import styles from './styles.module.css';

function RevenueSection({ data = {}, currency, selectedFilterTab, showRevenue, setShowRevenue }) {
	const {
		declared_revenue = [],
		total_booking = [],
		cancelled_booking = [],
		months_considered = [],
		delta_revenue = [],
	} = data || {};

	const revenueData = [
		{
			name            : 'Total Bookings',
			data            : total_booking,
			borderLeftColor : '#67C676',
			toolTipContent  : 'Bookings done till date with ETD in the month',
		},
		{
			name            : 'Cancelled Booking',
			data            : cancelled_booking,
			borderLeftColor : '#9BEFA8',
			toolTipContent  : 'Cancellations done till date with ETD in the month',
		},
		{
			name            : 'Prior Period Impact (delta)',
			data            : delta_revenue,
			borderLeftColor : '#CDF7D4',
			toolTipContent  : `Sum of SI in the month - Sum of PI/SO/Quotation for 
				 corresponding shipment | Applicable where ETD is not in the month`,
		},
	];

	return (
		<div>
			<RevenueCardHeading
				title="Declared Revenue"
				toolTipContent="(Calculated as Invoiced + Accrued revenue + Prior period impact)"
			/>
			<div className={styles.card_wrapper}>
				<DeclaredRevenue
					currency={currency}
					months={months_considered}
					data={declared_revenue}
					selectedFilterTab={selectedFilterTab}
				/>
				{showRevenue && (
					<div className={styles.card_container}>
						{revenueData.map((val) => (
							<Card
								key={uuidv4()}
								currency={currency}
								title={val?.name}
								data={val?.data}
								months={months_considered}
								borderLeftColor={val?.borderLeftColor}
								toolTipContent={val.toolTipContent}
								selectedFilterTab={selectedFilterTab}
							/>
						))}
					</div>
				)}

				<div
					onClick={() => setShowRevenue(!showRevenue)}
					role="button"
					tabIndex={0}
					className={styles.arrow_container}
				>
					<IcMArrowRotateDown
						className={showRevenue ? `${styles.collapse_icon_active}`
							: `${styles.collapse_icon_inactive}`}

					/>
				</div>
			</div>
		</div>
	);
}

export default RevenueSection;
