import { Button, Tabs, TabPanel, cl } from '@cogoport/components';
import { IcMFsea, IcMFairport, IcMFland } from '@cogoport/icons-react';
import { useState } from 'react';

import getInsuranceControls from '../../configuration/insuranceControls';
import { getFieldController } from '../../helpers/getFieldController';
import useInsurance from '../../hooks/useInsurance';

import styles from './styles.module.css';

function Insurance({ organization = {}, src = '', formValues = {} }) {
	const [activeTab, setActiveTab] = useState('sea');

	const { formHook, loading, onSubmit, formValueRef } = useInsurance({
		activeTab,
		organization,
		formValues,
		setActiveTab,
	});
	const insuranceControls = getInsuranceControls({ activeTab });

	const { control, handleSubmit, formState:{ errors } } = formHook;

	return (
		<>
			<div className={styles.header}>
				<div>
					<h3>Select Service</h3>

					<Tabs
						activeTab={activeTab}
						themeType="tertiary"
						onChange={setActiveTab}
					>
						<TabPanel name="sea" title="Ocean" icon={<IcMFsea />} />
						<TabPanel name="air" title="Air" icon={<IcMFairport />} />
						<TabPanel name="road" title="Surface" icon={<IcMFland />} />
					</Tabs>
				</div>

			</div>

			<div className={styles.form_container}>
				{insuranceControls.map((config) => {
					const { name, type, label } = config || {};
					const Element = getFieldController(type);

					return (
						<div
							key={name}
							className={cl`${styles.col}
						${src === 'cargo_insurance' ? styles.new_col : ''}`}
						>
							<p>{label}</p>
							<Element
								{...config}
								control={control}
								onChange={(e, data) => { formValueRef.current[name] = data || e; }}
							/>
							<p className={styles.error}>{errors?.[name]?.message || errors?.[name]?.type}</p>
						</div>
					);
				})}
			</div>

			<div className={styles.footer}>
				<Button
					size="lg"
					loading={loading}
					themeType="accent"
					onClick={handleSubmit(onSubmit)}
				>
					Search Rates
				</Button>
			</div>
		</>
	);
}

export default Insurance;
