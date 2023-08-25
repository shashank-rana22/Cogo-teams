const CHECK_ARRAY_LENGTH = 1;

const getAllPocMergedData = ({ tradePartnersData = [], stakeHoldersData = [], showPocDetails = {} }) => {
	const { primary_poc_details = {}, importer_exporter_poc = {} } = showPocDetails;

	const pocDetails = [importer_exporter_poc];

	if (primary_poc_details && primary_poc_details?.id !== importer_exporter_poc?.id) {
		const updatedPocData = { ...primary_poc_details, is_primary_poc: true };
		pocDetails.unshift(updatedPocData);
	}

	const updatedPocDetails = pocDetails?.reduce((accumulator, item) => {
		if (pocDetails?.length === CHECK_ARRAY_LENGTH) {
			const updatedItem = { ...item, chat_option: true, is_primary_poc: true, is_customer: true };
			accumulator.push(updatedItem);
		} else {
			const updatedItem = item?.is_primary_poc ? { ...item, chat_option: true, is_customer: true }
				: { ...item, chat_option: true, is_primary_poc: false, is_customer: true };
			accumulator.push(updatedItem);
		}
		return accumulator;
	}, []);

	const updatedTradePartnersData = tradePartnersData?.reduce((accumulator, item) => {
		const updatedItem = { ...item, chat_option: true, is_trade_partner: true };
		accumulator.push(updatedItem);
		return accumulator;
	}, []);

	const mergedData = [...(updatedPocDetails || []), ...(updatedTradePartnersData || []), ...(stakeHoldersData || [])];

	return mergedData;
};

export default getAllPocMergedData;
