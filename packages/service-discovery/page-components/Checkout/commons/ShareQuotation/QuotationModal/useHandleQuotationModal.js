/* eslint-disable max-lines-per-function */
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useMemo } from 'react';

import Customize from './components/Customize';
import SelectRecipients from './components/SelectRecipients';
import getEmailPreview from './getEmailPreview';
import getPrefilledValues from './getPrefilledValues';

const useHandleQuotationModal = ({
	invoice,
	detail = {},
	checkout_type = '',
	organization = {},
	widths,
	selectedModes,
	setShowShareQuotationModal,
	updateLoading,
	updateCheckout = () => {},
	bookingConfirmationMode = '',
	setShowSuccessModal = () => {},
}) => {
	const { query, agent_id, partnerId } = useSelector(({ general, profile }) => ({
		query     : general.query,
		agent_id  : profile?.id,
		partnerId : profile?.partner?.id,
	}));

	const { billing_addresses = [] } = invoice || {};

	const [activeState, setActiveState] = useState('customize');
	const [emailContent, setEmailContent] = useState({});
	const [emailPreviews, setEmailPreviews] = useState({});
	const [selected, setSelected] = useState('main');
	const [confirmation, setConfirmation] = useState(false);

	const { quotation_type, checkout_ids, tags = [] } = detail || {};

	const { checkout_id, shipment_id } = query || {};

	const prefilledValues = getPrefilledValues(detail, [
		organization?.agent_id,
		agent_id,
	]);

	const org_id = selected === 'main'
		? detail?.importer_exporter_id
		: selected?.organization_id;

	const orgUsersParams = {
		page_limit : 1000,
		status     : 'active',
		filters    : {
			organization_id: org_id,
		},
	};

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/send_checkout_quotation_emails',
			method : 'POST',
		},
		{ manual: true },
	);

	const [{ data: orgUsersData = {} }, triggerListOrgUsers] = useRequest(
		{
			method : 'get',
			url    : '/list_organization_users',
			params : orgUsersParams,
		},
		{ manual: false },
	);

	const {
		control: recipientsControl,
		watch: recipientWatch,
		setValue,
	} = useForm();

	const {
		control: emailControl,
		setValue: emailSetValue,
		watch: emailWatch,
		formState: { errors: emailErrors },
	} = useForm();

	useEffect(() => {
		Object.entries(prefilledValues).forEach(([key, value]) => {
			emailSetValue(key, value);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getEmailPreviewProps = useMemo(
		() => ({
			billing_addresses,
			emailContent,
			quotation_type,
			checkout_type,
			trigger,
			checkout_ids,
			checkout_id,
			shipment_id,
			setEmailPreviews,
		}),
		[
			billing_addresses,
			checkout_id,
			checkout_ids,
			checkout_type,
			emailContent,
			quotation_type,
			shipment_id,
			trigger,
		],
	);

	const onSave = async (email, setContent = true) => {
		if (selected === 'main') {
			if (setContent) {
				setEmailContent({ ...emailContent, main: email });
			}
			getEmailPreview({
				emailContentNew: { ...emailContent, main: email },
				...getEmailPreviewProps,
			});
		} else {
			if (setContent) {
				setEmailContent({ ...emailContent, [selected?.tax_number]: email });
			}
			getEmailPreview({
				emailContentNew: { ...emailContent, [selected?.tax_number]: email },
				...getEmailPreviewProps,
			});
		}
	};

	const handleSendEmail = async () => {
		const quotation_params = Object.keys(emailContent).map(
			(key) => emailContent[key],
		);

		if (quotation_params.length) {
			try {
				await trigger({
					data: {
						quotation_params,
						ids               : checkout_type === 'rfq' ? detail?.checkout_ids : [detail?.id],
						show_preview_only : false,
					},
				});
				setShowShareQuotationModal(false);

				await updateCheckout({
					values: {
						id        : checkout_id,
						is_locked : true,
						tags      : [...new Set([...tags, 'added_to_cart'])],
					},
				});

				setShowSuccessModal(true);

				if (bookingConfirmationMode === 'email') {
					window.location.href = `/${partnerId}/sales/dashboards`;
				}
			} catch (err) {
				if (err?.response) {
					Toast.error('Something went wrong. Please try again later');
				}
			}
		} else {
			Toast.error('Please select at least one party and save');
		}
	};

	const formatEmailValues = (values) => {
		const NEW_VALUES = {};
		Object.keys(values || {}).forEach((key) => {
			const value = values[key];
			if (value && key === 'attachment_file_urls') {
				const urls = (value || []).map((item) => item?.finalUrl || item || '');

				NEW_VALUES[key] = urls;
			} else if (value && key === 'terms_and_conditions') {
				NEW_VALUES[key] = [value];
			} else if (value) {
				NEW_VALUES[key] = value;
			}
		});
		return NEW_VALUES;
	};

	const handleEmailSend = () => {
		const values = recipientWatch();
		const emailValues = emailWatch();
		if (!values || !emailValues) {
			return;
		}

		const allValues = { ...emailValues, ...values };

		const payload = formatEmailValues(allValues);

		const body = {
			organization_id : detail?.importer_exporter_id,
			tax_number      : selected?.tax_number || undefined,
			quotation_type  : selected === 'main' ? 'booking' : 'invoicing',
			...payload,
		};
		onSave(body);
		setActiveState('customize');
	};

	const handleNext = () => {
		if (activeState === 'customize') {
			const values = emailWatch();
			if (values) {
				onSave(formatEmailValues(values), false);

				emailSetValue('attachment_file_urls', []);

				if (activeState === 'customize') {
					setActiveState('select_recipient');
				}

				return setActiveState((prev) => (prev === 'customize' ? 'select_recipient' : prev));
			}
		}
		return handleEmailSend();
	};

	const handleFclFreight = () => {
		const quotation_params = Object.keys(emailContent).map(
			(key) => emailContent[key],
		);

		if (!quotation_params.length) {
			Toast.error('Please select at least one party and save');
			return;
		}

		setConfirmation(true);
	};

	const handleClick = () => (detail?.primary_service === 'fcl_freight'
		? handleFclFreight()
		: handleSendEmail());

	const MAPPING = {
		customize: {
			component      : Customize,
			compoenntProps : {
				detail,
				organization,
				selectedModes,
				widths,
				billing_addresses,
				selected,
				setSelected,
				emailContent,
				emailControl,
				emailErrors,
				handleNext,
			},
			buttons: [
				{
					key       : 'cancel',
					label     : 'Cancel & Close Preview',
					themeType : 'secondary',
					disabled  : loading || updateLoading,
					onClick   : () => setShowShareQuotationModal(false),
					style     : { marginLeft: '16px' },
				},
				{
					key       : 'send_quotation',
					label     : 'Send Quotation',
					loading   : loading || updateLoading,
					onClick   : handleClick,
					themeType : 'accent',
					style     : { marginLeft: '16px' },
				},
			],
		},
		select_recipient: {
			component      : SelectRecipients,
			compoenntProps : {
				recipientsControl,
				setValue,
				emailPreviews,
				organization,
				selected,
				recipientWatch,
				orgUsersData,
				emailWatch,
				emailContent,
				loading,
			},
			buttons: [
				{
					key       : 'cancel',
					label     : 'Cancel & Close Preview',
					themeType : 'secondary',
					onClick   : () => setShowShareQuotationModal(false),
					disabled  : loading || updateLoading,
					style     : { marginLeft: '16px' },
				},
				{
					key       : 'send_quotation',
					label     : 'Send Quotation',
					themeType : 'accent',
					onClick   : handleClick,
					loading   : loading || updateLoading,
					style     : { marginLeft: '16px' },
				},
			],
		},
	};

	return {
		activeState,
		org_id,
		triggerListOrgUsers,
		MAPPING,
		handleNext,
		handleEmailSend,
		setActiveState,
		buttonDisabled: loading || updateLoading,
		confirmation,
		setConfirmation,
		handleSendEmail,
	};
};

export default useHandleQuotationModal;
