import ManagerList from './ManagerList';

function FieldSales({ val, currency, filters }) {
	return (
		<ManagerList currency={currency} data={val?.managers} filters={filters} />
	);
}

export default FieldSales;
