import { Button, Tooltip, Popover, cl } from '@cogoport/components';
import { InputController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetTrackingConsent from '../../../../hooks/useGetTrackingConsent';
import useUpdateFtlFreightServiceTracking from '../../../../hooks/useUpdateFtlFreightServiceTracking';

import styles from './styles.module.css';

const DISABLED_STATE = ['cargo_dropped', 'completed', 'aborted', 'cancelled'];
const CONSENT_INDEX = GLOBAL_CONSTANTS.zeroth_index;

function Content({
	control,
	errors,
	handleSubmit = () => {},
	onSubmit = () => {},
	setStartTruckTracker = () => {},
	reset = () => {},
	loading = false,
}) {
	return (
		<div className={styles.Content}>
			<InputController
				control={control}
				errors={errors}
				name="mobile_number"
				label="Enter Mobile Number for Tracking"
				placeholder="Enter Mobile Number"
				disabled
				themeType="admin"
			/>
			<div className={styles.ButtonDiv}>
				<Button
					onClick={() => {
						setStartTruckTracker(false);
						reset();
					}}
					className="secondary md"
					style={{ marginRight: 10 }}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
					className="primary md"
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

function FtlTracker({
	trackingLoading,
	serialId,
	data,
	servicesData = {},
	listShipments = () => {},
	refetch = () => {},
}) {
	const [startTruckTracker, setStartTruckTracker] = useState(false);

	const mobileNumber = servicesData.driver_details?.contact;

	const errorMsg = `Truck is in ${startCase(servicesData.state)} state`;

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	const { consentLoading, getTrackingConsent, consentData } =	useGetTrackingConsent({ mobileNumber });

	const { loading, updateService } = useUpdateFtlFreightServiceTracking();

	const onSubmit = (values) => {
		updateService({
			values,
			setStartTruckTracker,
			refetch,
			listShipments,
			servicesData,
			serialId,
		});
	};

	const handleRefresh = () => {
		updateService({
			refresh: true,
			listShipments,
			servicesData,
			serialId,
		});
	};

	const disabledButton = DISABLED_STATE.includes(servicesData.state);

	useEffect(() => {
		if (startTruckTracker) {
			setValue(
				'mobile_number',
				mobileNumber ? Number(mobileNumber) : undefined,
			);
		}
	}, [startTruckTracker, servicesData, mobileNumber, setValue]);

	const content = Content({ control, errors, handleSubmit, onSubmit, setStartTruckTracker, reset, loading });

	return (
		<>
			{!data?.track_exist ? (
				<Popover
					theme="light-border"
					animation="shift-away"
					content={content}
					visible={startTruckTracker}
					interactive
				>
					<Button
						className="primary sm"
						style={{ marginLeft: 30, height: '40px' }}
						onClick={() => setStartTruckTracker(!startTruckTracker)}
						disabled={disabledButton}
						title={disabledButton ? errorMsg : ''}
					>
						Start Tracking
					</Button>
				</Popover>
			) : (
				<Button
					className="primary sm"
					style={{ marginLeft: 30, height: '40px' }}
					onClick={() => handleRefresh()}
					disabled={disabledButton || loading || trackingLoading}
					title={disabledButton ? errorMsg : ''}
				>
					Refresh
				</Button>
			)}
			<Tooltip
				content={
					(!consentLoading && (
						<div>
							{consentData?.[CONSENT_INDEX]?.result?.consent && (
								<div className={cl`${styles.Text} ${styles.status}`}>
									Status:
									{' '}
									{consentData?.[CONSENT_INDEX].result?.consent}
								</div>
							)}
							{consentData?.[CONSENT_INDEX]?.result?.consent_suggestion && (
								<div className={styles.SuggestionBox}>
									<div className={cl`${styles.Text} ${styles.status}`}>
										Suggestion :
										{' '}
										{consentData?.[CONSENT_INDEX]?.result?.consent_suggestion}
									</div>
								</div>
							)}
						</div>
					))
				}
				onClick
				animation="shift-away"
				placement="top"
				theme="dark"
				interactive
				className="tool-tip-style"
			>
				<Button
					className="primary sm"
					style={{ marginLeft: 30, height: '40px' }}
					disabled
					onClick={() => getTrackingConsent()}
				>
					Check Consent
				</Button>
			</Tooltip>
		</>
	);
}

export default FtlTracker;
