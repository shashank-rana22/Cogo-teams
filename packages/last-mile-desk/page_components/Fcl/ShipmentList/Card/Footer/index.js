import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

function Footer({ item = {} }) {
	const { kam = {}, so1 = {}, cargo_readiness_date = '', estimated_departure = '' } = item || {};

	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<div>
					Cargo Readiness date:
					{' '}
					<b>
						{formatDate({
							date       : cargo_readiness_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</b>
					{' '}
				</div>

				<div>
					Exp. Vessel departure:
					{' '}
					<b>
						{formatDate({
							date       : estimated_departure,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</b>
				</div>

				<div>
					KAM:
					{' '}
					<b>{kam?.name}</b>
				</div>

				<div>
					SO1:
					{' '}
					<b>{so1?.name}</b>
				</div>
			</div>
		</div>
	);
}

export default Footer;
