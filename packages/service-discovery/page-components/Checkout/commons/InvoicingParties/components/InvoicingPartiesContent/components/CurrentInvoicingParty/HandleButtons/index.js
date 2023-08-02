import { Button, Loader, Toast } from '@cogoport/components';
import { IcMDelete, IcMCrossInCircle, IcMEdit } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import getErrors from '../../../../../utils/getErrors';

import styles from './styles.module.css';

const ONE = 1;

const ICON_MAPPING = {
	true  : IcMCrossInCircle,
	false : IcMEdit,
};

function HandleButtons({
	isEditMode = false,
	length = 0,
	invoiceParty = {},
	updateCheckoutInvoice = () => {},
	editInvoiceDetails = {},
	setEditInvoice = () => {},
	setEditInvoiceDetails = () => {},
	paymentModeValues = {},
	updateLoading = false,
	isFclInvoice = false,
}) {
	const IconToShow = ICON_MAPPING[isEditMode];

	const { services, id } = invoiceParty;

	const onClickUpdate = () => {
		const {
			services: selectedServices = [],
			invoice_currency = '',
			documentCategory = '',
			documentType = '',
			documentDeliveryMode = '',
			paymentModes = {},
		} = editInvoiceDetails;

		const documentDetailsPresent = !isEmpty(
			documentCategory || documentType || documentDeliveryMode,
		) && isFclInvoice;

		const {
			credit_days = 0,
			paymentMethods = '',
			paymentMode = '',
			paymentTerms = '',
		} = paymentModes || {};

		const fcl_freight_services = {
			bl_category      : documentCategory || undefined,
			bl_type          : documentType || undefined,
			bl_delivery_mode : documentDeliveryMode || undefined,
		};

		const { hasError, message } = getErrors({
			selectedServices,
			paymentModesArray: [paymentMode, paymentTerms, paymentMethods],
		});

		if (hasError) {
			Toast.error(message);
			return;
		}

		const payload = {
			services: selectedServices.map(({ service, service_id }) => ({
				service,
				service_id,
			})),
			payment_mode         : paymentMode,
			selected_credit_days : credit_days,
			payment_mode_details : {
				payment_mode   : paymentMode,
				payment_term   : paymentTerms,
				payment_method : paymentMethods,
			},
			...(documentDetailsPresent
				? { document_attributes: { fcl_freight_services } }
				: null),
			invoice_currency,
			id,
		};

		updateCheckoutInvoice({ values: payload, toastMessage: 'updated' });
	};

	const MAPPING = [
		{
			key       : 'delete',
			component : ({ uniqKey }) => (
				<IcMDelete
					key={uniqKey}
					height={18}
					width={18}
					className={styles.icon}
					onClick={() => {
						updateCheckoutInvoice({ values: { id, status: 'inactive' } });
					}}
				/>
			),
			type    : 'icon',
			visible : !isEditMode && length > ONE,
		},
		{
			key       : 'save',
			component : ({ uniqKey }) => (
				<Button
					key={uniqKey}
					type="button"
					size="sm"
					onClick={() => onClickUpdate()}
					loading={updateLoading}
				>
					Update
				</Button>
			),
			type    : 'button',
			visible : isEditMode,
		},
		{
			key       : 'edit',
			component : ({ uniqKey }) => (
				<IconToShow
					key={uniqKey}
					height={18}
					width={18}
					className={styles.icon}
					onClick={() => {
						if (!isEditMode) {
							setEditInvoiceDetails({
								services,
								invoice_currency : invoiceParty.invoice_currency,
								paymentModes     : paymentModeValues,
							});
						} else {
							setEditInvoiceDetails({});
						}

						setEditInvoice((prev) => ({ ...prev, [id]: !prev[id] }));
					}}
				/>
			),
			type    : 'icon',
			visible : true,
		},
	];

	return (
		<div className={styles.container}>
			{MAPPING.map((item) => {
				const { component: componentFunc, visible, key, type = '' } = item;

				if (!visible) {
					return null;
				}

				if (updateLoading && type === 'icon') {
					return <Loader key={key} themeType="primary" />;
				}

				return componentFunc({ uniqKey: key });
			})}
		</div>
	);
}

export default HandleButtons;
