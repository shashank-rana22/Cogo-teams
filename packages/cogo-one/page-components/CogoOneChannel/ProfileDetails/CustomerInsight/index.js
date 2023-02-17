import { Pill, Select } from '@cogoport/components';
import { IcMPort } from '@cogoport/icons-react';
import { useState } from 'react';

import SERVICE_TYPE_OPTIONS from '../../../../configurations/service-type-options';
import useGetOmnichannelCustomerInsights from '../../../../hooks/useGetOmnichannelCustomerInsights';

import BookingContent from './BookingContent';
import styles from './styles.module.css';

function CustomerInsight({ activeTab, activeVoiceCard, activeMessageCard }) {
	const [serviceType, serServiceType] = useState('fcl_freight');

	const {
		data = {},
		loading = false,
		fetchOmnichannelCustomerInsights = () => {},
	} = useGetOmnichannelCustomerInsights({ serviceType, activeTab, activeVoiceCard, activeMessageCard });

	console.log('data', data);
	const { shipment_and_spot_search_stats = {}, total_messages } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.title}>Customer Insight</div>

				<Select value={serviceType} onChange={serServiceType} options={SERVICE_TYPE_OPTIONS} />
			</div>

			{Object.keys(shipment_and_spot_search_stats).map((key) => {
				const { shipment_insights = {}, spot_search_insights = {} } = shipment_and_spot_search_stats[key];
				const { total_spot_searches } = spot_search_insights || {};
				console.log('spot_search_insights', spot_search_insights);
				console.log('shipment_insights', shipment_insights);

				return (
					<div className={styles.organisation_div}>
						<div className={styles.stats_div}>
							<div className={styles.top}>
								<div className={styles.content}>
									<div className={styles.text}>Total Bookings</div>
									<div className={styles.header}>23</div>
								</div>
								<div className={styles.content}>
									<div className={styles.text}>Total messages </div>
									<div className={styles.header}>
										{total_messages}

									</div>
								</div>
							</div>
							<div className={styles.top}>
								<div className={styles.content}>
									<div className={styles.text}>Total spot searches</div>
									<div className={styles.header}>{total_spot_searches}</div>
								</div>

							</div>
						</div>
						<div className={styles.booking_div}>
							<div className={styles.text}>
								Last Booking: SID 13432
							</div>
							<BookingContent />
							<div className={styles.text}>
								Last Booking: SID 13432
							</div>
							<BookingContent />
						</div>
						<div className={styles.comm_tex}>Commodity</div>
						<div>
							<Pill
								key="Live animals"
								size="sm"
								color="#FBD1A6"
							>
								Live animals
							</Pill>
						</div>
						<div className={styles.comm_tex}>Port pairs most booked on</div>
						<div className={styles.port_div}>
							<div className={styles.div_top}>
								<div className={styles.origin}>
									India,
									<span>(INNSA)</span>
									,
									<div className={styles.name}>Jawaharlal Nehru</div>
								</div>
								<IcMPort width={15} height={15} fill="#ACDADF" />
								<div className={styles.origin}>
									China,
									<span>(CNSHA)</span>
									,
									<div className={styles.name}>Shanghai</div>
								</div>
							</div>
							<div className={styles.div_footer}>
								<div className={styles.origin}>
									India,
									<span>(INNSA)</span>
									,
									<div className={styles.name}>Jawaharlal Nehru</div>
								</div>
								<IcMPort width={15} height={15} fill="#ACDADF" />
								<div className={styles.origin}>
									China,
									<span>(CNSHA)</span>
									,
									<div className={styles.name}>Shanghai</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}

			{/* <div className={styles.comm_tex}>Commodity</div>
			<div>
				<Pill
					key="Live animals"
					size="sm"
					color="#FBD1A6"
				>
					Live animals
				</Pill>
			</div>
			<div className={styles.comm_tex}>Port pairs most booked on</div>
			<div className={styles.port_div}>
				<div className={styles.div_top}>
					<div className={styles.origin}>
						India,
						<span>(INNSA)</span>
						,
						<div className={styles.name}>Jawaharlal Nehru</div>
					</div>
					<IcMPort width={15} height={15} fill="#ACDADF" />
					<div className={styles.origin}>
						China,
						<span>(CNSHA)</span>
						,
						<div className={styles.name}>Shanghai</div>
					</div>
				</div>
				<div className={styles.div_footer}>
					<div className={styles.origin}>
						India,
						<span>(INNSA)</span>
						,
						<div className={styles.name}>Jawaharlal Nehru</div>
					</div>
					<IcMPort width={15} height={15} fill="#ACDADF" />
					<div className={styles.origin}>
						China,
						<span>(CNSHA)</span>
						,
						<div className={styles.name}>Shanghai</div>
					</div>
				</div>
			</div> */}
		</div>
	);
}
export default CustomerInsight;
