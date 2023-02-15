import { Button } from '@cogoport/components';

import { getFieldController } from '../Form/Controlled';

import styles from './styles.module.css';

function FilterContent({
	heading,
	controls = [],
	reset = () => {},
	applyFilters = () => {},
	setOpen = () => {},
	formProps = {},
}) {
	const { control: formControls } = formProps;

	const handleClick = () => {
		applyFilters();
		setOpen(false);
	};

	const handleReset = () => {
		reset();
		setOpen(false);
	};

	const renderElement = () => controls.map((control) => {
		const Element = getFieldController(control.type) || null;

		if (!Element) return null;

		return (
			<div className={styles.field_container}>
				<span className={styles.label}>{control.label}</span>

				<Element {...control} control={formControls} key={control.name} id={`${control.name}_input`} />
			</div>
		);
	});

	return (
		<section>
			<div className={styles.header}>
				<div className={styles.heading}>{heading}</div>

				<div className={styles.button_container}>
					<Button themeType="secondary" size="sm" onClick={() => handleReset()}>RESET</Button>

					<Button
						themeType="accent"
						size="sm"
						onClick={() => handleClick()}
						style={{
							marginLeft: '10px',
						}}
					>
						SHOW RESULTS
					</Button>
				</div>
			</div>

			{renderElement()}
		</section>
	);
}

export default FilterContent;
