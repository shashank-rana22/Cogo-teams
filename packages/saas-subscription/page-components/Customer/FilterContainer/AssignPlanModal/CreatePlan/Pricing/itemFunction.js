import formatAmount from "@cogoport/globalization/utils/formatAmount";

import EditPrice from "./EditPrice";
import { Checkbox } from "@cogoport/components";
import { getCheck } from "../../../../../../utils/getCheck";
const itemFunction = ({
  isEditPrice,
  setIsEditPrice,
  setUpdatePricing,
  setFrequencyPeriod,
}) => ({
  renderPrice: (item) => (
    <EditPrice
      item={item}
      isEditPrice={isEditPrice}
      setIsEditPrice={setIsEditPrice}
      setUpdatePricing={setUpdatePricing}
    />
  ),
  renderDiscount: (item, config) => (
    <span>
      {formatAmount({
        amount: item?.[config?.key],
        currency: item?.currency,
        options: {
          style: "currency",
          currencyDisplay: "symbol",
          maximumFractionDigits: 2,
        },
      })}
    </span>
  ),
  renderCheck: (item, config) => (
    <Checkbox
      checked={item?.[config?.key]}
      onChange={() => {
        setUpdatePricing((prev) => getCheck({prev, item}));
        setFrequencyPeriod(item?.period);
      }}
    />
  ),
});

export default itemFunction;
