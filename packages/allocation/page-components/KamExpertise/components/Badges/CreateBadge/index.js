import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import useCreateBadgeConfiguration from '../../../hooks/useCreateBadgeConfiguration';
import BadgeUpdateCard from '../BadgeUpdateCard';

import styles from './styles.module.css';

const MEDALS_MAPPING = ['Bronze', 'Silver', 'Gold'];

const FIRST_INDEX = 1;

function CreateBadge(props) {
	const { t } = useTranslation(['allocation']);

	const { setToggleScreen, badgeItemData = {}, listRefetch } = props;

	const {
		audits = [],
		created_by = {},
	} = badgeItemData;

	const {
		onSave, getFieldController, loading = false, getAddBadgesControls, formProps,
	} = useCreateBadgeConfiguration({ setToggleScreen, badgeItemData, listRefetch, t });

	const {
		control, watch, handleSubmit, formState: { errors },
	} = formProps;

	const updated_at = audits?.[GLOBAL_CONSTANTS.zeroth_index]?.created_at || null;

	return (
		<section className={styles.container}>
			{!isEmpty(badgeItemData)
				&& (
					<div className={styles.fields_container}>
						<p className={styles.text_styles}>
							{t('allocation:last_modified_label')}
							{' '}
							:
							{' '}
							{updated_at ? formatDate({
								date       : updated_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
								formatType : 'date',
							}) : '_'}
						</p>

						<p className={styles.text_styles}>
							{t('allocation:last_modified_by_label')}
							{' '}
							:
							{' '}
							{created_by?.name}
						</p>
					</div>
				)}

			<h2 style={{ color: '#4f4f4f' }}>
				{isEmpty(badgeItemData) ? t('allocation:add_badge_label') : t('allocation:update_badge_label')}
			</h2>

			<p className={styles.text_styles2}>
				{t('allocation:create_mastery_phrase')}
			</p>

			<form onSubmit={handleSubmit(onSave)}>
				<section className={styles.badge_form_container}>

					{getAddBadgesControls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getFieldController(el.type);

						if (!Element) return null;

						return (
							<div key={el.name} className={styles.form_group}>
								<span className={styles.label}>{el.label}</span>

								<div className={styles.input_group}>
									<Element
										{...el}
										key={el.name}
										control={control}
										id={`${el.name}_input`}
										disabled={
												(!isEmpty(badgeItemData) && el.name === 'condition')
												|| (loading)
											}
									/>
								</div>

								<div className={styles.error_message}>
									{errors?.[el.name]?.message}
								</div>
							</div>
						);
					})}
				</section>

				<div className={styles.lower_background}>
					<h3 style={{ color: '#4f4f4f' }}>
						{t('allocation:score_and_image')}
					</h3>

					<div className={styles.display_flex}>
						{MEDALS_MAPPING.map((medalType, index) => (
							<BadgeUpdateCard
								key={medalType}
								medalType={medalType}
								badgeItemData={badgeItemData}
								control={control}
								loading={loading}
								errors={errors}
								watch={watch}
								isLastItem={index === MEDALS_MAPPING.length - FIRST_INDEX}
							/>
						))}
					</div>

				</div>

				<div className={styles.btncls}>
					<Button
						size="md"
						themeType="tertiary"
						style={{ marginRight: 10 }}
						disabled={loading}
						onClick={() => setToggleScreen('badge_details')}
					>
						{t('allocation:cancel_button')}
					</Button>

					<Button
						size="md"
						type="submit"
						themeType="primary"
						loading={loading}
					>
						{t('allocation:save_button')}
					</Button>
				</div>
			</form>
		</section>
	);
}

export default CreateBadge;
