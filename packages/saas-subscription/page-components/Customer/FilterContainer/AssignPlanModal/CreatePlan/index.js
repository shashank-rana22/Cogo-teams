import { Button, Modal, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import addonConfig from '../../../../../configuration/addonConfig';
import createPlanControl from '../../../../../configuration/createPlanControl';
import { planConfig } from '../../../../../configuration/planConfig';
import useCreatePlan from '../../../../../hooks/useCreatePlan';
import { getFieldController } from '../../../../../utils/getFieldController';

import Child from './Child';
import Pricing from './Pricing';
import styles from './styles.module.css';

function CreatePlan({ closeModal }) {
	const [defaultCurrency, setDefaultCurrency] = useState('');

	const [frequencyPeriod, setFrequencyPeriod] = useState('month');

	const [updatePricing, setUpdatePricing] = useState(
		planConfig(defaultCurrency),
	);

	const { createPlan, loading } = useCreatePlan({ closeModal });

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: {
			addons: [
				{
					product_id : '',
					count      : 0,
					discount   : 0,
				},
			],
		},
	});

	const getValue = ({ obj }) => {
		setDefaultCurrency(obj?.country?.currency_code);
	};

	const onSubmit = (value) => {
		const obj = { ...value, frequencyPeriod, pricings: updatePricing };
		createPlan(obj);
	};

	useEffect(() => {
		setUpdatePricing((prev) => prev.map((x) => ({ ...x, currency: defaultCurrency })));
	}, [defaultCurrency]);

	return (
		<form>
			<Modal.Body>
				<div className={styles.container}>
					{(createPlanControl || []).map((element) => {
						const { name, label, type } = element;
						if (type === 'pricing') {
							return (
								<div className={styles.content_body} key={name}>
									<h3>{startCase(name)}</h3>
									<div className={cl`${styles.card_header} ${styles.flex_box}`}>
										{element?.config?.map((config) => (
											<div
												key={config.key}
												className={styles.col}
												style={{ width: config?.width }}
											>
												{config?.title}
											</div>
										))}
									</div>
									{(updatePricing || [])?.map((item) => (
										<div
											key={item?.id}
											className={cl`${styles.flex_box} ${styles.item_row}`}
										>
											<Pricing
												configs={element?.config}
												item={item}
												setUpdatePricing={setUpdatePricing}
												setFrequencyPeriod={setFrequencyPeriod}
											/>
										</div>
									))}
								</div>
							);
						}
						if (type === 'fieldArray') {
							return (
								<Child
									key={name}
									name={name}
									control={control}
									element={element}
									addonConfig={addonConfig}
									errors={errors}
									getValues={getValues}
								/>
							);
						}
						const Element = getFieldController(type);
						return (
							<div key={name} className={styles.col}>
								<div className={styles.label_container}>
									<p className={styles.label}>{label}</p>
									{errors?.[name] && (
										<p className={styles.error}>
											{errors?.[name]?.message || errors?.[name]?.type}
										</p>
									)}
								</div>
								<Element
									control={control}
									{...element}
									onChange={(e, obj) => getValue({ e, obj })}
								/>
							</div>
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit(onSubmit)} loading={loading}>
					Create
				</Button>
			</Modal.Footer>
		</form>
	);
}
export default CreatePlan;
