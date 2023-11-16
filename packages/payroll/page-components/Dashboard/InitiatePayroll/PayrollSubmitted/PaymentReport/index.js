import { ResponsivePie } from '@cogoport/charts/pie';
import { IcMDummyCircle } from '@cogoport/icons-react';
import React from 'react';

import { colors, data_map_payroll_card } from '../../../../../utils/constants';

import styles from './styles.module.css';

const PAYROLLIMAGE = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/payroll_image.svg';

const HUNDRED = 100;
function PaymentReport({ payroll_data = {} }) {
	const DATA_TO_SHOW = [];
	const total = payroll_data.total_payout + payroll_data.total_deductions + payroll_data.total_tds_deducted;
	data_map_payroll_card.forEach((item, index) => {
		DATA_TO_SHOW.push({
			id    : index,
			label : item.label,
			value : Math.round((payroll_data[item.name] * HUNDRED) / total),
		});
	});
	return (
		<div className={styles.container}>
			<div className={styles.head_section}>
				<span className={styles.section_heading}>What your company pays for</span>

			</div>
			<div className={styles.second_section}>
				<div className={styles.graph_section}>
					<div className={styles.graph}>
						<ResponsivePie
							data={DATA_TO_SHOW}
							innerRadius={0.7}
							padAngle={0.7}
							margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
							cornerRadius={3}
							enableArcLabels={false}
							enableArcLinkLabels={false}
							colors={colors}
						/>
					</div>
					<div className={styles.graph_details}>
						{DATA_TO_SHOW.map((item, index) => (

							<>
								<div className={styles.details}>
									<IcMDummyCircle width={12} height={12} fill={colors[index]} />
									<span className={styles.label}>{item.label}</span>
									<span className={styles.value}>
										{item.value}
										%
									</span>
								</div>
								<div className={styles.divider} />
							</>
						))}
					</div>

				</div>
				<div className={styles.container_2}>
					<img
						src={PAYROLLIMAGE}
						alt="payroll-design"
					/>
				</div>

			</div>

		</div>

	);
}

export default PaymentReport;
