import { Button, Popover } from '@cogoport/components';
import { IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import MoveSupplierModal from './MoveSupplierModal';
import styles from './styles.module.css';

function Actions({
	item = {},
	bucketOptions = [],
	bucket_type = '',
	rollingFclFreightSearchId = '',
}) {
	const [showMoveSupplierModal, setShowMoveSupplierModal] = useState(false);
	const [showPopOver, setShowPopOver] = useState(false);

	return (
		<div>
			<div className={styles.container}>
				<Popover
					className={styles.tooltip_pad}
					placement="right"
					interactive
					visible={showPopOver}
					content={(
						<div className={styles.options}>
							<Button
								themeType="primary"
								className={styles.btn}
								onClick={() => { setShowMoveSupplierModal((prev) => !prev); setShowPopOver(false); }}
							>
								<IcMEdit />
								<div>Move Supplier</div>
							</Button>
						</div>
					)}
				>
					<div role="presentation" onClick={() => setShowPopOver(true)}>
						<IcMOverflowDot style={{ cursor: 'pointer' }} />
					</div>
				</Popover>
			</div>

			{showMoveSupplierModal ? (
				<MoveSupplierModal
					showMoveSupplierModal={showMoveSupplierModal}
					setShowMoveSupplierModal={setShowMoveSupplierModal}
					item={item}
					bucketOptions={bucketOptions}
					bucket_type={bucket_type}
					current_allocated_containers={item?.allocated_containers}
					rollingFclFreightSearchId={rollingFclFreightSearchId}
				/>
			) : null}
		</div>
	);
}
export default Actions;
