import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import MAIL_FILTERS from '../../../../configurations/mail-filters';
import getFiltersCount from '../../../../helpers/getFiltersCount';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function PopoverComponent({
	searchQuery = '',
	appliedFilters = {},
	setAppliedFilters = () => {},
	setShowPopover = () => {},
}) {
	const {
		control,
		watch = () => {},
		handleSubmit = () => {},
		reset = () => {},
	} = useForm({ defaultValues: appliedFilters });

	const formValues = watch();

	const noOfFilters = getFiltersCount({ filters: formValues || {} });

	const handleClearAll = () => {
		const nullFormValues = MAIL_FILTERS.reduce(
			(prev, currentItem) => (
				{ ...prev, [currentItem?.name]: '' }
			),
			{},
		);

		reset(nullFormValues);
	};

	const handleCancel = () => {
		setShowPopover(false);
		reset(appliedFilters);
	};

	const handleApplyFilters = (val) => {
		setAppliedFilters(val);
		setShowPopover(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.title}>
					Filters
					{noOfFilters ? ` (${noOfFilters})` : ''}
				</h3>

				<Button
					size="md"
					themeType="tertiary"
					onClick={handleClearAll}
				>
					Clear All
				</Button>
			</div>

			<div className={styles.filter_body}>

				<div className={styles.note_container}>
					Note:
					<span>Filters and search can&apos;t be used together.</span>
				</div>

				{MAIL_FILTERS.map(
					(itm) => {
						const { name, label, controlType } = itm;

						const Element = getFieldController(controlType);

						if (!Element) {
							return null;
						}

						return (
							<div key={name}>
								<h4 className={styles.title}>
									{label}
								</h4>
								<Element
									control={control}
									{...itm}
								/>
							</div>
						);
					},
				)}
			</div>

			<div className={styles.footer}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="accent"
					disabled={!!searchQuery}
					onClick={handleSubmit(handleApplyFilters)}
				>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default PopoverComponent;
