import customerProfitabillityColumn from '../configuration/customer-profitabillity-table';
import profitabillityColumn from '../configuration/profitabillity-table';

const getProfitabillityColumn = (tabs) => {
	if (tabs === 'shipment') {
		return profitabillityColumn;
	}
	return customerProfitabillityColumn;
};

export default getProfitabillityColumn;
