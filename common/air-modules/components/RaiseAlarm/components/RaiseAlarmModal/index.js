import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext } from 'react';

import useCreateShipmentFaultAlarm from '../../../../hooks/useCreateShipmentFaultAlarm';
import useListServiceProviders from '../../../../hooks/useListServiceProviders';
import useListShipmentCollectionParty from '../../../../hooks/useListShipmentCollectionParty';
import useListStakeholders from '../../../../hooks/useListShipmentStakeholders';
import Layout from '../../../Layout';
import PurchaseInvoices from '../PurchaseInvoiceOption';
import ViewSelect from '../ViewSelect';

import styles from './styles.module.css';

const geo = getGeoConstants();

function RaiseAlarmModal({
	setShow = () => {},
	alarmId = '',
	setAlarmId = () => {},
}) {
	const { partner } = useSelector(({ profile }) => ({
		partner: profile?.partner,
	}));
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [checkedLineItem, setCheckedLineItem] = useState([]);
	const [checkedProforma, setCheckedProforma] = useState('');
	const [showBox, setShowBox] = useState(false);
	const [val, setVal] = useState('okam');

	const { data } = 	useListStakeholders({
		shipment_id      : shipment_data?.id,
		stakeholder_type : 'supply_agent',
	});

	const StakeHolderList = data?.list;

	const { loadingServiceProvider, serviceProviderList = [] } = useListServiceProviders({ id: shipment_data?.id });

	const handleClose = () => {
		setCheckedLineItem([]);
		setCheckedProforma('');
		setVal('okam');
	};

	const {
		loading,
		controls,
		control,
		finalShowElements,
		errors,
		onCreate,
		handleSubmit,
		setErrors,
		formValues,
		reset,
	} = useCreateShipmentFaultAlarm({
		setShow,
		shipment_data,
		checkedLineItem,
		checkedProforma,
		alarmId,
		setAlarmId,
		StakeHolderList,
		val,
		setVal,
		handleClose,
		loadingServiceProvider,
		serviceProviderList,
	});

	const allParams = { shipment_id: shipment_data?.id };

	const { list } = useListShipmentCollectionParty(allParams, formValues);

	const handleOnClose = () => {
		handleClose();
		reset();
		setShow(false);
		setErrors({});
	};

	let showAll = false;
	if (
		partner?.user_role_ids?.includes(geo.uuid.super_admin_id)
		|| partner?.user_role_ids?.includes(geo.uuid.admin_id)
	) {
		showAll = true;
	}

	const mappedData = formValues?.supplier
		? list?.data?.list?.filter(
			(item) => item?.service_provider_id === formValues?.supplier,
		)
		: [];

	const selectedInvoice = mappedData?.[GLOBAL_CONSTANTS.zeroth_index]?.collection_parties.filter(
		(item) => item?.id === checkedProforma,
	)?.[GLOBAL_CONSTANTS.zeroth_index];
	const RAISE_ALARM_MODAL_CONTROLS = [];
	controls.forEach((ctrl) => {
		const fieldName = ctrl.name;
		if (finalShowElements[fieldName]) {
			RAISE_ALARM_MODAL_CONTROLS.push(ctrl);
		}
	});

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.heading}>RAISE ALARM</div>

				{showAll && <ViewSelect value={val} setValue={setVal} />}

				<Layout
					fields={RAISE_ALARM_MODAL_CONTROLS}
					control={control}
					errors={errors}
				/>

				{formValues?.fraud_reason === 'irrelevant_charges-4' ? (
					<>
						<div className={styles.show_invoice}>Please select the purchase invoice</div>

						<div
							role="presentation"
							className={styles.box}
							onClick={() => setShowBox((prev) => !prev)}
						>
							{!isEmpty(selectedInvoice) && !isEmpty(checkedProforma) ? (
								<div>
									{selectedInvoice?.invoice_no
										|| selectedInvoice?.proforma_invoice_no}
								</div>
							) : (
								<div className={styles.purchase_invoice_heading}>
									Select Purchase Invoice
								</div>
							)}
							<IcMArrowRotateDown width={10} height={10} />
						</div>

						{showBox ? (
							<div className={styles.invoice_container}>
								<PurchaseInvoices
									mappedData={mappedData}
									setCheckedLineItem={setCheckedLineItem}
									checkedLineItem={checkedLineItem}
									setCheckedProforma={setCheckedProforma}
									checkedProforma={checkedProforma}
									setShowBox={setShowBox}
								/>
							</div>
						) : undefined}
					</>
				) : undefined}
			</div>

			<div className={styles.button_wrap}>
				<Button
					style={{ marginRight: '12px' }}
					onClick={() => handleOnClose()}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					onClick={handleSubmit(onCreate, setErrors, reset)}
				>
					{loading ? 'Raising Alarm...' : 'Raise Alarm'}
				</Button>
			</div>
		</div>
	);
}

export default RaiseAlarmModal;
