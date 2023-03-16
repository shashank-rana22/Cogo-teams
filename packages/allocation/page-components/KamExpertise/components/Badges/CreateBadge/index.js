import { Button } from '@cogoport/components';
import { format, isEmpty } from '@cogoport/utils';

import useCreateBadgeConfiguration from '../../../hooks/useCreateBadgeConfiguration';
import GetCard from '../BadgeUpdateCard';

import styles from './styles.module.css';

const MEDALS_MAPPING = [
	{
		medalType        : 'Bronze',
		inputPlaceHolder : '2000',
	},
	{
		medalType        : 'Silver',
		inputPlaceHolder : '5000',
	},
	{
		medalType        : 'Gold',
		inputPlaceHolder : '9000',
	},
];

function CreateBadge({ setToggleScreen, badgeListData = {}, listRefetch }) {
	const onClose = () => {
		setToggleScreen('badge_details');
	};

	const {
		onSave, getFieldController, loading = false, getAddBadgesControls, formProps,
	} = useCreateBadgeConfiguration({ onClose, badgeListData, listRefetch });

	const {
		control, watch, handleSubmit, formState: { errors },
	} = formProps;

	return (
		<div>
			<section className={styles.container}>
				{!isEmpty(badgeListData)
				&& (
					<div className={styles.fields_container}>
						<p className={styles.text_styles}>
							Last Modified :
							{' '}
							{format(badgeListData.updated_at, 'yyyy-MMM-dd')}
						</p>

						{/* <p className={styles.text_styles}>
							Last Modified By :
							{` ${badgeListData.lstModifiedBy}`}
						</p> */}
					</div>
				)}
				{/* <p className={styles.text_styles}>
					{index}
				</p> */}

				<h2 style={{ color: '#4f4f4f', marginTop: 28 }}>
					{isEmpty(badgeListData) ? 'Add Badge' : 'Update Badge'}
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
											disabled={!isEmpty(badgeListData) && el.name === 'condition'}
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
							{MEDALS_MAPPING.map((data, index) => (
								<GetCard
									data={data}
									badgeListData={badgeListData}
									control={control}
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
							type="button"
							themeType="secondary"
							id="cancel_request_btn"
							style={{ marginRight: 10, borderWidth: 0 }}
							disabled={loading}
							onClick={onClose}
						>
							Cancel
						</Button>

						<Button
							size="md"
							type="submit"
							themeType="primary"
							id="save_request_btn"
							disabled={loading}
						>
							Save
						</Button>
					</div>
				</form>
			</section>
		</div>
	);
}

export default CreateBadge;
