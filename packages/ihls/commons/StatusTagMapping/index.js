import { Pill } from '@cogoport/components';
import {
	IcMBldo,
	IcMUpload,
	IcMShip,
	IcMActivePlans,
	IcMTick,
	IcMInvoiceApprovals,
	IcMCrossInCircle,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const StatusTagMapping = {
	success: (
		<div className={styles.status_pill}>
			<IcMTick height="14px" width="14px" />
			<Pill className={styles.completed}>Completed</Pill>
		</div>
	),
	lead_created: (
		<div className={styles.status_pill}>
			<IcMActivePlans height="14px" width="14px" />
			<Pill className="lead">Lead Created</Pill>
		</div>
	),
	uploaded: (
		<div className={styles.status_pill}>
			<IcMUpload height="14px" width="14px" />
			<Pill className={styles.uploaded}>Uploaded</Pill>
		</div>
	),
	shipment_record_created: (
		<div className={styles.status_pill}>
			<IcMShip height="14px" width="14px" />
			<Pill className={styles.shipment}>Shipment Record Created</Pill>
		</div>
	),
	raw_record_created: (
		<div className={styles.status_pill}>
			<IcMBldo height="14px" width="14px" />
			<Pill className={styles.raw}>Raw Record Created</Pill>
		</div>
	),
	wrong_doing: (
		<div className={styles.status_pill}>
			<IcMCrossInCircle height="14px" width="14px" />
			<Pill className={styles.failure}>Failure</Pill>
		</div>
	),
	wrong_upload: (
		<div className={styles.status_pill}>
			<IcMCrossInCircle />
			<Pill className={styles.failure}>Failure</Pill>
		</div>
	),
	processing: (
		<div className={styles.status_pill}>
			<IcMInvoiceApprovals />
			<Pill className={styles.processing}>Processing</Pill>
		</div>
	),
};

export default StatusTagMapping;
