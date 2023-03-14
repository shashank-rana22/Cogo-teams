import { useState } from 'react';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { serviceProviderTableColumns } from '../serviceProviderTableColumns';
import CardList from '../../../../../../../commons/CardList';
import TrailerDetails from '../TrailerDetails';
import { Footer, ServiceProviderWrapper } from '../styles';

const ServiceProvider = (props) => {
	const [show, setShow] = useState(false);

	const { singleServiceProvider, shipment_data } = props;
	return (
		<ServiceProviderWrapper>
			<CardList
				fields={serviceProviderTableColumns({ shipment_data })}
				data={[singleServiceProvider]}
			/>
			{show ? (
				<TrailerDetails
					{...props}
					serviceProviderData={singleServiceProvider}
				/>
			) : null}
			<Footer onClick={() => setShow(!show)}>
				{show ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
			</Footer>
		</ServiceProviderWrapper>
	);
};

export default ServiceProvider;
