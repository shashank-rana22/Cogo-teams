const calculateAccrue = () => {
	const calAccrueSale = (itemData, np) => {
		const nr = 100 * +itemData.expenseBooked;
		const dr = 100 - +np;

		const oldSale = +itemData.incomeBooked;

		const accruedSale = nr / dr - oldSale;
		return accruedSale.toFixed(4);
	};

	const calAccruePurchase = (itemData, np) => {
		let nr = 100 - +np;
		nr *= +itemData.incomeBooked;

		const oldPurchase = +itemData.expenseBooked;

		const accruedPurchase = nr / 100 - oldPurchase;
		return accruedPurchase.toFixed(4);
	};

	return {
		calAccruePurchase,
		calAccrueSale,
	};
};

export default calculateAccrue;
