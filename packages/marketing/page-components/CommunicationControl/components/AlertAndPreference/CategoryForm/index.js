import { Button, Checkbox, Loader } from '@cogoport/components';
import { CheckboxController, useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import defaultValuesHelper from '../../../helpers/defaultValuesHelper';
import getPayloadAlertsPreferences from '../../../helpers/getPayloadAlertsPreferences';
import selectAllAlertsHelper from '../../../helpers/selectAllAlertsHelper';
import useUpdatePreference from '../../../hooks/useUpdatePreference';

import Card from './Card';
import styles from './styles.module.css';

function CategoryForm({
	data = {}, preferencesLoading = '', user = '',
}) {
	const router = useRouter();
	const { query } = router || {};
	const refetch = router?.back;

	const [selectAllChecked, setSelectAllChecked] = useState(false);

	const { control, watch, setValue, handleSubmit } = useForm({ defaultValues: defaultValuesHelper(data) });
	const formValues = watch();

	const { updatePreference, loading:updateLoading } = useUpdatePreference({ refetch });

	const onSubmit = async (values) => {
		const preferences = getPayloadAlertsPreferences(values);
		await updatePreference({
			organization_id : query?.company_id,
			user_id         : user,
			preferences,
		});
	};

	useEffect(() => {
		setSelectAllChecked(selectAllAlertsHelper(formValues));
	}, [formValues, data]);

	const handleSelectAll = (e) => {
		const check = e.target.checked;
		setValue('offers_discounts', check);
		setValue('subscriber_special', check);
		setValue('new_product_service_launches_and_updates', check);
		setValue('product_service_explainers', check);
		setValue('newsletter', check);
		setValue('general_news', check);
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
								<div className={styles.description}>
									Receive offers and discounts.
								</div>
								<CheckboxController
									name="subscriber_special"
									label="Subscriber Special"
									value={data?.subscriber_special === 'active'}
									control={control}
								/>
								<div className={styles.description}>
									Receive exclusive subscriber communications.
								</div>
							</Card>
							<Card title="Product and Services">
								<CheckboxController
									name="new_product_service_launches_and_updates"
									label="New product/Service launches and updates"
									value={data?.new_product_service_launches_and_updates === 'active'}
									control={control}
								/>
								<div className={styles.description}>
									Get information on latest product launches and updates.
								</div>
								<CheckboxController
									name="product_service_explainers"
									label="Product/service Explainers"
									value={data?.product_service_explainers === 'active'}
									control={control}
								/>
								<div className={styles.description}>
									Receive detailed product explanations.
								</div>
							</Card>
							<Card title="Subscriptions">
								<CheckboxController
									name="newsletter"
									label="Newsletter"
									value={data?.newsletter === 'active'}
									control={control}
								/>
								<div className={styles.description}>
									Get latest newsletters and services.
								</div>
								<CheckboxController
									name="general_news"
									label="General News"
									value={data?.general_news === 'active'}
									control={control}
								/>
								<div className={styles.description}>
									Receive relevant news and information.
								</div>
							</Card>
						</div>
						<Button
							className={styles.btn}
							onClick={handleSubmit(onSubmit)}
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
