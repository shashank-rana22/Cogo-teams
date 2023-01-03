import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

function Layout({ control, fields, showElements = {} }) {
	let rowWiseFields = [];
	const totalFields = [];
	let span = 0;
	fields.forEach((field) => {
		if (!(field.name in showElements)) {
			span += field.span || 12;
			if (span === 12) {
				rowWiseFields.push(field);
				totalFields.push(rowWiseFields);
				rowWiseFields = [];
				span = 0;
			} else if (span < 12) {
				rowWiseFields.push(field);
			} else {
				totalFields.push(rowWiseFields);
				rowWiseFields = [];
				rowWiseFields.push(field);
				span = field.span;
			}
		}
	});
	if (rowWiseFields.length) {
		totalFields.push(rowWiseFields);
	}
	return (
		<div className={styles.layout}>
			{totalFields.map((field) => (
				<div className={styles.row}>
					{field.map((fieldsItem) => {
						const { type, heading = '' } = fieldsItem;
						const show = !(fieldsItem.name in showElements) || showElements[fieldsItem.name];
						if (type === 'fieldArray' && show) {
							return (
								<>
									<div style={styles.heading}>{heading}</div>
									<FieldArray
										{...fieldsItem}
										control={control}
									/>
								</>
							);
						}
						return show
							? (
								<Item
									control={control}
									{...fieldsItem}
								/>

							)
							: null;
					})}
				</div>
			))}
		</div>
	);
}
export default Layout;
