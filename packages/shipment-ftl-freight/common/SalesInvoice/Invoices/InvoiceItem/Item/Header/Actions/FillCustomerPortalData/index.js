import { Button, Modal, RTEditor } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/surface-modules';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useEffect, useState } from 'react';

import useCreateShipmentFortigoTripDetail from '../../../../../../../../hooks/useCreateShipmentFortigoTripDetail';
import useGetShipmentFortigoTripDetail from '../../../../../../../../hooks/useGetShipmentFortigoTripDetail';
import useListCogoEntities from '../../../../../../../../hooks/useListCogoEntities';
import useListShipmentTradePartners from '../../../../../../../../hooks/useListShipmentTradePartners';
import { formControls } from '../commons/controls/formControls';
import { companyToIdMap } from '../commons/utils/companyIdMapper';
import { ADDITIONAL_CHARGE_KEYS, getFormatValue } from '../commons/utils/getFormatValue';

import styles from './styles.module.css';
import getCustomPrefillValues from './utils/getCustomPrefillValues';
import getFieldLikeControls from './utils/getFieldLikeControls';
import { getFormatPrefillValues, RATE_TYPES } from './utils/getFormatPrefillValues';

const setValues = ({ obj = {}, setValue = () => {} }) => {
	Object.entries(obj).forEach(([key, value]) => {
		setValue(key, value);
	});
};

const LIMIT_VALUE_UPTO = 2;
const DEFAULT_VALUE = 0;

function FillCustomerPortalData({
	setShowModal = () => {},
	shipmentData = {},
	invoice = {},
}) {
	const [customerObj, setCustomerObj] = useState({});
	const [termsAndConditions, setTermsAndConditions] = useState('');
	const [bankDetails, setBankDetails] = useState('');

	const controls = useMemo(() => Object.values(formControls).flat(), []);

	const { data } = useListShipmentTradePartners({
		defaultFilters: {
			shipment_id: shipmentData?.id,
		},
		defaultParams: {
			add_service_objects_required: true,
		},
	});
	const { entityList, loading: entityLoading } = useListCogoEntities();

	const { data: customData, loading: customLoading } = useGetShipmentFortigoTripDetail({
		defaultParams: {
			shipment_id            : shipmentData?.serial_id,
			invoice_combination_id : invoice?.id,

		},
	});

	const { loading, apiTrigger } = useCreateShipmentFortigoTripDetail();

	// const defaultValues = getFormatPrefillValues({ data, invoice, customerObj });

	const {
		formState: { errors },
		control,
		setValue,
		handleSubmit,
		watch,
	} = useForm({ defaultValues: {} });

	const watchCustomerName = watch('customer_name');
	const isFortigoCustomer = Object.values(GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping).includes(
		shipmentData?.importer_exporter_id,
	);
	const isFortigoInvoicingParty = Object.values(GLOBAL_CONSTANTS.others.fortigo_company_pan_mappings).includes(
		invoice?.billing_address?.registration_number,
	);
	const formValues = watch();

	const fieldsLikeControls = getFieldLikeControls({
		controls,
		shipmentData,
		setValue,
		setCustomerObj,
		customerObj,
		entityList,
		watch,
		isFortigoCustomer,
		isFortigoInvoicingParty,
	});

	const showElements = {
		cogo_entity_id:
			!!formValues?.business_mode
			&& !isFortigoCustomer
			&& !isFortigoInvoicingParty,
		cogo_entity_address_id:
			!!formValues?.business_mode
			&& !isFortigoCustomer
			&& !isFortigoInvoicingParty,
	};

	const basCharges =		formValues?.rate_type === RATE_TYPES.FIXED
		? +formValues.rate || DEFAULT_VALUE
		: (+formValues.rate || DEFAULT_VALUE) * (+formValues.charged_weight || DEFAULT_VALUE);

	const otherCharges = controls.reduce((acc, item) => {
		if (ADDITIONAL_CHARGE_KEYS.includes(item?.name)) {
			return acc + (+formValues[item.name] || DEFAULT_VALUE);
		}
		return acc;
	}, DEFAULT_VALUE);

	const totalCharges = basCharges + otherCharges;

	const onSubmit = (values) => {
		const payload = getFormatValue({
			values,
			terms_and_conditions   : termsAndConditions,
			bank_details           : bankDetails,
			shipment_id            : `${shipmentData?.serial_id}`,
			invoice_combination_id : invoice?.id,
		});
		apiTrigger(payload);
	};

	useEffect(() => {
		setValue('customer_id', companyToIdMap[watchCustomerName]);
	}, [watchCustomerName, setValue]);

	useEffect(() => {
		let obj = {};
		if (!isEmpty(customData) && !isEmpty(data)) {
			obj = getCustomPrefillValues({ finalControls: fieldsLikeControls, customData, data });
			setTermsAndConditions(customData?.terms_and_conditions);
			setBankDetails(customData?.bank_details);
		} else if (!isEmpty(data)) {
			obj = getFormatPrefillValues({ data, invoice, customerObj });
		}
		setValues({ obj, setValue });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, customData]);

	return (
		<Modal
			show
			closeOnOuterClick={false}
			showCloseIcon={false}
			size="xl"
		>
			<Modal.Header title="Fill Customer Portal Data" />
			<Modal.Body>
				<Layout
					control={control}
					fields={fieldsLikeControls}
					errors={errors}
					showElements={showElements}
				/>
				<div className={styles.extra}>
					Terms and Conditions
				</div>
				<RTEditor value={termsAndConditions} onChange={(val) => setTermsAndConditions(val)} />
				<div className={styles.extra}>
					Bank Details
				</div>
				<RTEditor value={bankDetails} onChange={(val) => setBankDetails(val)} />
			</Modal.Body>
			<Modal.Footer className={styles.footer}>
				<div>
					<sup style={{ color: '#EE3425' }}>*</sup>
					{' '}
					Details are mandatory to fill
				</div>

				<div className={styles.invoice_totals}>
					<div className={styles.total_live}>
						<div className={styles.head}>Live invoice total</div>
						<div className={styles.sub_head}>(without tax)</div>
						<div className={styles.total}>
							{invoice?.services
								?.[GLOBAL_CONSTANTS.zeroth_index]
								?.total_price_discounted?.toFixed(LIMIT_VALUE_UPTO)}
						</div>
					</div>
					<div className={styles.total_live}>
						<div className={styles.head}>This invoice total</div>
						<div className={styles.sub_head}>(without tax)</div>
						<div className={styles.total}>
							<span>{basCharges?.toFixed(LIMIT_VALUE_UPTO)}</span>
							{' '}
							+
							{' '}
							<span>{otherCharges}</span>
							{' '}
							=
							{' '}
							<span>{totalCharges?.toFixed(LIMIT_VALUE_UPTO)}</span>
						</div>
					</div>
				</div>

				<div className={styles.button_wrapper}>
					<Button
						onClick={() => setShowModal(false)}
						themeType="secondary"
						disabled={loading || entityLoading || customLoading}
						style={{ marginRight: '10px' }}
					>
						Cancel

					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={loading || entityLoading || customLoading}
					>
						Submit

					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default FillCustomerPortalData;
