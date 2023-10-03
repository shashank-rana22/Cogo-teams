import { Button, Tabs, TabPanel, cl } from '@cogoport/components';
import { IcMFsea, IcMFairport, IcMFland, IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import getInsuranceControls from '../../configuration/insuranceControls';
import { getFieldController } from '../../helpers/getFieldController';
import useInsurance from '../../hooks/useInsurance';

import styles from './styles.module.css';

function Insurance({ organization = {}, src = '', showFormFn = () => {} }) {
	const [activeTab, setActiveTab] = useState('ocean');

	const { formHook, onSubmit, formValueRef } = useInsurance({ activeTab, organization });
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
						<TabPanel name="ocean" title="Ocean" icon={<IcMFsea />} />
						<TabPanel name="air" title="Air" icon={<IcMFairport />} />
						<TabPanel name="surface" title="Surface" icon={<IcMFland />} />
					</Tabs>
				</div>
				{src === 'cargo_insurance' ? (
					<div className={styles.close_icon} role="presentation" onClick={() => showFormFn(false)}>
						<IcMCross />
					</div>
				) : null}
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
				<Button size="lg" themeType="accent" onClick={handleSubmit(onSubmit)}>Search Rates</Button>
			</div>
		</>
	);
}

export default Insurance;
