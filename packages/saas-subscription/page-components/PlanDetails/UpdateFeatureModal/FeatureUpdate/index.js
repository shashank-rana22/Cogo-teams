import { cl, Button, ButtonIcon } from '@cogoport/components';
import { useForm, useFieldArray } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';

import Item from './Item';
import styles from './styles.module.css';

function FeatureUpdate({ modalCloseHandler, featureInfo, loading = false, submitHandler }) {
	const { configs, formControls, defaultValue = {}, appendValue, name, title } = featureInfo;

	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: defaultValue,
	});

	const { fields, remove, append } = useFieldArray({
		name,
		control,
	});

	const appendHandler = () => {
		append(appendValue);
	};

	return (
		<>
			<div className={cl`${styles.container} ${styles.header}`}>
				<h3>{title}</h3>
				<ButtonIcon
					size="md"
					icon={<IcMCross />}
					themeType="primary"
					onClick={() => modalCloseHandler(false)}
				/>
			</div>
			<div className={styles.content_body}>
				<div className={styles.table}>
					<div className={cl`${styles.card_header} ${styles.flex_box}`}>
						{configs.map((config) => (
							<div
								key={config?.key}
								style={{ width: name === 'updatePlanFeature' ? config?.width : '' }}
								className={cl`${styles.col} ${styles?.[config.key]}`}
							>
								{config?.title}
							</div>
						))}
					</div>
					<div className={styles.scroll_container}>
						{(fields || []).map((field, index) => (
							<div key={field?.id} className={cl`${styles.flex_box} ${styles.item_row}`}>
								<Item
									info={field}
									control={control}
									controls={formControls[0].controls}
									remove={remove}
									errors={errors}
									fields={fields}
									index={index}
									getValues={getValues}
								/>
							</div>
						))}
					</div>
					<div className={styles.add_btn_container}>
						<Button type="button" themeType="link" onClick={appendHandler}>Add</Button>
					</div>
				</div>
			</div>
			<div className={cl`${styles.container} ${styles.footer}`}>
				<Button
					type="button"
					themeType="secondary"
					className={styles.canceBtn}
					onClick={() => modalCloseHandler(false)}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					type="button"
					themeType="accent"
					onClick={handleSubmit(submitHandler)}
					loading={loading}
				>
					Save
				</Button>
			</div>
		</>
	);
}
export default FeatureUpdate;
