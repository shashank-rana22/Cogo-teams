import { toast } from '@cogoport/components';
// import { useFormCogo } from '@cogoport/front/hooks';
import { useMemo } from 'react';

import {
	getBillingAddressControls,
	getPocFieldArray,
} from '../../utils/controls';

const useBillingDetails = ({
	checkedNotRegisteredUnderGst = false,
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
}) => {
	const billingAddressControls = getBillingAddressControls({
		values: filledDetails.billing_address,
	});

	const pocControlsFieldArray =		getPocFieldArray({
		action    : 'create',
		pocValues : filledDetails.billing_address,
	}) || {};

	const billingDetailsControls = [
		...billingAddressControls,
		...pocControlsFieldArray,
	];

	// const billingDetailsFormProps = useFormCogo(billingDetailsControls);

	const watchIsSezValue = billingDetailsFormProps.watch('is_sez');

	const showElementsForOrgWithGst = [
		'tax_number',
		'tax_number_document_url',
		'is_sez',
		'sez_proof',
	];

	const showElementsForOrgWithoutGst = ['address_type', 'country_id'];

	const showElements = useMemo(() => billingDetailsControls.reduce((pv, cv) => {
		const { name = '' } = cv;

		let showElement = true;
		if (
			(showElementsForOrgWithGst.includes(name)
					&& checkedNotRegisteredUnderGst)
				|| (showElementsForOrgWithoutGst.includes(name)
					&& !checkedNotRegisteredUnderGst)
				|| (name === 'sez_proof' && (watchIsSezValue || []).length === 0)
		) {
			showElement = false;
		}

		return { ...pv, [name]: showElement };
	}, {}), [watchIsSezValue, checkedNotRegisteredUnderGst]);

	const onProceed = (values = {}) => {
		setFilledDetails((previousState) => ({
			...previousState,
			billing_address: values,
		}));

		const { poc_details = {} } = values;

		if (poc_details.length === 0) {
			toast.info('Please create atleast one POC before proceeding ');
			return;
		}
		setCurrentStep('bank_details');
	};

	return {
		onProceed,
		showElements,
		billingDetailsControls,
		billingDetailsFormProps,
	};
};

export default useBillingDetails;
