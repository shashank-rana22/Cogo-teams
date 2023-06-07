import { IcMAirport, IcMProfile, IcMShip } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SingleSelectedCard({ data, index }) {
	return (
		<div className={styles.container}>
			<div className={styles.left_section_container}>
				{index + 1}
				.
			</div>
			<div className={styles.right_section_container}>
				<div className={styles.upper_section}>
					<div className={styles.upper_left_section}>
						<div className={styles.service_provider_heading}>
							{data?.service_provider?.business_name}
						</div>
						<div>
							{data?.airline ? (
								<div style={{ display: 'flex', alignItems: 'center' }}>
									{(data?.airline?.logo_url !== null)
										? (
											<img
												src={data?.airline?.logo_url}
												alt="logo"
												height="30px"
												width="50px"
											/>
										) : <IcMAirport height="30px" width="50px" />}

									<div style={{ fontSize: '14px', fontWeight: '500', color: '#4F4F4F' }}>
										{data?.airline?.business_name}
									</div>
								</div>
							) : null}
							{data?.shipping_line
								? (
									<div style={{ display: 'flex', alignItems: 'center' }}>
										{data?.shipping_line?.logo_url !== null
											? (
												<img
													src={data?.shipping_line?.logo_url}
													alt="logo"
													height="30px"
													width="50px"
												/>
											) : <IcMShip height="30px" width="50px" />}
										<div style={{ fontSize: '14px', fontWeight: '500' }}>
											{data?.shipping_line?.business_name}
										</div>
									</div>
								) : null}
						</div>
					</div>
					<div className={styles.upper_right_section}>
						<div className={styles.tag}>
							KAM Selected Rate
						</div>
						<div className={styles.agent_container}>
							<IcMProfile />
							<div className={styles.supply_agent_text}>
								Supply Agent : Himali Saini
							</div>
						</div>
					</div>
				</div>
				<div className={styles.lower_section}>
					<div className={styles.lower_left_section}>
						KAM Discount Applied :
						<div className={styles.price}>
							USD 10
						</div>
					</div>
					<div className={styles.lower_right_section}>
						<div className={styles.label}>
							Profitability :
							<span style={{ fontSize: '18px', fontWeight: '500', color: '#849E4C' }}>1.1%</span>
						</div>
						<div className={styles.label}>
							Total Buy Price :
							<span style={{ fontSize: '20px', fontWeight: '700', color: '#221F20' }}>
								USD 370
							</span>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}

export default SingleSelectedCard;
