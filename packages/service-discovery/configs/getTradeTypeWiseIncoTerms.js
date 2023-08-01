import incoterms from './incoterms.json';

const MAPPING = {
	export : ['cif', 'cfr', 'cpt', 'cip', 'dat', 'dap', 'ddp', 'exw'],
	import : ['cpt', 'cip', 'dat', 'dap', 'ddp', 'fob', 'exw', 'fca', 'fas'],
};

const getTradeTypeWiseIncoTerms = (tradeType = 'export') => {
	const possibleIncoTerms = MAPPING[tradeType] || MAPPING.export;

	return possibleIncoTerms.map((key) => incoterms.find((incoTerm) => incoTerm.value === key));
};

export default getTradeTypeWiseIncoTerms;
