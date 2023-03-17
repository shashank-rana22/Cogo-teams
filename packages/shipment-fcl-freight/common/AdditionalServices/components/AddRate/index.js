// import Layout from '@cogoport/bookings/commons/Layout';
import { Flex, Accordion } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

// import ManageServices from '../../../commons/ManageServices';

import ActionsToShow from './ActionToShow';
import AddIp from './AddIp';
import BillToCustomer from './BillToCustomer';
import SecondStep from './SecondStep';
import styles from './styles.module.css';
import useAddRate from './useAddRate';
import useServiceUpdate from './useServiceUpdate';

const showRemarksStatus = [
	'amendment_requested_by_importer_exporter',
	'requested_for_service_provider',
	'cancelled_by_supplier',
	'cancelled',
	'disputed',
];

function AddRate({
	item,
	isSeller = false,
	setAddRate,
	status,
	setShow,
	refetch,
	showLabel = true,
	shipment_data,
	onCancel = () => {},
	showIp,
	setShowIp = () => {},
	filters,
}) {
	const [billToCustomer, setBillToCustomer] = useState(undefined);
	const [showSecondStep, setSecondStep] = useState(false);

	const { addRate, fields, controls, handleSubmit, loading, errors } = useAddRate({
		item,
		isSeller,
		status,
		setShow,
		refetch,
		setAddRate,
		billToCustomer,
		onCancel,
		filters,
	});

	const updateDatas = useServiceUpdate({
		item,
		setAddRate,
		refetch,
		showIp,
		onCancel,
		setShowIp,
	});

	if (showSecondStep) {
		return (
			<SecondStep
				item={item}
				status={status}
				isSeller={isSeller}
				setSecondStep={setSecondStep}
				updateDatas={updateDatas}
			/>
		);
	}

	if (
		status?.status === 'charges_incurred'
		&& !billToCustomer
		&& item.add_to_sell_quotation === null
	) {
		return (
			<BillToCustomer
				updateDatas={updateDatas}
				onCancel={() => setAddRate(null)}
				onBillToCustomer={() => setBillToCustomer(true)}
			/>
		);
	}

	if (showIp) {
		return (
			<AddIp
				shipment_data={shipment_data}
				handleInvoicingParty={updateDatas?.handleInvoicingParty}
			/>
		);
	}
	return (
		<div>
			<div className={styles.container}>
				<Accordion
					title={(
						<Flex alignItems="center">
							<ContainerHeader>
								{startCase(item.name)}
								{' '}
								(
								{startCase(item.service_type)}
								)
							</ContainerHeader>

							{showLabel && item?.tags ? (
								<CustomTag>{startCase(item?.tags?.[0])}</CustomTag>
							) : null}
						</Flex>
					)}
					showLabel={showLabel}
					defaultOpen
				>
					<Content>
						{showRemarksStatus.includes(status?.status) ? (
							<p>
								Comments:
								{item.remarks[0]}
							</p>
						) : null}

						{/* <Layout fields={fields} controls={controls} errors={errors} /> */}
					</Content>
				</Accordion>
			</div>

			<ActionsToShow
				setAddRate={setAddRate}
				addRate={addRate}
				handleSubmit={handleSubmit}
				status={status}
				setSecondStep={setSecondStep}
				updateDatas={updateDatas}
				loading={loading || updateDatas.loading}
				onCancel={() => onCancel()}
			/>
		</div>
	);
}

export default AddRate;
