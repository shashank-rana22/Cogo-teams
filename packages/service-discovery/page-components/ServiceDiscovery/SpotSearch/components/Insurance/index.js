import { Button, Tabs, TabPanel } from '@cogoport/components';
import { IcMFsea, IcMFairport, IcMFland } from '@cogoport/icons-react';
import { useState } from 'react';

import { getFieldController } from '../../../../../helpers/getFieldController';
import getInsuranceControls from '../../configurations/insuranceControls';
import useInsurance from '../../hooks/useInurance';

import styles from './styles.module.css';

function Insurance({ organization = {} }) {
	const [activeTab, setActiveTab] = useState('ocean');

	const { formHook, onSubmit, formValueRef } = useInsurance({ activeTab, organization });
	const insuranceControls = getInsuranceControls({ activeTab });

	const { control, handleSubmit, formState:{ errors } } = formHook;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
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

			<div className={styles.form_container}>
				{insuranceControls.map((config) => {
					const { name, type, label } = config || {};
					const Element = getFieldController(type);

					return (
						<div key={name} className={styles.col}>
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
		</div>
	);
}

export default Insurance;
