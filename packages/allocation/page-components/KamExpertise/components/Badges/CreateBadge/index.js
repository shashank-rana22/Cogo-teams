import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import useCreateBadgeConfiguration from '../../../hooks/useCreateBadgeConfiguration';
import BadgeUpdateCard from '../BadgeUpdateCard';

import styles from './styles.module.css';

const MEDALS_MAPPING = ['Bronze', 'Silver', 'Gold'];

function CreateBadge(props) {
	const { setToggleScreen, badgeItemData = {}, listRefetch } = props;

	const {
		audits = [],
		created_by = {},
	} = badgeItemData;

	const {
		onSave, getFieldController, loading = false, getAddBadgesControls, formProps,
	} = useCreateBadgeConfiguration({ setToggleScreen, badgeItemData, listRefetch });

	const {
		control, watch, handleSubmit, formState: { errors },
	} = formProps;

	const updated_at = audits?.[0]?.created_at || null;

	return (
		<section className={styles.container}>
			{!isEmpty(badgeItemData)
				&& (
					<div className={styles.fields_container}>
						<p className={styles.text_styles}>
							Last Modified :
							{' '}
							{updated_at ? formatDate({
								date       : updated_at,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
								formatType : 'date',
							}) : '_'}
						</p>

						<p className={styles.text_styles}>
							Last Modified By :
							{' '}
							{created_by?.name}
						</p>
					</div>
				)}

			<h2 style={{ color: '#4f4f4f' }}>
				{isEmpty(badgeItemData) ? 'Add Badge' : 'Update Badge'}
			</h2>

			<p className={styles.text_styles2}>
				Select the conditions and number of completions necessary to obtain
				the badge.
			</p>

			<form onSubmit={handleSubmit(onSave)}>
				<section className={styles.badge_form_container}>

					{getAddBadgesControls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getFieldController(el.type);

						if (!Element) return null;

						return (
							<div className={styles.form_group}>
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
					<h3 style={{ color: '#4f4f4f' }}>Score and Image</h3>

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
								isLastItem={index === MEDALS_MAPPING.length - 1}
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
						Cancel
					</Button>

					<Button
						size="md"
						type="submit"
						themeType="primary"
						loading={loading}
					>
						Save
					</Button>
				</div>
			</form>
		</section>
	);
}

export default CreateBadge;
