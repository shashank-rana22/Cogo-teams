import { Button } from '@cogoport/components';
import { getElementController } from '@/commons/form/utils/getElementController';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function FilterContent({
	controls = [],
	fields = {},
	reset = () => {},
	applyFilters = () => {},
	setOpen = () => {},
	setFilters = () => {},
}) {
	const { t } = useTranslation(['book']);
	const translationKey = 'book:searchResults_rates';

	const handleClick = () => {
		applyFilters();
		setOpen(false);
	};

	const handleReset = () => {
		reset();
		setFilters();
		setOpen(false);
	};

	const renderElement = () => {
		return controls.map((control) => {
			const Element = getElementController(control.type);

			return (
				<div
					key={control.name}
					className={`${styles.item} ${
						control.type === 'chips' ? styles.chips : ''
					}`}
				>
					<div className={styles.label}>{control.label}</div>
					<Element {...fields[control.name]} />
				</div>
			);
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>{renderElement()}</div>

			<div className={styles.btn_container}>
				<Button size="md" themeType="secondary" onClick={handleReset}>
					{t(`${translationKey}_83`)}
				</Button>

				<Button
					size="md"
					themeType="accent"
					onClick={handleClick}
					className={styles.apply_btn}
				>
					{t(`${translationKey}_82`)}
				</Button>
			</div>
		</div>
	);
}
export default FilterContent;
