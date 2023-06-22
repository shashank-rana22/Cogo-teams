import { cl, Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import Item from './Item';
import styles from './styles.module.css';

function Child({ name, control, element, addonConfig, errors, getValues }) {
	const { fields, remove, append } = useFieldArray({
		name,
		control,
	});
	const appendHandler = () => {
		append(element.value);
	};
	return (
		<div key={name} className={styles.content_body}>
			<h3>{startCase(name)}</h3>
			<div className={styles.table}>
				<div className={cl`${styles.card_header} ${styles.flex_box}`}>
					{addonConfig.map((config) => (
						<div
							key={config?.key}
							style={{
								width: name === 'updatePlanFeature' ? config?.width : '',
							}}
							className={cl`${styles.col} ${styles?.[config.key]}`}
						>
							{config?.title}
						</div>
					))}
				</div>
				<div className={styles.scroll_container}>
					{(fields || []).map((field, index) => (
						<div
							key={field?.id}
							className={cl`${styles.flex_box} ${styles.item_row}`}
						>
							<Item
								info={field}
								control={control}
								controls={element.controls}
								remove={remove}
								errors={errors?.addons}
								fields={fields}
								index={index}
								getValues={getValues}
							/>
						</div>
					))}
				</div>
				<div className={styles.add_btn_container}>
					<Button
						type="button"
						themeType="link"
						onClick={appendHandler}
					>
						Add
					</Button>
				</div>
			</div>
		</div>
	);
}
export default Child;
