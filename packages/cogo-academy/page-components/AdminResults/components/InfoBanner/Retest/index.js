import getControls from './controls';
import Item from './Item';

function Retest({ control, formvalues, errors }) {
	const controls = getControls({ control, formvalues });

	return (
		<div>
			{(controls || []).map((controlItem) => {
				const { show = true, name } = controlItem;

				if (!show) {
					return null;
				}

				return (
					<Item
						{...controlItem}
						key={name}
						control={control}
						error={errors[controlItem?.name]}
					/>
				);
			})}
		</div>
	);
}

export default Retest;
