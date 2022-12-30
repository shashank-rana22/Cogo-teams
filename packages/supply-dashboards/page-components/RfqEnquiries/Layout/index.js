import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

function Layout({ control, fields, showElements = {} }) {
	return (
		<div className={styles.layout}>
			<div className={styles.row}>
				{fields.map((fieldsItem) => {
					const { type } = fieldsItem;
					const show = !(fieldsItem.name in showElements) || showElements[fieldsItem.name];
					if (type === 'fieldArray' && show) {
						return (
							<FieldArray
								{...fieldsItem}
								control={control}
							/>
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
		</div>
	);
}
export default Layout;
