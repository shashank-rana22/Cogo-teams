import { Button, Popover } from '@cogoport/components';
import { IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import MoveSupplierModal from './MoveSupplierModal';
import styles from './styles.module.css';

function Actions({
	item = {},
	bucket_type = '',
	rollingFclFreightSearchId = '',
	refetchBucketsData = () => { },
	refetchServiceProvidersData = () => {},
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
					onClickOutside={() => setShowPopOver(false)}
					content={(
						<div className={styles.options}>
							<Button
								themeType="secondary"
								className={styles.btn}
								onClick={() => { setShowMoveSupplierModal((prev) => !prev); setShowPopOver(false); }}
							>
								<IcMEdit />
								<div style={{ marginLeft: '4px' }}>Move Supplier</div>
							</Button>
						</div>
					)}
				>
					<div role="presentation" onClick={() => setShowPopOver((prev) => !prev)}>
						<IcMOverflowDot style={{ cursor: 'pointer' }} />
					</div>
				</Popover>
			</div>

			{showMoveSupplierModal ? (
				<MoveSupplierModal
					showMoveSupplierModal={showMoveSupplierModal}
					setShowMoveSupplierModal={setShowMoveSupplierModal}
					item={item}
					bucket_type={bucket_type}
					current_allocated_containers={item?.allocated_containers}
					rollingFclFreightSearchId={rollingFclFreightSearchId}
					refetchBucketsData={refetchBucketsData}
					refetchServiceProvidersData={refetchServiceProvidersData}
				/>
			) : null}
		</div>
	);
}

export default Actions;
