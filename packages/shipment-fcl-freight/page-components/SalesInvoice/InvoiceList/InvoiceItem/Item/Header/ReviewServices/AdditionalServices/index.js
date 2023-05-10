import React, { useState } from 'react';
import useAddedList from '@cogo/bookings/AdditionalServices/components/List/useAddedList';
import ItemAdded from '@cogo/bookings/AdditionalServices/components/List/ItemAdded';
import getStaus from '@cogo/bookings/AdditionalServices/components/List/ItemAdded/get_status';
import actions from '@cogo/bookings/AdditionalServices/components/List/ItemAdded/actions';
import useGetPermission from '@cogo/business-modules/hooks/useGetPermission';
import { useSelector } from '@cogo/store';
import { isEmpty } from '@cogoport/front/utils';
import AddRate from '@cogo/bookings/AdditionalServices/components/AddRate';
import styles from './styles.module.css';

const AdditionalServices = ({ shipment_data }) => {
	const { list: listAdded, refetch } = useAddedList({
		shipment_id: shipment_data?.id,
		shipment_data,
	});
	const { isConditionMatches } = useGetPermission();
	const [addRate, setAddRate] = useState(null);
	const { scope } = useSelector(({ general }) => {
		return {
			scope: general.scope,
		};
	});
	return (
		<div>
			<div className={styles.heading}>
				You have not choosen any invoicing party for these services. You can add
				these services in this invoice
			</div>
			{!isEmpty(listAdded) ? (
				<div className={styles.added_services}>
					{listAdded?.map((item) => {
						const status = getStaus({ item });

						return (
							<ItemAdded
								item={item}
								status={status}
								actionButton={actions({
									status,
									item,
									setAddRate,
									scope,
									isShipper: true,
									isConditionMatches,
									addRate,
								})}
							/>
						);
					})}
				</div>
			) : null}

			{addRate ? (
				<div className={styles.rate_container}>
					<AddRate
						item={addRate?.item || addRate}
						shipment_data={shipment_data}
						status={addRate?.status}
						setAddRate={setAddRate}
						refetch={refetch}
					/>
				</div>
			) : null}
		</div>
	);
};

export default AdditionalServices;
