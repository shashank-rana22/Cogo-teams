import { Placeholder, Tooltip } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const KEYS_TO_SHOW = {
	vessel_name   : 'Vessel',
	voyage_number : 'Voyage',
	service_lane  : 'Service Lane',
};

function SailingDetails({ data, loading }) {
	return (
		<div className={styles.sailing_details}>
			<div className={styles.heading}>
				Sailing Details
			</div>
			<hr style={{ width: '100%', textAlign: 'left', marginLeft: '0px', color: 'grey' }} />
			<div className={styles.port_details}>
				<div className={styles.port}>
					<div>
						{loading ? <Placeholder width="100px" /> : (
							<Tooltip
								theme="light"
								placement="top"
								interactive
								content={data?.origin_location?.name}
							>
								<div className={styles.port_name}>
									{data?.origin_location?.name}
								</div>
							</Tooltip>
						)}
						{loading ? <Placeholder width="60px" /> : (
							<div className={styles.date}>
								{format(data?.departure, 'dd MMM yyyy hh:mm')}
							</div>
						)}
					</div>
					<div className={styles.details_card}>
						{
                                (Object.keys(KEYS_TO_SHOW)).map((key) => (
	<div key={key}>
		{loading ? <Placeholder width="100px" /> : (
			<div>
				<div className={styles.label}>
					{KEYS_TO_SHOW?.[key]}
				</div>
				<div className={styles.value}>
					{data?.[key] ? data[key] : '-'}
				</div>
			</div>
		)}
	</div>
                                ))
                            }
					</div>
				</div>
				<div className={styles.middle}>
					{loading ? <Placeholder width="60px" /> : (
						<div className={styles.transit_time}>
							{`${data?.transit_time} ${data?.transit_time > 1 ? 'days' : 'day'}`}

						</div>
					)}
					<hr width="200px" className={styles.hr_line} />
				</div>
				<div className={styles.port}>
					<div>
						{loading ? <Placeholder width="100px" /> : (
							<Tooltip
								theme="light"
								placement="top"
								interactive
								content={data?.destination_location?.name}
							>
								<div className={styles.port_name}>
									{data?.destination_location?.name}
								</div>
							</Tooltip>
						) }
						{loading ? <Placeholder width="60px" /> : (
							<div className={styles.date}>
								{format(data?.arival, 'dd MMM yyyy hh:mm')}
							</div>

						)}
					</div>
					<div className={styles.details_card}>
						{
                                (Object.keys(KEYS_TO_SHOW)).map((key) => (
	<div key={key}>
		{loading ? <Placeholder width="60px" /> : (
			<div>
				<div className={styles.label}>
					{KEYS_TO_SHOW?.[key]}
				</div>
				<div className={styles.value}>
					{data?.[key] ? data[key] : '-'}
				</div>
			</div>
		)}
	</div>
                                ))
                            }
					</div>
				</div>
			</div>
		</div>
	);
}

export default SailingDetails;
