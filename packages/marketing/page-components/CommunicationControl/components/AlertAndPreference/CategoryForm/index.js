import { Button, Checkbox, Loader } from '@cogoport/components';
import { CheckboxController, useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import defaultValuesHelper from '../../../helpers/defaultValuesHelper';
import getPayloadAlertsPreferences from '../../../helpers/getPayloadAlertsPreferences';
import selectAllAlertsHelper from '../../../helpers/selectAllAlertsHelper';

import Card from './Card';
import styles from './styles.module.css';

function CategoryForm({
	query = {}, handleSave = () => {}, data = {}, preferencesLoading = '', updateLoading = '',
}) {
	const [selectAllChecked, setSelectAllChecked] = useState(false);

	const { control, watch, setValue } = useForm({ defaultValues: defaultValuesHelper(data) });
	const formValues = watch();

	const preferences = getPayloadAlertsPreferences(formValues);

	const PAYLOAD = {
		organization_id: query?.company_id,
		preferences,
	};

	useEffect(() => {
		setSelectAllChecked(selectAllAlertsHelper(formValues));
	}, [formValues, data]);

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			setValue('offers_discounts', true);
			setValue('subscriber_special', true);
			setValue('new_product_service_launches_and_updates', true);
			setValue('product_service_explainers', true);
			setValue('newsletter', true);
			setValue('general_news', true);
		} else if (!e.target.checked) {
			setValue('offers_discounts', false);
			setValue('subscriber_special', false);
			setValue('new_product_service_launches_and_updates', false);
			setValue('product_service_explainers', false);
			setValue('newsletter', false);
			setValue('general_news', false);
		}
	};
	if (preferencesLoading) {
		return (<Loader themeType="primary" />);
	}

	return (
		<div className={styles.container}>
			<h3>Check the type of emails you want to receive</h3>
			{!preferencesLoading
				? (
					<>
						<Checkbox
							name="select_all"
							label="Select All"
							checked={selectAllChecked}
							onChange={(e) => {
								setSelectAllChecked((prev) => !prev);
								handleSelectAll(e);
							}}
						/>
						<div className={styles.categories}>
							<Card title="Promotional">
								<CheckboxController
									name="offers_discounts"
									label="Offers/Discounts"
									value={data?.offers_discounts === 'active'}
									control={control}
								/>
								Receive offers and discounts.
								<CheckboxController
									name="subscriber_special"
									label="Subscriber Special"
									value={data?.subscriber_special === 'active'}
									control={control}
								/>
								Receive exclusive subscriber communications.
							</Card>
							<Card title="Product and Services">
								<CheckboxController
									name="new_product_service_launches_and_updates"
									label="New product/Service launches and updates"
									value={data?.new_product_service_launches_and_updates === 'active'}
									control={control}
								/>
								Get information on latest product launches and updates.
								<CheckboxController
									name="product_service_explainers"
									label="Product/service Explainers"
									value={data?.product_service_explainers === 'active'}
									control={control}
								/>
								Receive detailed product explanations.
							</Card>
							<Card title="Subscriptions">
								<CheckboxController
									name="newsletter"
									label="Newsletter"
									value={data?.newsletter === 'active'}
									control={control}
								/>
								Get latest newsletters and services.
								<CheckboxController
									name="general_news"
									label="General News"
									value={data?.general_news === 'active'}
									control={control}
								/>
								Receive relevant news and information.
							</Card>
						</div>
						<Button
							className={styles.btn}
							onClick={() => handleSave(PAYLOAD)}
							disabled={updateLoading}
						>
							UPDATE EMAIL PREFERENCES
						</Button>
					</>
				) : null}
		</div>
	);
}

export default CategoryForm;
