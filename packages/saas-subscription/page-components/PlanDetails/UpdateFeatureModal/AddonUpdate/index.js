import { cl, Button, ButtonIcon } from '@cogoport/components';
import { useForm, useFieldArray } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';

import addonConfig from '../../../../configuration/addonConfig';
import updateAddonControl from '../../../../configuration/updateAddonControl';

import Item from './Item';
import styles from './styles.module.css';

function AddonUpdate({ modalCloseHandler }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			updateAddon: [{
				addonName : 'as',
				count     : 10,
				discount  : 10,
			}],
		},
	});

	const { fields, remove, append } = useFieldArray({
		name: 'updateAddon',
		control,
	});

	const appendHandler = () => {
		append({
			addonName : '',
			count     : '',
			discount  : '',
		});
	};

	const submitHandler = (data) => {
		console.log(data, 'data');
	};

	return (
		<>
			<div className={cl`${styles.container} ${styles.header}`}>
				<h3>Add More Add-ons</h3>
				<ButtonIcon size="md" icon={<IcMCross />} themeType="primary" onClick={modalCloseHandler} />
			</div>
			<div className={styles.content_body}>
				<div className={styles.table}>
					<div className={cl`${styles.card_header} ${styles.flex_box}`}>
						{addonConfig.map((config) => (
							<div
								key={config?.key}
								className={cl`${styles.col} ${styles?.[config.key]}`}
							>
								{config?.title}
							</div>
						))}
					</div>
					{(fields || []).map((field, index) => (
						<div key={field?.id} className={cl`${styles.flex_box} ${styles.item_row}`}>
							<Item
								info={field}
								control={control}
								controls={updateAddonControl[0].controls}
								remove={remove}
								errors={errors}
								fields={fields}
								index={index}
							/>
						</div>
					))}
					<Button themeType="linkUi" onClick={appendHandler}>Add</Button>
				</div>
			</div>
			<div className={cl`${styles.container} ${styles.footer}`}>
				<Button type="submit" themeType="secondary" onClick={modalCloseHandler}>Cancel</Button>
				<Button type="submit" themeType="accent" onClick={handleSubmit(submitHandler)}>Save</Button>
			</div>
		</>
	);
}
export default AddonUpdate;
