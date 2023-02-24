import { Placeholder } from '@cogoport/components';
import { IcMPort } from '@cogoport/icons-react';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<>
			{[...Array(1)].map(() => (
				<div className={styles.organisation_div}>
					<Placeholder height="15px" width="200px" />

					<div className={styles.stats_div}>

						<div className={styles.top}>
							<div className={styles.content}>
								<div className={styles.text}>Total Bookings</div>

								<Placeholder height="15px" width="100px" />

							</div>
							<div className={styles.content}>
								<div className={styles.text}>Total Communication </div>

								<Placeholder height="15px" width="100px" />

							</div>
						</div>

					</div>
					<div className={styles.booking_div}>
						<div className={styles.last_booking}>
							Last Booking :
							<div className={styles.sid_number}>
								{' '}
								SID
								{' '}
								<Placeholder height="15px" width="100px" margin="0px 0px 0px 5px" />
							</div>

						</div>

					</div>
					<div className={styles.comm_tex}>Commodity</div>
					<div>
						<Placeholder height="15px" width="80px" />
					</div>
					<div className={styles.comm_tex}>Port pairs most booked on</div>
					<div className={styles.port_div}>
						{[...Array(2)].map(() => (

							<div className={styles.div_top}>

								<div className={styles.origin}>
									<Placeholder height="15px" width="200px" margin="5px 0px " />
								</div>

								<IcMPort width={15} height={15} fill="#ACDADF" />

								<div className={styles.origin}>
									<Placeholder height="15px" width="200px" margin="5px 0px " />
								</div>

							</div>

						))}

					</div>

				</div>
			))}
		</>
	);
}
export default LoadingState;
