import { Button } from '@cogoport/components';
import {
	InputController,
	MultiselectController,
	SelectController,
	RadioGroupController,
	useForm,
} from '@cogoport/forms';

const ELEMENT_CONTROLLER_MAPPING = {
	text        : InputController,
	select      : SelectController,
	multiSelect : MultiselectController,
	radioGroup  : RadioGroupController,
};

function FilterContent({
	heading,
	controls = [],
	reset = () => {},
	applyFilters = () => {},
	setOpen = () => {},
}) {
	const { control: formControls } = useForm();

	const handleClick = () => {
		applyFilters();
		setOpen(false);
	};

	const handleReset = () => {
		reset();
		setOpen(false);
	};

	const renderElement = () => controls.map((control) => {
		const Element = ELEMENT_CONTROLLER_MAPPING[control.type] || null;

		if (!Element) return null;

		return (
			<div>
				<span>{control.label}</span>

				<Element {...control} control={formControls} key={control.name} id={`${control.name}_input`} />
			</div>
		);
	});

	return (
		<section>
			<div>
				<p>{heading}</p>

				<div>
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
