import { Button } from '@cogoport/components';

import styles from './PostToSageModal/styles.module.css';

export const getFinalDetails = (sagePaymentInfo, platformPaymentInfo) => {
	const {
		sage_payment_num: sagePaymentNum = '',
		platform_payment_num: platformPaymentNumber = '',
		bpr_number: bprNumber = '',
		gl_code: glCode = '',
		currency = '',
		entity_code: entity = '',
		amount = 0,
		sage_status: sageStatus = '',
		organization_name: organizationName = '',
	} = sagePaymentInfo || {};

	const {
		sage_ref_number: sageRefNumber = '',
		organization_name: orgNamePlatform = '',
		payment_num_value: paymentNumValue = '',
		sage_organization_id: bprNumberPlatForm = '',
		acc_code: accCode = '',
		currency: currencyPlatform = '',
		entity_code: entityCodePlateform = '',
		amount: amountPlatform = 0,
		status: statusPlatform = '',
	} = platformPaymentInfo || {};
	return [
		{
			id   : 'SAGE',
			name : organizationName,
			sagePaymentNum,
			platformPaymentNumber,
			sageStatus,
			bprNumber,
			currency,
			glCode,
			entity,
			amount,
		},
		{
			id                    : 'Platform',
			name                  : orgNamePlatform,
			sagePaymentNum        : sageRefNumber,
			platformPaymentNumber : paymentNumValue,
			sageStatus            : statusPlatform,
			bprNumber             : bprNumberPlatForm,
			currency              : currencyPlatform,
			glCode                : accCode,
			entity                : entityCodePlateform,
			amount                : amountPlatform,
		},
	];
};

export const contentIsFinalPosted = (
	finalPostSageInfo,
	finalSageInfoDataLoading,
	paymentDocumentStatus,
) => (
	<div className={styles.final_container}>
		<Button
			themeType="accent"
			onClick={() => {
				finalPostSageInfo();
			}}
			disabled={finalSageInfoDataLoading}
			type="button"
		>
			{paymentDocumentStatus === 'FINAL_POSTED'
				? 'Information'
				: 'Final Post'}
		</Button>
	</div>
);

export const contentIsPosted = (
	GET_ENTITY,
	itemData,
	handlePermissionModal,
	entityType,
) => (
	<div className={styles.container}>
		<div
			className={styles.styled_text}
			role="presentation"
			onClick={() => handlePermissionModal(itemData, true)}
		>
			Delete
		</div>
		{GET_ENTITY.includes(entityType) && (
			<>
				<div className={styles.hr} />
				<div
					className={styles.styled_text}
					role="presentation"
					onClick={() => handlePermissionModal(itemData, false)}
				>
					Post
				</div>
			</>
		)}
	</div>
);

export const content = (
	accMode,
	itemData,
	handlePermissionModal,
	closePopover,
) => (
	<div className={styles.container}>
		{accMode === 'AR' && (
			<>
				<div
					className={styles.styled_text}
					role="presentation"
					onClick={closePopover}
				>
					Edit
				</div>

				<div className={styles.hr} />
			</>
		)}

		<div
			className={styles.styled_text}
			role="presentation"
			onClick={() => handlePermissionModal(itemData, true)}
		>
			Delete
		</div>

		<div className={styles.hr} />

		<div
			className={styles.styled_text}
			role="presentation"
			onClick={() => handlePermissionModal(itemData, false)}
		>
			Approve
		</div>
	</div>
);
