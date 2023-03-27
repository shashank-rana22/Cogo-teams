export function getformatPrice(amount:number) {
	const kharab = Math.floor(amount / 10000000000000);
	const arab = Math.floor((amount % 10000000000000) / 100000000000);
	const crore = Math.floor((amount % 100000000000) / 10000000);
	const lakh = Math.floor((amount % 10000000) / 100000);
	const hazar = Math.floor((amount % 100000) / 1000);
	const remaining = amount % 1000;

	let formattedAmount = '';

	if (kharab > 0) {
		formattedAmount += `${kharab} Kharab `;
	}

	if (arab > 0) {
		formattedAmount += `${arab} Arab `;
	}

	if (crore > 0) {
		formattedAmount += `${crore} Cr `;
	}

	if (lakh > 0) {
		formattedAmount += `${lakh} lac `;
	}

	if (hazar > 0) {
		formattedAmount += `${hazar} K `;
	}

	if (remaining > 0) {
		formattedAmount += `${remaining.toFixed(2)}`;
	}

	return formattedAmount.trim() || 0;
}
