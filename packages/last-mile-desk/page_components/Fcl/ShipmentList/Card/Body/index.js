import { IcMFfcl } from '@cogoport/icons-react';
import { useContext } from 'react';

import LastMileDeskContext from '../../../../../context/LastMileDeskContext';

import CargoPills from './CargoPills';
import PortDetails from './PortDetails';
import RequiredDocs from './RequiredDocs';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';

const REQUIRED_DOC_TABS = ['vessel_arrived', 'container_gated_out'];

function Body({ item = {} }) {
	const { activeTab } = useContext(LastMileDeskContext);

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.info}>
					<ShipmentInfo item={item} />
				</div>

				<div className={styles.divider} />

				<div className={styles.fcl_icon}>
					<div className={styles.icon_container}>
						<IcMFfcl
							fill="#ee3425"
							height={28}
							width={28}
						/>

					</div>

					<div className={styles.icon_text}>FCL</div>
				</div>

				<div className={styles.port_detail}>
					<PortDetails item={item} />
				</div>

				<div className={styles.divider} />

				<div className={styles.pills}>
					<CargoPills item={item} />
				</div>
			</div>

			{REQUIRED_DOC_TABS.includes(activeTab)
				? <RequiredDocs item={item} />
				: null}

		</div>
	);
}
export default Body;
