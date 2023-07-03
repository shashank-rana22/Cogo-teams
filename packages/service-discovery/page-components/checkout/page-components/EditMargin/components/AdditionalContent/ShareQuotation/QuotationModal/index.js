import { Modal, Button, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback } from 'react';

import Customize from './components/Customize';
import SelectRecipients from './components/SelectRecipients';
import styles from './styles.module.css';

function QuotationModal({
	modalSize,
	selectedModes,
	setShowShareQuotationModal = () => {},
	showShareQuotationModal = false,
	invoice,
	detail = {},
	checkout_type = '',
	organization,
	widths,
}) {
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const { billing_addresses = [] } = invoice || {};

	const [activeState, setActiveState] = useState('customize');
	const [emailContent, setEmailContent] = useState({});
	const [emailPreviews, setEmailPreviews] = useState({});
	const [selected, setSelected] = useState('main');

	const { quotation_type, checkout_ids } = detail || {};

	const { checkout_id, shipment_id } = query || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/send_checkout_quotation_emails',
		method : 'POST',
	}, { manual: true });

	const MAPPING = {
		customize: {
			component      : Customize,
			compoenntProps : { detail, organization, selectedModes, widths, billing_addresses, selected, setSelected },
			buttons        : [
				{
					key       : 'next',
					label     : 'Next (Set Recipient)',
					onClick   : () => setActiveState('select_recipient'),
					themeType : 'link',
				},
				{
					key       : 'cancel',
					label     : 'Cancel & Close Preview',
					themeType : 'secondary',
					onClick   : () => setShowShareQuotationModal(false),
					style     : { marginLeft: '16px' },
				},
				{
					key       : 'send_quotation',
					label     : 'Send Quotation',
					loading,
					themeType : 'accent',
					style     : { marginLeft: '16px' },
				},
			],
		},
		select_recipient: {
			component : SelectRecipients,
			buttons   : [
				{
					key       : 'back',
					label     : 'Back',
					themeType : 'link',
					onClick   : () => setActiveState('customize'),
				},
				{
					key       : 'cancel',
					label     : 'Cancel & Close Preview',
					themeType : 'secondary',
					onClick   : () => setShowShareQuotationModal(false),
					style     : { marginLeft: '16px' },
				},
				{
					key       : 'send_quotation',
					label     : 'Send Quotation',
					themeType : 'accent',
					loading,
					style     : { marginLeft: '16px' },
				},
			],
		},
	};

	const {
		component: ActiveComponent,
		buttons: activeButtons,
		compoenntProps: activeCompoenntProps,
	} = MAPPING[activeState];

	const getEmailPreview = useCallback(async (emailContentNew = {}) => {
		const quotation_params = (billing_addresses || []).map((address) => ({
			quotation_type : 'invoicing',
			tax_number     : address?.tax_number,
			...(emailContentNew[address?.tax_number]
				|| emailContent[address?.tax_number]
				|| {}),
		}));

		const quotation_body = quotation_type === 'all_service_combined'
			? [
				{
					quotation_type: 'booking',
					...(emailContentNew?.main || emailContent?.main || {}),
				},
			]
			: [
				...quotation_params,
				{
					quotation_type: 'booking',
					...(emailContentNew?.main || emailContent?.main || {}),
				},
			];

		try {
			const res = await trigger({
				data: {
					quotation_params: quotation_body,
					ids:
						checkout_type === 'rfq'
							? checkout_ids
							: [checkout_id],
					shipment_id       : shipment_id || undefined,
					show_preview_only : true,
				},
			});

			const FORMATTED_PREVIEWS = {};

			(res?.data?.list || []).forEach((item) => {
				if (item?.tax_number) {
					FORMATTED_PREVIEWS[item?.tax_number] = item;
				} else {
					FORMATTED_PREVIEWS.main = item;
				}
			});

			setEmailPreviews(FORMATTED_PREVIEWS);
		} catch (err) {
			if (err?.response) {
				Toast.error('Something went wrong');
			}
		}
	}, [billing_addresses, quotation_type, emailContent, trigger, checkout_type, checkout_ids, checkout_id, shipment_id]);

	useEffect(() => {
		getEmailPreview();
	}, [getEmailPreview]);

	return (
		<Modal
			show={showShareQuotationModal}
			onClose={() => setShowShareQuotationModal(false)}
			placement="top"
			size={modalSize}
		>
			<ActiveComponent {...activeCompoenntProps} />

			<Modal.Footer>
				<div className={styles.button_container}>
					{activeButtons.map((item) => {
						const { key, label, ...buttonProps } = item;

						return (
							<Button
								key={key}
								type="button"
								{...buttonProps}
							>
								{label}
							</Button>
						);
					})}
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default QuotationModal;
