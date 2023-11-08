import incoterms from './incoterms.json';

const getTradeTypeWiseIncoTerms = ({
	tradeType = 'export',
	isCrossLocationSearch,
}) => incoterms.filter((item) => ((item.tradeType === tradeType) || isCrossLocationSearch));
export default getTradeTypeWiseIncoTerms;
