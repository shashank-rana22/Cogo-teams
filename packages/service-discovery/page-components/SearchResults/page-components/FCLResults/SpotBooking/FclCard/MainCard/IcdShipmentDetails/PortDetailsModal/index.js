import { Button, Modal, cl } from '@cogoport/components';
import { useMemo } from 'react';

import getControls from '../../../../../../../../../common/RouteForm/getControls';
import getElementController from '../../../../../../../../../configs/getElementController';

import styles from './styles.module.css';

function PortDetailsModal({
	showModal = false,
	setShowModal = () => {},
	controls = [],
	control = () => {},
	errors = {},
}) {
	const onClose = () => setShowModal(false);

	const finalControls = getControls(controls, 'fcl_freight');

	const updatedControls = useMemo(() => finalControls.reduce((acc, cur) => [...acc, {
		...cur,
		params: {
			...cur.params,
			fields  : cur.params.fields.filter((item) => item !== 'is_icd'),
			filters : { ...cur.params.filters, is_icd: false },
		},
	}], []), [finalControls]);

	return (
		<Modal show={showModal} onClose={onClose} placement="top" size="sm">
			<Modal.Header title="Select Main port for the shipment" />

			<Modal.Body style={{ overflowX: 'unset' }}>
				<div className={styles.container}>
					{updatedControls.map((currControls) => {
						const ActiveElement = getElementController(currControls.type);

						if (!currControls.show) {
							return null;
						}

						return (
							<div
								key={currControls.name}
								className={cl`${styles.element_div} ${styles[currControls.name]}`}
							>
								<div className={styles.label}>{currControls.label}</div>
								<ActiveElement {...currControls} control={control} />
								{errors?.[currControls.name] && (
									<div className={styles.error_message}>
										{' '}
										{errors?.[currControls.name]?.message}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					type="button"
					onClick={onClose}
				>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PortDetailsModal;
