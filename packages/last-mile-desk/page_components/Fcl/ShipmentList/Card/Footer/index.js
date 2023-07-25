import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function Footer({ item = {} }) {
	const { kam = {}, so1 = {}, cargo_readiness_date = '', estimated_departure = '' } = item || {};
	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<div>
					Cargo Readiness date:
					{' '}
					<b>{format(cargo_readiness_date, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'], null, true)}</b>
					{' '}
				</div>

				<div>
					Exp. Vessel departure:
					{' '}
					<b>
						{format(estimated_departure, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'], null, true)}
					</b>
				</div>

				<div>
					KAM:
					{' '}
					<b>{kam.name}</b>
				</div>

				<div>
					SO1:
					{' '}
					<b>{so1.name}</b>
				</div>
			</div>
		</div>
	);
}

export default Footer;
