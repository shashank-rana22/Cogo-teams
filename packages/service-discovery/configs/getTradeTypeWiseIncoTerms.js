import incoterms from './incoterms.json';

const getTradeTypeWiseIncoTerms = (tradeType = 'export') => incoterms.filter((item) => item.tradeType === tradeType);

export default getTradeTypeWiseIncoTerms;
