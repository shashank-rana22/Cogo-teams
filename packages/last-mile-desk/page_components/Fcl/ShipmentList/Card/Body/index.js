import { IcMFfcl } from '@cogoport/icons-react';

import CargoPills from './CargoPills';
import PortDetails from './PortDetails';
import ReqDocs from './ReqDocs';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';

const DOC_REQ_TABS = ['vessel_arrived', 'container_gated_out'];

function Body({ item = {}, stateProps = {} }) {
	const { activeTab = '' } = stateProps || {};
	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.info}>
					<ShipmentInfo item={item} />
				</div>

				<div className={styles.divider} />

				<div className={styles.fcl_icon}>
					<div className={styles.icon_container}><IcMFfcl fill="#ee3425" height={28} width={28} /></div>
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

			{DOC_REQ_TABS.includes(activeTab) && <ReqDocs item={item} />}

		</div>
	);
}
export default Body;
