import { Input, Modal, Button, cl } from '@cogoport/components';
import React, { useState, useEffect, useMemo } from 'react';

import Loader from '../../common/Loader';
import SearchShipment from '../../common/SearchShipment';
import useListShipments from '../../hooks/useListShipment';
import useUpdateShipmentBackdateStatus from '../../hooks/useUpdateShipmentBackdateValidationStatus';

import { SIDBeforeDepartureContext } from './context';
import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function SIDBeforeDeparture() {
	const [filters, setFilters] = useState({});
	const [selectedShipments, setSelectedShipments] = useState(new Set());
	const [showModal, setShowModal] = useState(false);

	const { data, refetchShipments, loading } = useListShipments({ filters });
	const { updatingShipment, udpateShipment } = useUpdateShipmentBackdateStatus();

	const contextValue = useMemo(
		() => ({ selectedShipments, setSelectedShipments }),
		[selectedShipments, setSelectedShipments],
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		const val = new FormData(e.target);
		const payload = Array.from(val?.entries())?.reduce((acc, [serialId, remark]) => {
			acc.push({ serial_id: +serialId, remarks: remark });
			return acc;
		}, []);

		udpateShipment({ objects: payload }, () => { refetchShipments(); setShowModal(false); });
	};

	useEffect(() => {
		setSelectedShipments(new Set());
	}, [data]);

	return (
		<div>
			<SearchShipment setFilters={setFilters} />
			{loading
				? <Loader />
				: (
					<SIDBeforeDepartureContext.Provider value={contextValue}>
						<ShipmentList
							data={data}
							loading={loading}
							filters={filters}
							setFilters={setFilters}
							setShowModal={setShowModal}
						/>
					</SIDBeforeDepartureContext.Provider>
				)}

			<Modal show={showModal} placement="top" size="lg" onClose={() => setShowModal(false)}>
				<Modal.Header title="Provide Remark" />
				<form onSubmit={handleSubmit}>
					<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
						<div className={styles.remark_wrapper}>
							<span className={cl`${styles.serial_id} ${styles.bold}`}>
								Serial ID
							</span>
							<span className={styles.bold}>Remark</span>
						</div>

						{Array.from(selectedShipments)?.map((serialId) => (
							<div key={`remark_row_${serialId}`} className={styles.remark_wrapper}>
								<span className={cl`${styles.serial_id} ${styles.bold}`}>
									{serialId}
								</span>
								<Input name={serialId} placeholder="Add remark ..." required />
							</div>
						))}
					</Modal.Body>

					<Modal.Footer>
						<div className={styles.actions}>
							<div className={styles.cancel}>
								<Button
									onClick={() => setShowModal(false)}
									disabled={updatingShipment}
									themeType="secondary"
								>
									Cancel
								</Button>
							</div>

							<div>
								<Button
									disabled={updatingShipment}
									type="submit"
									themeType="accent"
								>
									Submit
								</Button>
							</div>
						</div>
					</Modal.Footer>
				</form>
			</Modal>
		</div>
	);
}

export default SIDBeforeDeparture;
