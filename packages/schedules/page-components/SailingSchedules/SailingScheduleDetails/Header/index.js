import { Placeholder } from '@cogoport/components';
import { format } from '@cogoport/utils';

import PortPair from '../../../common/PortPair';
import cutoff from '../../utils/cutoff.json';

import styles from './styles.module.css';

const ONE = 1;
function Header({ sailingSchedule, loading }) {
	return 		(
		<div className={styles.container}>
			<div className={styles.upper}>
				<div className={styles.upper_left}>
					{loading ? <Placeholder width="120px" height="30px" /> : (
						<div className={styles.shipping_line}>
							<div>
								<img alt="shipping_line_logo" src={sailingSchedule?.shipping_line?.logo_url} />
							</div>
							<div>
								{sailingSchedule?.shipping_line?.short_name}

								Shipping
							</div>
						</div>
					)}

				</div>
				<div className={styles.upper_right}>
					<div>
						{loading ? <Placeholder width="100px" /> : (
							<div className={styles.updated_status}>
								{`${sailingSchedule?.transit_time} 
								${sailingSchedule?.transit_time > ONE ? 'days' : 'day'}`}
							</div>
						)}
					</div>
					{loading ? <Placeholder width="60px" /> : (
						<div className={styles.updated_status}>
							{sailingSchedule?.schedule_type || 'unspecified'}
						</div>
					)}
				</div>
			</div>
			<div className={styles.middle}>
				<PortPair data={sailingSchedule} loading={loading} />
			</div>
			<div className={styles.bottom}>
				<div className={styles.lower_left}>
					<div>Cutoff Details</div>
					{(Object.keys(cutoff)).map((key) => (
						<div key={key}>
							{loading ? <Placeholder width="100px" /> : (
								<div>
									<div className={styles.feature_name}>{cutoff[key]}</div>
									<div className={styles.feature_value}>
										{ sailingSchedule?.[key]
											? format(sailingSchedule[key], 'dd MMM yyyy hh:mm') : '-'}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Header;
