import { useState } from 'react';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { serviceProviderTableColumns } from '../serviceProviderTableColumns';
import CardList from '../../../../../../../commons/CardList';
import TruckDetails from '../TruckDetails';
import { Footer, ServiceProviderWrapper } from '../styles';

const ServiceProvider = (props) => {
	const [show, setShow] = useState(false);

	const { singleServiceProvider } = props;

	return (
		<ServiceProviderWrapper>
			<CardList
				fields={serviceProviderTableColumns}
				data={[singleServiceProvider]}
			/>
			{show ? (
				<TruckDetails {...props} serviceProviderData={singleServiceProvider} />
			) : null}
			<Footer onClick={() => setShow(!show)}>
				{show ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
			</Footer>
		</ServiceProviderWrapper>
	);
};

export default ServiceProvider;
