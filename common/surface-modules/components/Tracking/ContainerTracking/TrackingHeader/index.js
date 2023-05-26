import React, { useState, useEffect } from 'react';
import { Select, Button } from '@cogoport/components';
import Popover from '@cogoport/components';
import { SelectController,InputController,TextAreaController ,useForm } from '@cogoport/forms';
import RaiseQuery from './RaiseQuery';
import FtlTracker from './ftlTracker';
import useCreateRaiseQuery from '../../../../hooks/useCreateRaiseQuery';
import styles from './styles.module.css';

function TrackingHeader({
	setContainerNo = () => {},
	containerNo = '',
	truckOptions = [],
	serialId,
	shipmentId = '',
	data,
	refetch = () => {},
	listShipments = () => {},
	ftlServices,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const {
		control,
		handleSubmit,
	} = useForm();

	const { loading, handleFormSubmit, reset } =
		useCreateRaiseQuery({
			setShowModal,
			setIsOpen,
			shipmentId,
		});

	const servicesData = (ftlServices || []).filter(
		(item) => item?.truck_number === containerNo,
	);

	const options = [
		{
			label: 'Inaccurate data',
			value: 'inaccurate_data',
		},
		{
			label: 'Shipment Rollover',
			value: 'shipment_rollover',
		},
		{
			label: 'Map View is not available',
			value: 'map_view_not_available',
		},
		{
			label: 'Other',
			value: 'other',
		},
	];

	const content = (
		<div className={styles.Content}>
            <SelectController
				size="sm"
				name="query_type"
				placeholder="Select"
				label= 'Issue Related to'
				control={control}
				options={options}
				rules={{ required: { value: true, message: 'Company is required' } }}
			/>

 			<TextAreaController 	
				name="remarks"
				label= 'Remarks'
				control={control}
				themeType="admin" 
			/>

			<div className={styles.ButtonDiv}>
				<Button
					onClick={() => {
						setIsOpen(false);
						reset();
					}}
					className="secondary md"
					style={{ marginRight: 10 }}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					onClick={handleSubmit(handleFormSubmit)}
					className="primary md"
				>
					Submit
				</Button>
			</div>
		</div>
	);

	useEffect(() => {
			listShipments();
	}, [containerNo]);

	return (
		<div className={styles.Container}>
			<div className={styles.RowContainer}>
				<div className={styles.Text}>Tracking Information</div>
				<Select
						className="primary md custom"
						theme="admin"
						placeholder="Truck No"
						value={containerNo}
						onChange={(e) => setContainerNo(e)}
						options={truckOptions || []}
					/>
			</div>

			<div className={styles.SecondRow}>

				{!data?.is_trip_completed && (
					<FtlTracker
						serialId={serialId}
						data={data}
						servicesData={servicesData?.[0] || {}}
						listShipments={listShipments}
						refetch={refetch}
					/>
				)}

				{showModal && (
					<div className={styles.StyledModal}
						show={showModal}
						closable={false}
						onClose={() => setShowModal(false)}
						className="primary md"
						position="primary md"
						width={400}
					>
						<RaiseQuery setShowModal={setShowModal} />
					</div>
				)}
			</div>
		</div>
	);
}

export default TrackingHeader;
