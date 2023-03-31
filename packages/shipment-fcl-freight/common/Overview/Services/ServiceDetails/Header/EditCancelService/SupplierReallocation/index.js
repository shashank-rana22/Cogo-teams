import { Button, Modal, Select } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useContext } from 'react';

// import { ShipmentDetailContext } from '../../../../commons/Context';
// import Layout from '../../../../commons/Layout';
// import useUpdateShipmentService from '../../../hooks/useUpdateShipmentService';
import { useState } from 'react';

import controls from './controls';
import styles from './styles.module.css';

function SupplierReallocation({
	serviceData = [],
	setShow = () => {},
	show = false,
	isAdditional = false,
	refetchServices = () => {},
}) {
	const { isMobile } = useSelector(({ general }) => ({
		isMobile: (general || {}).isMobile,
	}));
	const [value, setValue] = useState('');
	// const [{ shipment_data, refetch }] = useContext(ShipmentDetailContext);

	// const {
	// 	handleUpdate,
	// 	newcontrols,
	// 	onError,
	// 	errors,
	// 	handleSubmit,
	// 	fields,
	// 	loading,
	// } = useUpdateShipmentService({
	// 	serviceData,
	// 	setShow,
	// 	controls,
	// 	shipment_data,
	// 	isAdditional,
	// 	refetch,
	// 	refetchServices,
	// });

	const options = [
		{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
		{ label: 'Lev Tolstoy', value: 'War and Peace' },
		{ label: 'Fyodor Dostoyevsy', value: 'The Idiot' },
		{ label: 'Oscar Wilde', value: 'A Picture of Dorian Gray' },
		{ label: 'George Orwell', value: '1984' },
		{ label: 'Jane Austen', value: 'Pride and Prejudice' },
		{ label: 'Marcus Aurelius', value: 'Meditations' },
		{ label: 'Fyodor Dostoevsky', value: 'The Brothers Karamazov' },
		{ label: 'Lev Tolstoy', value: 'Anna Karenina' },
		{ label: 'Fyodor Dostoevsky', value: 'Crime and Punishment' },
	];

	return (
		<Modal
			className={styles.styled_modal}
			show={show}
			onClose={() => setShow(false)}
			styles={{ dialog: { width: isMobile ? 360 : 700 } }}
		>
			<div>
				<Modal.Header title={serviceData?.[0]?.service_type === 'fcl_freight_service'
					&& !isAdditional
					? 'Edit Parameters'
					: 'Supplier Reallocation'}
				/>

				<Modal.Body>
					<Select
						size="sm"
						value={value}
						onChange={setValue}
						placeholder="Select Service Provider"
						options={options}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						className="primary md reviewed"
					>
						Update
					</Button>
				</Modal.Footer>
			</div>
		</Modal>
	);
}

export default SupplierReallocation;
