const getApproveJobAuditBttnCondition = ({ quotationsData = {} }) => {
	const { prePostCheckoutData = {}, oprClosedData = {}, financialClosedData = {} } = quotationsData || {};

	const { BUY: oprClosedBuy = [], SELL: oprClosedSell = [] } = oprClosedData;
	const { BUY: financeClosedBuy = [], SELL: financeClosedSell = [] } = financialClosedData;
	const { BUY: prePostBuy = {}, SELL: prePostSell = {} } = prePostCheckoutData;

	const isOprClosedBuyQuotationApproved = (oprClosedBuy || []).every((i) => i?.quotation_state === 'APPROVED');
	const isOprClosedSellQuotationApproved = (oprClosedSell || []).every((i) => i?.quotation_state === 'APPROVED');

	const isOprClosedQuotationsApproved = isOprClosedBuyQuotationApproved && isOprClosedSellQuotationApproved;

	const isFinClosedBuyQuotationApproved = (financeClosedBuy || []).every((i) => i?.quotation_state === 'APPROVED');
	const isFinClosedSellQuotationApproved = (financeClosedSell || []).every((i) => i?.quotation_state === 'APPROVED');

	const isFinClosedQuotationsApproved = isFinClosedBuyQuotationApproved && isFinClosedSellQuotationApproved;

	const isPrePostBuyApproved = (Object.keys(prePostBuy) || [])?.map((i) => {
		if (prePostBuy?.[i]?.finalStatus) {
			return true;
		}
		return false;
	});

	const isPrePostSellApproved = (Object.keys(prePostSell) || [])?.map((i) => {
		if (prePostSell?.[i]?.finalStatus) {
			return true;
		}
		return false;
	});

	const isPrePostQuotationsApproved = isPrePostBuyApproved?.every((i) => i) && isPrePostSellApproved?.every((i) => i);

	const bttnDisableCondition = isOprClosedQuotationsApproved
    && isFinClosedQuotationsApproved
    && isPrePostQuotationsApproved;

	return { bttnDisableCondition };
};

export default getApproveJobAuditBttnCondition;
