import React, { useState } from 'react';
import useAddedList from '@cogo/bookings/AdditionalServices/components/List/useAddedList';
import ItemAdded from '@cogo/bookings/AdditionalServices/components/List/ItemAdded';
import getStaus from '@cogo/bookings/AdditionalServices/components/List/ItemAdded/get_status';
import actions from '@cogo/bookings/AdditionalServices/components/List/ItemAdded/actions';
import useGetPermission from '@cogo/business-modules/hooks/useGetPermission';
import { useSelector } from '@cogo/store';
import { isEmpty } from '@cogoport/front/utils';
import AddRate from '@cogo/bookings/AdditionalServices/components/AddRate';
import { Container, AddedServices, RateContainer, Heading } from './styles';

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
		<Container>
			<Heading>
				You have not choosen any invoicing party for these services. You can add
				these services in this invoice
			</Heading>
			{!isEmpty(listAdded) ? (
				<AddedServices>
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
				</AddedServices>
			) : null}

			{addRate ? (
				<RateContainer>
					<AddRate
						item={addRate?.item || addRate}
						shipment_data={shipment_data}
						status={addRate?.status}
						setAddRate={setAddRate}
						refetch={refetch}
					/>
				</RateContainer>
			) : null}
		</Container>
	);
};

export default AdditionalServices;
