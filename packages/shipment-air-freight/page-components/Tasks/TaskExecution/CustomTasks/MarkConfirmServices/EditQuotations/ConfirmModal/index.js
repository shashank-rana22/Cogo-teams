import { Button, Toast, Modal } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ConfirmModal({
	confirmModal,
	setConfirmModal,
	airServiceFormValues,
	airLocalServiceFormValues,
	handleSubmit,
	onCreate,
	reallocationFunc = () => {},
	confirmLoading,
	watchServiceProvider,
}) {
	const geo = getGeoConstants();
	const isCogoXpress =		watchServiceProvider?.normal_service_provider === geo.uuid.cogoxpress_id
		|| watchServiceProvider?.local_service_provider === geo.uuid.cogoxpress_id;

	const isAnyCarrier =		watchServiceProvider?.normal_airline === geo.uuid.any_carrier_airline_id
		|| watchServiceProvider?.local_airline === geo.uuid.any_carrier_airline_id;

	const handleFinalSubmit = async () => {
		if (isCogoXpress) {
			Toast.error('Please Select another Service Provider than CogoXpress');
		} else if (isAnyCarrier) {
			Toast.error('Please Select another Airline than Any Carrier');
		} else {
			handleSubmit(onCreate)();
			reallocationFunc();
		}
		setConfirmModal(false);
	};

	return (
		<>
			{' '}
			<Modal
				show={confirmModal}
				onClose={() => setConfirmModal(false)}
				className="secondary lg"
				position="secondary lg"
				onOuterClick={() => setConfirmModal(false)}
			>
				<div className={styles.main_container}>
					<div className={styles.header}>
						<IcMInfo width={24} height={24} fill="#CB6464" />

						<div className={styles.heading}>Please confirm your input</div>
					</div>
					<div className={styles.container}>
						<div className={styles.title}>For Air Freight</div>
						{airServiceFormValues?.airline_id && (
							<div className={styles.info}>
								<div className={styles.description}>
									<div className={styles.label}>Airline:</div>
									<div className={styles.controller}>
										<AsyncSelect
											name="airline_id"
											asyncKey="list_operators"
											value={airServiceFormValues.airline_id}
											placeholder="Select Partner User"
											disabled
											params={{
												filters: { operator_type: 'airline', status: 'active' },
											}}
										/>
									</div>
								</div>
							</div>
						)}
						<div className={styles.info}>
							<div className={styles.description}>
								<div className={styles.label}>Service Provider:</div>
								<div className={styles.controller}>
									<AsyncSelect
										name="service_provider_id"
										asyncKey="organizations"
										value={airServiceFormValues.service_provider_id}
										disabled
										placeholder="Select Partner User"
									/>
								</div>
							</div>
						</div>

						{airLocalServiceFormValues?.origin_airline_id && (
							<>
								<div className={styles.title}>For Air Freight Origin Local</div>
								<div className={styles.info}>
									<div className={styles.description}>
										<div className={styles.label}>Airline:</div>
										<div className={styles.controller}>
											<AsyncSelect
												name="local_airline_id"
												asyncKey="list_operators"
												value={airLocalServiceFormValues.origin_airline_id}
												placeholder="Select Partner User"
												disabled
												params={{
													filters: { operator_type: 'airline', status: 'active' },
												}}
											/>
										</div>
									</div>
								</div>
								<div className={styles.info}>
									<div className={styles.description}>
										<div className={styles.label}>Service Provider:</div>
										<div className={styles.controller}>
											<AsyncSelect
												name="local_service_provider_id"
												asyncKey="organizations"
												value={airLocalServiceFormValues.origin_service_provider_id}
												disabled
											/>
										</div>
									</div>
								</div>
							</>
						)}
						{airLocalServiceFormValues?.destination_airline_id && (
							<>
								<div className={styles.title}>For Air Freight Destination Local</div>
								<div className={styles.info}>
									<div className={styles.description}>
										<div className={styles.label}>Airline:</div>
										<div className={styles.controller}>
											<AsyncSelect
												name="local_airline_id"
												asyncKey="list_operators"
												value={airLocalServiceFormValues.destination_airline_id}
												placeholder="Select Partner User"
												disabled
												params={{
													filters: { operator_type: 'airline', status: 'active' },
												}}
											/>
										</div>
									</div>
								</div>
								<div className={styles.info}>
									<div className={styles.description}>
										<div className={styles.label}>Service Provider:</div>
										<div className={styles.controller}>
											<AsyncSelect
												name="local_service_provider_id"
												asyncKey="organizations"
												value={airLocalServiceFormValues.destination_service_provider_id}
												disabled
											/>
										</div>
									</div>
								</div>
							</>
						)}
						<div className={styles.button_div}>
							<div className={styles.button_head}>
								<Button
									onClick={() => {
										setConfirmModal(false);
									}}
									themeType="secondary"
								>
									Cancel
								</Button>
							</div>
							<Button
								onClick={() => {
									handleFinalSubmit();
								}}
								disabled={confirmLoading}
							>
								Confirm
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default ConfirmModal;
