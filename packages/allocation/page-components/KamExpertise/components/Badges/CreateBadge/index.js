import { Button } from '@cogoport/components';
import { format } from '@cogoport/utils';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateBadgeConfiguration from '../../../hooks/useCreateBadgeConfiguration';
import useCreateNewBadge from '../../../hooks/useCreateNewBadge';

import GetCard from './getCard';
import styles from './styles.module.css';

function CreateBadge({ setToggleScreen, autofill }) {
	const {
		getAddBadgesControls, formProps,
	} = useCreateNewBadge();

	const {
		control, handleSubmit, formState: { errors },
	} = formProps;

	const {
		onCheckPublish, loading,
	} = useCreateBadgeConfiguration();

	const medalType = [
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

	const onClose = () => {
		setToggleScreen(1);
	};

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			badge,
			description,
			Bronze_value,
			Bronze_img_value,
			Silver_value,
			Silver_img_value,
			Gold_value,
			Gold_img_value,
		} = formValues || {};

		const payload_data = {
			version_id    : '1',
			badge_name    : badge,
			description,
			// event_configuration_id : '00245b2c-m9k8-479e-8dcf-bhnc9mkkwwvw930t45670',
			status        : 'active',
			badge_details : [
				{
					score     : Bronze_value,
					image_url : Bronze_img_value,
					medal     : 'bronze',
				},
				{
					score     : Silver_value,
					image_url : Silver_img_value,
					medal     : 'silver',
				},
				{
					score     : Gold_value,
					image_url : Gold_img_value,
					medal     : 'gold',
				},
			],
		};
		await onCheckPublish(payload_data);
		onClose();
	};

	if (loading) {
		return null;
	}
	return (
		<div>
			<section className={styles.container}>
				{Object.keys(autofill).length > 0
				&& (
					<div className={styles.fields_container}>
						<p className={styles.text_styles}>
							Last Modified :
							{' '}
							{format(autofill.updated_at, 'yyyy-MMM-dd')}
						</p>

						<p className={styles.text_styles}>
							Last Modified By :
							{/* {` ${autofill.lstModifiedBy}`} */}
						</p>
					</div>
				)}
				{/* <p className={styles.text_styles}>
					{`#${dummyDatas.bdgeNumber}`}
				</p> */}

				<h2 style={{ color: '#4f4f4f', marginTop: 28 }}>Add Badge</h2>
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
							{medalType.map((data, index) => (
								<GetCard
									data={data}
									control={control}
									isLastItem={index === medalType.length - 1}
								/>
							))}
						</div>
					</div>

					<div className={styles.btncls}>
						<Button
							size="md"
							type="button"
							themeType="secondary"
						// disabled
							id="cancel_request_btn"
							style={{ marginRight: 10, borderWidth: 0 }}
							onClick={onClose}
						>
							Cancel
						</Button>

						<Button
							size="md"
							type="submit"
							themeType="primary"
							id="save_request_btn"
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
