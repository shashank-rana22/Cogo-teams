import { Tooltip, Modal } from '@cogoport/components';
import { getByKey, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CostView from '../../commons/costView';

import styles from './styles.module.css';

function ShipmentView({ row }) {
	const [show, setShow] = useState(false);
	return (
		<div className={styles.field_pair}>

			{(getByKey(row, 'sidNo') as string).length > 10 ? (
				<Tooltip
					interactive
					placement="top"
					content={<div className={styles.tool_tip}>{getByKey(row, 'sidNo') as string}</div>}
				>
					<text className={styles.sid}>
						{`${(getByKey(row, 'sidNo') as string)?.substring(
							0,
							10,
						)}...`}
					</text>
				</Tooltip>
			)
				: (
					<div>
						<div role="presentation" className={styles.sid} onClick={() => setShow(true)}>
							{getByKey(row, 'sidNo') as string}
						</div>
						{show && (
							<Modal
								size="fullscreen"
								show={show}
								onClose={() => setShow(false)}
								className={styles.modal_container}
							>
								<Modal.Header title="COST SHEET" />
								<Modal.Body>
									<CostView shipment_id={getByKey(row, 'shipmentId') as string} />
								</Modal.Body>
							</Modal>
						)}
					</div>
				)}

			{startCase(getByKey(row, 'serviceType') as string).length > 10 ? (
				<Tooltip
					interactive
					placement="top"
					content={(
						<div className={styles.tool_tip}>
							{startCase(getByKey(row, 'serviceType') as string)}
						</div>
					)}
				>
					<text className={styles.cursor}>
						{`${startCase(getByKey(row, 'serviceType') as string)?.substring(
							0,
							10,
						)}...`}
					</text>
				</Tooltip>
			)
				: (
					<div className={styles.cursor}>
						{startCase(getByKey(row, 'serviceType') as string)}
					</div>
				)}
		</div>
	);
}

export default ShipmentView;
