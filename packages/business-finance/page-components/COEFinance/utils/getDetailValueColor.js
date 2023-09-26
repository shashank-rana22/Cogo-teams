export const getDetailValueColor = ({ value, docContent }) => (docContent?.includes((value)?.toLowerCase())
	? 	'green' : 'auto');
