import { Checkbox, Button } from '@cogoport/components';

import PortsCard from './PortsCard';
import styles from './styles.module.css';

function PreviewAndApproveLists() {
	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<Checkbox
					label="Select All"
					value="a2"
					// disabled={false}
					// loading
				/>
				<Button size="md" themeType="primary">Preview and Approve</Button>
			</div>
			<div className={styles.approve_remaining_complete_shipment_section}>
				<div className={styles.shipment_lists_section}>
					<div className={styles.lists_heading_section}>
						<span className={styles.lists_heading_section}>Request for Approval</span>
						<div className={`
						${styles.lists_heading_section} 
						${styles.port_pairs_nos}`}
						>
							(4 Port Pairs)
						</div>
					</div>
					<div className={styles.ports_section}>
						<PortsCard />
					</div>
				</div>
				{/* <div className={styles.shipment_lists_section}>
					<div className={styles.lists_heading_section}>
						<span className={styles.lists_heading_part}>Remaining</span>
						<div className={`
						${styles.lists_heading_section}
						${styles.port_pairs_nos}`}
						>
							(4 Port Pairs)
						</div>
					</div>
					<div className={styles.ports_section}>
						<PortsCard />
					</div>
				</div> */}
			</div>
		</div>
	);
}
export default PreviewAndApproveLists;
