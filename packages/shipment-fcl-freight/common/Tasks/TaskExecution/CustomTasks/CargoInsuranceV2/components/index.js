// import FormFields from './FormFields';
import styles from './styles.module.css';

function CargoInsurance() {
	return (
		<div className={styles.container}>
			{/* <div className={styles.flex_box}>
				<div style={{ width: '65%' }}>
					<Address
						billingType={billingType}
						setBillingType={setBillingType}
						orgId={draftData?.organizationId}
						preSelectedAddress={metadata?.selectedAddress}
						ref={(r) => { formRef.current.address = r; }}
					/>

					<div className={styles.form_container}>
						<p className={styles.form_title}>{t('cargoInsurance:form_field_title_1')}</p>
						<div className={styles.form_elements}>
							<FormItem controls={controls} formhook={formHook} />
						</div>
					</div>
				</div>

				<SideBar {...draftData} />
			</div>

			<FormFields formHook={formHook} billingType={billingType} {...draftData} /> */}

		</div>
	);
}

export default CargoInsurance;
