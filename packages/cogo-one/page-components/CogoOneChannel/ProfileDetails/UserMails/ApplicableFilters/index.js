import { cl, Button } from '@cogoport/components';

import { getFieldController } from '../../../../../utils/getFieldController';

import styles from './styles.module.css';

function ApplicableFilters({
	setShowPopover = () => {},
	FilterControls = [], control = {},
	isEmptyFilters = false,
	handleSubmit = () => {},
	handleApply = () => {},
	handleClearAll = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Filters
				</div>
				{!isEmptyFilters
					? (
						<div
							className={styles.clear_all}
							role="presentation"
							onClick={handleClearAll}
						>
							Clear All
						</div>
					) : null}
			</div>
			<div className={styles.body}>
				{FilterControls.map(
					(itm) => {
						const { name, label, controllerType } = itm;

						const Element = getFieldController(controllerType);

						if (!Element) {
							return null;
						}

						return (
							<div key={name}>
								<h4 className={styles.field_label}>
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
			<div className={cl`${styles.sticky_boxshadow_styles} ${styles.footer}`}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => setShowPopover(false)}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="accent"
					type="submit"
					onClick={handleSubmit(handleApply)}
				>
					Apply
				</Button>
			</div>
		</div>

	);
}

export default ApplicableFilters;
