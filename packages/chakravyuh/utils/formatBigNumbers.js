const ONE_MILLION = 1000000;
const ONE_LAKH = 100000;
const THOUSAND = 1000;

export const formatBigNumbers = (cnt) => {
	if (cnt > ONE_MILLION) {
		return `${Math.round(cnt / ONE_LAKH)} Lakh`;
	}
	if (cnt > ONE_LAKH) {
		return `${Math.round(cnt / THOUSAND)}K`;
	}
	return Math.round(cnt);
};
