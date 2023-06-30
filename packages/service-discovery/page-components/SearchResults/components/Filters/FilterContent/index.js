import { Button, Accordion, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import getPrefillForm from '../../../utils/getPrefillForm';
import getLocationInfo from '../../../utils/locations-search';

import FilterItem from './FilterItem';
import getFilterControls, { MAIN_CONTROLS_MAPPING } from './getControls';
import styles from './styles.module.css';

const SERVICE_KEY = 'search_type';

function FilterContent({ data = {}, setShow, createSearch, createSearchLoading }) {
	const router = useRouter();

	const service_type = data[SERVICE_KEY];

	const controls = getFilterControls(data, SERVICE_KEY);

	const extraFilters = MAIN_CONTROLS_MAPPING[service_type].extraControls;

	const defaultValues = getPrefillForm(data, SERVICE_KEY, extraFilters);

	const { control, watch, formState: { errors }, handleSubmit, setValue } = useForm({ defaultValues });

	const editFormValues = watch();

	const {
		origin = {},
		destination = {},
	} = getLocationInfo(data, {}, SERVICE_KEY);

	const requiredParams = {
		organization_id        : data?.importer_exporter_id,
		organization_branch_id : data?.importer_exporter_branch_id,
		user_id                : data?.user_id,
		origin,
		destination,
	};

	const handleApply = async () => {
		if (!isEmpty(errors)) {
			return;
		}

		const hasChanges = JSON.stringify(editFormValues) !== JSON.stringify(defaultValues);

		if (!hasChanges) {
			Toast.info('No Changes Found');
			return;
		}

		const spot_search_id = await createSearch({
			action : 'edit',
			values : { service_type, ...requiredParams, formValues: editFormValues },
		});

		if (spot_search_id && typeof spot_search_id === 'string') {
			setShow(false);

			router.push(
				'/book/[spot_search_id]/[importer_exporter_id]',
				`/book/${spot_search_id}/${requiredParams.organization_id}`,
			);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{controls.map((controlItem) => {
					const { label: itemLabel, controls: itemControls } = controlItem;

					return (
						<div className={styles.filter_item} key={controlItem?.label}>
							<Accordion type="text" title={itemLabel} style={{ width: '100%' }}>

								<FilterItem
									controls={itemControls}
									control={control}
									watch={watch}
									errors={errors}
									handleSubmit={handleSubmit}
									setValue={setValue}
								/>
							</Accordion>
						</div>
					);
				})}
			</div>

			<div className={styles.button}>
				<Button
					type="button"
					size="xl"
					themeType="accent"
					className={styles.button}
					onClick={handleSubmit(handleApply)}
					loading={createSearchLoading}
				>
					Apply Filters
				</Button>
			</div>
		</div>
	);
}

export default FilterContent;
