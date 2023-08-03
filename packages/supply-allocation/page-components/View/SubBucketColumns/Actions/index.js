import { Button, Tooltip } from '@cogoport/components';
import { IcMOverflowDot, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import MoveSupplierModal from './MoveSupplierModal';
import styles from './styles.module.css';

function Actions({ item = {} }) {
	const [showMoveSupplierModal, setShowMoveSupplierModal] = useState(false);

	return (
		<div>
			<div className={styles.container}>
				<Tooltip
					className={styles.tooltip_pad}
					placement="right"
					interactive
					content={(
						<div className={styles.options}>
							<Button
								themeType="primary"
								className={styles.btn}
								onClick={() => setShowMoveSupplierModal((prev) => !prev)}
							>
								<IcMEdit />
								<div>Move Supplier</div>
							</Button>

							<Button
								themeType="secondary"
								className={styles.btn}
								type="button"
							>

								<div>Edit Allocation</div>
							</Button>

						</div>
					)}
				>
					<IcMOverflowDot style={{ cursor: 'pointer' }} />
				</Tooltip>
			</div>

			{showMoveSupplierModal ? (
				<MoveSupplierModal
					showMoveSupplierModal={showMoveSupplierModal}
					setShowMoveSupplierModal={setShowMoveSupplierModal}
					item={item}
				/>
			) : null}

		</div>
	);
}
export default Actions;
