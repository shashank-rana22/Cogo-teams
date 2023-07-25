import { Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';

import getControls from '../../../configurations/filter-controls';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function Content() {
	const formProps = useForm();
	const { control, handleSubmit } = formProps;
	const controls = getControls();

	const applyFilters = (value) => {
		console.log('value::', value);
	};

	return (
		<div>
			{controls.map((controlItem) => {
				const el = { ...controlItem };
				const Element = getFieldController(el.type);

				if (!Element) return null;

				return (
					<div
						className={styles.controls}
						key={controlItem.name}
					>
						{el.label && <div className={styles.label}>{el.label}</div>}
						<Element
							{...el}
							size="sm"
							key={el.name}
							control={control}
						/>
					</div>
				);
			})}
			<div className={styles.apply}>
				<Button size="md" themeType="accent" onClick={handleSubmit(applyFilters)}>Apply Filter</Button>
			</div>
		</div>
	);
}

function Filters() {
	// const [filters, setFilters] = useState();

	return (
		<Popover
			theme="light"
			interactive
			placement="bottom"
			render="bottom"
			content={<Content />}
		>
			<div className={styles.filters}>
				<IcMFilter />
				<div className={styles.filter_title}>Filters</div>
			</div>
		</Popover>
	);
}

export default Filters;
