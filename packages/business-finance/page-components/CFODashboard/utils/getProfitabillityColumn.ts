import customerProfitabillityColumn from '../configuration/customer-profitabillity-table';
import profitabillityColumn from '../configuration/profitabillity-table';

const getProfitabillityColumn = (tabs, sort, setSort) => {
	if (tabs === 'shipment') {
		return profitabillityColumn(sort, setSort);
	}
	return customerProfitabillityColumn(sort, setSort);
};

export default getProfitabillityColumn;
