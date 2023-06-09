const PATTERNS = {
	PAN_NUMBER      : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
	AADHAR_NUMBER   : /^[1-9]{1}[0-9]{11}$/g,
	PASSPORT_NUMBER : /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/,
};

export default PATTERNS;
