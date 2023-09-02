import { Placeholder } from '@cogoport/components';
import { IcMUp, IcMDown } from '@cogoport/icons-react';

import Graph from './Graph';
import styles from './styles.module.css';

function Stats({ data, loading = false }) {
	return (
		<div className={styles.parent}>
			<div>
				<div className={styles.left}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>
							<div className={styles.heading}>Rate Coverage</div>
							<div className={styles.sub_text}>
								Marketplace Rates as per today
							</div>
						</div>
						<div>
							{!loading ? (
								<div className={styles.percentage_heading}>
									30 %
									{'  '}
									<IcMDown />
								</div>
							) : <Placeholder />}
							<div className={styles.sub_text}>
								From Last Month
							</div>

						</div>
					</div>
					<div className={styles.blue_color_stat_number}>
						{!loading ? (

							data?.marketplace_rates_count || '150400'

						) : <Placeholder height="50px" />}
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Background_gradient.png"
							width={255}
							height={60}
							alt="Empty-state"
							className={styles.image}
						/>
					</div>

				</div>
				<div className={styles.left}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>
							<div className={styles.heading}>Rate Density</div>
							<div className={styles.sub_text}>
								For Critical Port Pair
							</div>
						</div>
						<div>

							{!loading ? (
								<div className={styles.percentage_success_heading}>
									18 %
									{'  '}
									<IcMUp />
								</div>
							) : <Placeholder />}

							<div className={styles.sub_text}>
								From Last Month
							</div>

						</div>
					</div>
					<div>
						<div className={styles.blue_color_stat_number}>
							{!loading ? (

								data?.marketplace_rates_count || '25.7 %'

							) : <Placeholder height="50px" />}
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Background_gradient.png"
								width={255}
								height={60}
								alt="Empty-state"
								className={styles.image}
							/>
						</div>
					</div>

				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.critical_rates}>
					<div className={styles.critical_rates_text}>Critical Rates</div>
					<div className={styles.legend_group}>
						<div className={styles.legend}>
							<div
								className={styles.pill_dark}
							/>
							Expected Rates
						</div>
						<div className={styles.legend}>
							<div className={styles.pill_light} />
							Actual Rates
						</div>
					</div>
				</div>
				<Graph data={data?.frequency_list || []} />
			</div>
		</div>

	);
}

export default Stats;
