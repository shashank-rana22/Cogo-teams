import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Popover } from '@cogoport/components';
import { InputController, useForm } from '@cogoport/forms';
import useGetTrackingConsent from '../../../../hooks/useGetTrackingConsent';
import useUpdateFtlFreightServiceTracking from '../../../../hooks/useUpdateFtlFreightServiceTracking';
import styles from './styles.module.css';

const FtlTracker = ({
	serialId,
	data,
	servicesData = {},
	listShipments = () => {},
	refetch = () => {},
}) => {
	const [startTruckTracker, setStartTruckTracker] = useState(false);

	const mobileNumber = servicesData.driver_details?.contact;

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	const { consentLoading, getTrackingConsent, consentData } =
		useGetTrackingConsent({ mobileNumber });

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

	useEffect(() => {
		if (startTruckTracker) setValue('mobile_number', mobileNumber);
	}, [startTruckTracker, servicesData]);

	const content = (
		<div classname={styles.Content}>
			<InputController
				control={control}
				errors={errors}
				name='mobile_number'
				label= 'Enter Mobile Number for Tracking'
				placeholder= 'Enter Mobile Number'
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
					>
						Start Tracking
					</Button>
				</Popover>
			) : (
				<Button
					className="primary sm"
					style={{ marginLeft: 30, height: '40px' }}
					onClick={() => handleRefresh()}
				>
					Refresh
				</Button>
			)}
			<Tooltip
				content={
					!consentLoading && (
						<div>
							{consentData?.[0]?.result?.consent && (
								<div className={cl `${styles.Text} ${styles.status}`}>
									Status: {consentData?.[0].result?.consent}
								</div>
							)}
							{consentData?.[0]?.result?.consent_suggestion && (
								<div className={styles.SuggestionBox}>
									<div className={cl `${styles.Text} ${styles.status}`}>
										Suggestion : {consentData?.[0]?.result?.consent_suggestion}
									</div>
								</div>
							)}
						</div>
					)
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
					onClick={() => getTrackingConsent()}
				>
					Check Consent
				</Button>
			</Tooltip>
		</>
	);
};

export default FtlTracker;
