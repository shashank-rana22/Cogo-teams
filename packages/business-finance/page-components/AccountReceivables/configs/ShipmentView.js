import { Tooltip, Modal } from '@cogoport/components';
import { getByKey, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CostView from '../../commons/costView';

import styles from './styles.module.css';

const CHECK_MIN_VALUE = 0;
const CHECK_MAX_VALUE = 10;

function ShipmentView({ row }) {
	const [show, setShow] = useState(false);
	return (
		<div className={styles.field_pair}>

			{(getByKey(row, 'sidNo'))?.length > CHECK_MAX_VALUE ? (
				<Tooltip
					interactive
					placement="top"
					content={<div className={styles.tool_tip}>{getByKey(row, 'sidNo')}</div>}
				>
					<text className={styles.sid}>
						{`${(getByKey(row, 'sidNo'))?.substring(
							CHECK_MIN_VALUE,
							CHECK_MAX_VALUE,
						)}...`}
					</text>
				</Tooltip>
			)
				: (
					<div>
						<div role="presentation" className={styles.sid} onClick={() => setShow(true)}>
							{getByKey(row, 'sidNo')}
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
									<CostView shipment_id={getByKey(row, 'shipmentId')} />
								</Modal.Body>
							</Modal>
						)}
					</div>
				)}

			{startCase(getByKey(row, 'serviceType'))?.length > CHECK_MAX_VALUE ? (
				<Tooltip
					interactive
					placement="top"
					content={(
						<div className={styles.tool_tip}>
							{startCase(getByKey(row, 'serviceType'))}
						</div>
					)}
				>
					<text className={styles.cursor}>
						{`${startCase(getByKey(row, 'serviceType'))?.substring(
							CHECK_MIN_VALUE,
							CHECK_MAX_VALUE,
						)}...`}
					</text>
				</Tooltip>
			)
				: (
					<div className={styles.cursor}>
						{startCase(getByKey(row, 'serviceType'))}
					</div>
				)}
		</div>
	);
}

export default ShipmentView;
