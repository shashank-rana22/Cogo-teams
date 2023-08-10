import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export 	const formatPayload = (
	payload,
	profileName,
	id,
	tradePartyMappingId,
	venderDataValue,
	taggedOrganizationId,
	bankAccountNumber,
	bankName,
	paymentCode,
	profileId,
	showBprNumber,
) => {
	const newPayload = { ...payload };

	if (newPayload.paymentDate) {
		newPayload.paymentDate = formatDate({
			date       : newPayload.paymentDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			formatType : 'date',
		});
		newPayload.uploadedBy = profileName || '';
		newPayload.id = id;
	}

	const { ...rest } = newPayload || {};
	return {
		...rest,
		tradePartyMappingId  : tradePartyMappingId || venderDataValue?.id,
		taggedOrganizationId : taggedOrganizationId || venderDataValue?.organization_id,
		bankAccountNumber,
		bankName,
		paymentCode,
		createdBy            : profileId,
		updatedBy            : profileId,
		sageOrganizationId   : showBprNumber?.sage_organization_id,
	};
};

export 	const powerControls = (newControls, bankData, accountMode) => newControls.map((controlValue) => {
	const { name } = controlValue;

	if (name === 'bankId') {
		return {
			...controlValue,
			options: (bankData.bank_details || []).map((item) => ({
				value : item.id,
				label : `${item.beneficiary_name} (${item.account_number})`,
			})),
		};
	}

	if (name === 'docType') {
		if (accountMode === 'AP') {
			const currentOptions = [...controlValue.options];
			const mutatedOptions = currentOptions.slice(1);

			return {
				...controlValue,
				options: [
					{ label: 'Payment', value: 'PAYMENT' },
					...mutatedOptions,
				],
			};
		}
		return {
			...controlValue,
			options: [...controlValue.options],
		};
	}

	return { ...controlValue };
});

export 	const transactionDates = (paymentDateValue) => formatDate({
	date       : paymentDateValue,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
});
