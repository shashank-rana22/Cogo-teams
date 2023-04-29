const PAN_HOLDER_STATUS = {
	C : 'private_limited',
	F : 'partnership',
	P : 'proprietorship',
};

const getPanHolderStatus = (pan) => {
	if (pan.length !== 10) {
		return null;
	}

	return PAN_HOLDER_STATUS[pan[3]] || 'other';
};

export default getPanHolderStatus;
