const PATTERNS = {
	PAN_NUMBER       : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
	EMAIL            : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
	CONTAINER_NUMBER : /^[A-Z]{3}U[0-9]{6,7}$/,
	GST_NUMBER       : /\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/g,
};
export default PATTERNS;
