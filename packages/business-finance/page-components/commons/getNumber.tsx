export function getNumber(labelValue:string) {
	if (Math.abs(Number(labelValue)) >= 1.0e9) {
		return `${(Math.abs(Number(labelValue)) / 1.0e9).toFixed(2)}B`;
	}
	if (Math.abs(Number(labelValue)) >= 1.0e6) {
		return `${(Math.abs(Number(labelValue)) / 1.0e6).toFixed(2)}M`;
	}
	if (Math.abs(Number(labelValue)) >= 1.0e3) {
		return `${(Math.abs(Number(labelValue)) / 1.0e3).toFixed(2)}K`;
	}
	return Math.abs(Number(labelValue));
}
