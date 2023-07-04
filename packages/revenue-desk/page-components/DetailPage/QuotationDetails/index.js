import useGetBuyQuotation from '../../../hooks/useGetBuyQuotation';
import useGetShipmentQuotation from '../../../hooks/useGetShipmentQuotation';
import { VALUE_ZERO } from '../../constants';

import BuyServiceQuotation from './BuyServiceQuotation';
import SellServiceQuotation from './SellServiceQuotation';
import styles from './styles.module.css';

function QuotationDetails({ itemData, setPriceData, priceData }) {
	const { data:SellData, loading } = useGetShipmentQuotation({ shipmentData: itemData });
	const { data:BuyData, loading:BuyLoading } = useGetBuyQuotation({ shipmentData: itemData });
	const totalBuyPrice = BuyData?.net_pre_tax_total;
	const totalBuyPriceCurrency = BuyData?.net_total_price_currency;
	const totalSellPrice = SellData?.net_pre_tax_total;
	const totalSellPriceCurrency = SellData?.net_total_price_currency;
	const profitAmount = Number(totalSellPrice) - Number(totalBuyPrice);
	const profitCurrency = totalSellPriceCurrency || totalBuyPriceCurrency;
	const profitPercentage = totalBuyPrice !== VALUE_ZERO
		? Number(profitAmount) / Number(totalBuyPrice) : VALUE_ZERO;
	return (
		<div className={styles.container}>
			<div>
				<SellServiceQuotation
					setPriceData={setPriceData}
					data={SellData}
					loading={loading}
					profitAmount={profitAmount}
					profitCurrency={profitCurrency}
					itemData={itemData}
				/>
			</div>
			<div>
				<BuyServiceQuotation
					data={BuyData}
					loading={BuyLoading}
					profitPercentage={profitPercentage}
					priceData={priceData}
					itemData={itemData}
				/>
			</div>

		</div>
	);
}

export default QuotationDetails;
