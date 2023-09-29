import { cl, Button, ButtonIcon } from '@cogoport/components';
import { useForm, useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import Item from './Item';
import styles from './styles.module.css';

function FeatureUpdate({ modalCloseHandler, featureInfo, loading = false, submitHandler }) {
	const { configs, formControls, defaultValue = {}, appendValue, name, title } = featureInfo;

	const { t } = useTranslation(['saasSubscription']);

	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
		watch,
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

	console.log(watch(), 'watch()', name);
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
									controls={formControls[GLOBAL_CONSTANTS.zeroth_index].controls}
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
						<Button type="button" themeType="link" onClick={appendHandler}>
							{t('saasSubscription:add')}
						</Button>
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
					{t('saasSubscription:cancel')}
				</Button>
				<Button
					type="button"
					themeType="accent"
					onClick={handleSubmit(submitHandler)}
					loading={loading}
				>
					{t('saasSubscription:save')}
				</Button>
			</div>
		</>
	);
}
export default FeatureUpdate;
