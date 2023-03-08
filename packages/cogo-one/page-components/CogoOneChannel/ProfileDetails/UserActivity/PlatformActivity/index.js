import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import { PLATFORM_ACTIVITY_KEYS_MAPPING } from '../../../../../constants/PLATFORM_ACTIVITY_KEYS_MAPPING';

import LoginComponent from './LoginComponent';
import OrganizationVerification from './OrganizationVerification';
import styles from './styles.module.css';

function PlatformActivity({ platform = {} }) {
	const { login = {}, spot_searches = {}, organization = {} } = platform || {};
	const { list = [] } = spot_searches || {};

	const organizationCheck = !isEmpty(organization) && organization?.kyc_status === 'verified';
	return (
		<div className={styles.container}>
			{!isEmpty(login?.last_email_token_sent_at) && (
				<LoginComponent login={login} />
			)}

			{organizationCheck && (
				<OrganizationVerification organization={organization} />
			)}

			{(list || []).map((item) => {
				const services = item?.service_type;

				const {
					origin = 'origin_location',
					destination = 'destination_location',
				} = PLATFORM_ACTIVITY_KEYS_MAPPING[services] || {};

				const origin_port = item[origin] || {};

				const destination_port = item[destination] || {};

				const { created_at, serial_id } = item || {};

				const countryName = (val) => val?.split(',').slice(-1)[0];

				return (
					<>
						<div className={styles.activity_date}>
							<div className={styles.dot} />
							<div className={styles.durations}>
								{format(created_at, 'HH:mm a dd MMM')}
							</div>
						</div>
						<div className={styles.main_card}>
							<div className={styles.card}>
								<div className={styles.booking_details}>
									<div className={styles.title}>
										Spot Searches
									</div>
									<div className={styles.booking_id}>
										ID:
										<span>{serial_id}</span>
									</div>
								</div>
								<div className={styles.port_pair}>
									<div className={styles.port}>
										<div className={styles.port_details}>

											<Tooltip content={startCase(origin_port?.name)} placement="bottom">
												<div className={styles.port_name}>
													{startCase(origin_port?.name)}
												</div>
											</Tooltip>

											<div className={styles.port_codes}>
												{!isEmpty(origin_port?.port_code) && (
													<>
														(
														{origin_port?.port_code}
														)
													</>
												)}

											</div>
										</div>
										<div className={styles.country}>
											{startCase(countryName(origin_port?.display_name))}
										</div>
									</div>
									<IcMPortArrow width={22} height={22} />
									<div className={styles.port}>
										<div className={styles.port_details}>
											<Tooltip content={startCase(destination_port?.name)} placement="bottom">
												<div className={styles.port_name}>
													{startCase(destination_port?.name)}
												</div>
											</Tooltip>
											<div className={styles.port_codes}>
												{!isEmpty(destination_port?.port_code) && (
													<>
														(
														{destination_port?.port_code}
														)
													</>
												)}
											</div>
										</div>
										<div className={styles.country}>
											{startCase(countryName(origin_port?.display_name))}
										</div>
									</div>
								</div>

							</div>

						</div>

					</>
				);
			})}

		</div>
	);
}

export default PlatformActivity;
