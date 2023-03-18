import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import CreateNew from '../ServiceDetails/CreateNew';
import Header from '../ServiceDetails/Header';
import Status from '../ServiceDetails/Status';

import AddedServiceComponent from './AddedServiceComponent';
import styles from './styles.module.css';

function MutipleSimilarServices({
	serviceList = [],
	shipmentData = {},
	isSeller = false,
	isMain = false,
	similarServices = {},
	refetchServices = () => {},
	refetchList = () => {},
}) {
	const {
		id = '',
		state = '',
		service_provider = '',
		service_type = '',
		service_supply_agent,
		payment_term,
	} = similarServices.services[0];

	const toBeDisplayed = [];

	similarServices?.services?.map((obj) => {
		const dontPush = (toBeDisplayed || []).filter((ele) => ele?.id === obj?.id);
		return !dontPush?.length ? toBeDisplayed.push(obj) : null;
	});

	if (similarServices?.services?.[0]?.service_type === 'ltl_freight_service') {
		toBeDisplayed.splice(-2);
	}

	const addedServiceComponent = () => (
		<div className={cl`${styles.container} ${state}`}>
			<Header
				service_type={service_type}
				id={id}
				refetchServices={refetchServices}
				refetchList={refetchList}
				serviceData={similarServices?.services}
				state={state}
				heading={similarServices?.routeLeg?.display}
				service_supply_agent={service_supply_agent}
				serviceList={serviceList}
				shipmentData={shipmentData}
				isSeller={isSeller}
				service_provider={service_provider}
			/>

			<Status state={state} payment_term={payment_term} />

			{(toBeDisplayed || []).map((service, index) => (
				<div
					className={cl`${similarServices?.length === index + 1 ? styles.last : styles.other}`}
				>
					<AddedServiceComponent
						allSimilar={toBeDisplayed?.length}
						refetchServices={refetchServices}
						serviceData={service}
						serviceList={serviceList}
						shipmentData={shipmentData}
						isSeller={isSeller}
						isMain={isMain}
						routeLeg={similarServices.routeLeg}
					/>
				</div>
			))}
		</div>
	);

	if ((isMain && !isEmpty(id)) || state) {
		return addedServiceComponent();
	}

	return (
		<CreateNew
			routeLeg={similarServices.routeLeg}
			serviceList={serviceList}
			shipment_data={shipmentData}
		/>
	);
}

export default MutipleSimilarServices;
