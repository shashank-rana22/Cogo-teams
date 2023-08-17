const DEFAULT_VALUE = 0;

export const checkForAth = (splitAmount = [], item = {}) => {
	const splitAdvanceAmountTotal = splitAmount.reduce(
		(acc, split) => acc + +(split?.amount || DEFAULT_VALUE),
		DEFAULT_VALUE,
	);

	if (splitAdvanceAmountTotal === DEFAULT_VALUE) {
		return { checked: true, err: '' };
	}

	if (item?.updated_advance_amount) {
		if (splitAdvanceAmountTotal === +(item?.updated_advance_amount || DEFAULT_VALUE)) {
			return { checked: true, err: '' };
		}
		return {
			checked : false,
			err     : `Split Advance amount is not equal entered Advance amount (${item?.updated_advance_amount})`,
		};
	}

	if (item?.advanced_amount) {
		if (splitAdvanceAmountTotal === +(item?.advanced_amount || DEFAULT_VALUE)) {
			return { checked: true, err: '' };
		}
		return {
			checked : false,
			err     : `Split Advance amount is not equal Advance amount (${item?.advanced_amount})`,
		};
	}

	return {
		checked : false,
		err     : 'No Advanced amount exist!! Please Enter Advanced Amount',
	};
};
