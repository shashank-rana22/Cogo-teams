import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import inventoryFields from '../../../../configurations/inventory-fields';
import CONSTANTS from '../../../../constants/constants';
import UpdateStatusModal from '../UpdateStatusModal';

import CargoListItem from './CargoListItem/index';
import styles from './styles.module.css';

function CargoList({
	data = {},
	listAPI = () => {},
}) {
	const [showUpdateStatusModal, setShowUpdateStatusModal] = useState({});
	const { showMoreFields } = inventoryFields;

	const handleInventoryUpdate = ({ singleItem }) => (
		!isEmpty(showUpdateStatusModal)
		&& singleItem?.cargoNumber === showUpdateStatusModal?.cargoNumber && (
			<UpdateStatusModal
				item={singleItem}
				showUpdateStatusModal={showUpdateStatusModal}
				setShowUpdateStatusModal={setShowUpdateStatusModal}
				listAPI={listAPI}
			/>
		)
	);

	const functions = {
		handleUpdateStatus: (singleItem) => (
			<>
				<Button
					themeType="primary"
					style={{ fontSize: 12 }}
					onClick={() => setShowUpdateStatusModal(singleItem)}
				>
					Update Status
				</Button>
				{handleInventoryUpdate({ singleItem })}
			</>
		),
	};
	return (
		<div className={styles.cargo_list_container}>
			<div className={styles.cargo_list}>
				<header className={styles.header}>
					{showMoreFields.map((field) => {
						const { span = 1, label = '' } = field || {};
						return (
							<div
								className={styles.col}
								style={{ '--span': span || CONSTANTS.DEFAULT_SPAN }}
								key={field.key}
							>
								{ label }
							</div>
						);
					})}
				</header>
				{!isEmpty(data) && data.map((item) => (
					<CargoListItem
						key={item?.cargoNumber}
						item={item}
						fields={showMoreFields}
						functions={functions}
					/>
				))}
			</div>
		</div>
	);
}

export default CargoList;
