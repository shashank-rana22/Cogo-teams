import useGetSubscriptionOrder from '../../../../../../hooks/useGetSubscriptionOrder';

function Orders({ info }) {
	const { loading, data } = useGetSubscriptionOrder({ info });

	console.log(data, 'data', loading);
	return (
		<div>Orders</div>
	);
}

export default Orders;
