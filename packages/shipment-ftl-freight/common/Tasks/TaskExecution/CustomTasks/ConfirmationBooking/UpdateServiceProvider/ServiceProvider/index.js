import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState, useMemo } from 'react';

import CardList from '../../../../../../CardList';
import { serviceProviderTableColumns } from '../serviceProviderTableColumns';
import { Footer, ServiceProviderWrapper } from '../styles';
import TruckDetails from '../TruckDetails';

function ServiceProvider(props) {
	const {
		singleServiceProvider,
		setFinalGetHookData = () => {},
		serviceProviderData = {},
		truck_type = '',
	} = props;

	const [show, setShow] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const value = serviceProviderData[truck_type]?.list?.[0];

	const memoizedField = useMemo(() => serviceProviderTableColumns({
		isEdit,
		setIsEdit,
		serviceProviderData,
		setFinalGetHookData,
		value,
	}), [isEdit, serviceProviderData, setFinalGetHookData, value]);

	return (
		<ServiceProviderWrapper>
			<CardList fields={memoizedField} data={[singleServiceProvider]} />
			{show ? (
				<TruckDetails {...props} serviceProviderData={singleServiceProvider} />
			) : null}
			<Footer onClick={() => setShow(!show)}>
				{show ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
			</Footer>
		</ServiceProviderWrapper>
	);
}

export default ServiceProvider;
