import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRef, useContext } from 'react';

import EditParams from './EditParams';
import styles from './styles.module.css';
import useUpdateShipmentBookingParams from './useUpdateShipmentBookingParams';

function EditParameters({
	newFilteredControls = {},
	boxesToShow = [],
	shipment_data = {},
	services: servicesProps,
	onCancel = () => {},
	refetchServices = () => {},
}) {
	const serviceCardFormRef = useRef([]);
	const { refetch } = useContext(ShipmentDetailContext);
	const { shipment_type = '' } = shipment_data;

	const { handleUpdate, isLoading } = useUpdateShipmentBookingParams({
		shipment_data,
		servicesProps,
		serviceCardFormRef,
		onCancel,
		refetch,
		refetchServices,
		shipment_type,
	});

	return (
		<div className={styles.container}>
			<form>
				<div className={styles.header_container}>
					<div className={styles.heading}>Update Details</div>

					<div className={styles.sub_heading}>
						Updating the booking details will impact the quotation(s)
					</div>
				</div>
				{boxesToShow?.map((item, i) => (
					<EditParams
						shipment_type={shipment_type}
						controls={newFilteredControls[item?.id]}
						detail={item}
						ref={(r) => {
							serviceCardFormRef.current[i] = r;
						}}
						onCancel={onCancel}
					/>
				))}
			</form>
			{shipment_type === 'ltl_freight' ? null : (
				<div className={styles.btn_wrap}>
					<Button
						className="secondary md"
						disabled={isLoading}
						onClick={() => onCancel()}
					>
						Close
					</Button>

					<Button
						className="primary md"
						disabled={isLoading}
						onClick={handleUpdate}
					>
						Update
					</Button>
				</div>
			)}
		</div>
	);
}
export default EditParameters;
