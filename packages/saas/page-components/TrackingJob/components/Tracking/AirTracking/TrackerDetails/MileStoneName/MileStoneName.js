import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const INVALID_VESSEL_NAME = ['N/A'];
function MilestoneName({ item = {} }) {
	const { milestone = '', vessel_name = '', piece = '', flight_number = '' } = item;
	return 	(
		<>
			{milestone}
			<p>
				Piece
				{' '}
				{piece}
			</p>
			<p>
				Flight Number
				{' '}
				{flight_number}
			</p>

			{vessel_name && !INVALID_VESSEL_NAME.includes(vessel_name) ? (
				<Tooltip
					content={vessel_name}
					placement="right"
				>
					<IcMInfo className={styles.info_icon} />
				</Tooltip>
			) : null}
		</>
	);
}

export default MilestoneName;
