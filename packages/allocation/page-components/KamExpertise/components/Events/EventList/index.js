import { Pill } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function EventListItem({ data, index, loading = true, setEventListData, setToggleEvent }) {
	const {
		id, condition_name:conditionName = '', expertise_type:Type = '',
		description = '',
		rules = [],
		params = '',
	} = data;
	// console.log('data loading :::::', loading);

	const handleEdit = () => {
		setEventListData(data);
		setToggleEvent('updateEvent');
	};

	// if (loading) {
	// 	// return (
	// 	// 	<section key={id} className={styles.list_item_container}>
	// 	// 		<div className={styles.top_div}>
	// 	// 			<Placeholder width="20px" style={{ marginBottom: '4px' }} />
	// 	// 		</div>
	// 	// 		<div>
	// 	// 			<p className={styles.info_tag}>
	// 	// 				<Placeholder width="160px" style={{ marginBottom: '4px' }} />

	// 	// 			</p>
	// 	// 			<div className={styles.info_tag}>
	// 	// 				<Placeholder width="120px" style={{ marginBottom: '12px' }} />

	// 	// 			</div>
	// 	// 			<p className={styles.info_tag}>
	// 	// 				<Placeholder width="120px" style={{ marginBottom: '4px' }} />
	// 	// 				<Placeholder width="120px" style={{ marginBottom: '4px' }} />
	// 	// 				<Placeholder width="120px" style={{ marginBottom: '4px' }} />

	// 	// 			</p>
	// 	// 		</div>

	// 	// 		<div className={styles.rule}>
	// 	// 			<p className={styles.rule_head}>
	// 	// 				<Placeholder width="100px" height="20px" style={{ marginBottom: '4px' }} />

	// 	// 			</p>

	// 	// 			<div className={styles.rule_body}>
	// 	// 				<Placeholder width="120px" style={{ marginBottom: '4px' }} />

	// 	// 				<Placeholder width="120px" style={{ marginBottom: '4px' }} />

	// 	// 				<Placeholder width="120px" style={{ marginBottom: '4px' }} />

	// 	// 				<Placeholder width="120px" style={{ marginBottom: '4px' }} />

	// 	// 				<Placeholder width="120px" style={{ marginBottom: '4px' }} />

	// 	// 				<Placeholder width="120px" style={{ marginBottom: '4px' }} />

	// 	// 			</div>

	// 	// 		</div>

	// 	// 		<div className={styles.rule_end}>
	// 	// 			<Placeholder width="160px" style={{ marginBottom: '4px' }} />
	// 	// 		</div>
	// 	// 	</section>
	// 	// );
	// 	<div>loading</div>;
	// }
	return (

		<section key={id} className={styles.list_item_container}>
			<div className={styles.top_div}>
				#
				{index + 1}
				<IcMEdit onClick={handleEdit} />
			</div>
			<div>
				<p className={styles.info_tag}>
					Expertise :
					{' '}
					<b style={{ marginLeft: 4 }}>{Type}</b>
				</p>
				<div className={styles.info_tag}>
					Event Name :
					{' '}
					<h4 style={{ marginLeft: 4 }}>{conditionName}</h4>
				</div>
				<p className={styles.info_tag}>
					Description :
					{' '}
					{description}

				</p>
			</div>

			<div className={styles.rule}>
				<p className={styles.rule_head}>
					Rule
				</p>
				{rules.map((res, i) =>
				// console.log('res::', res);
					(
						<div className={styles.rule_body}>
							Rule #
							{i + 1}
							<Pill
								key="Reactivation"
								size="l"
								color="blue"
							>
								{res?.name}
							</Pill>

							is triggered on
							<Pill
								key="Shipment_creation"
								size="l"
								color="#FEF3E9"
							>
								Shipment creation
							</Pill>

							of
							<Pill
								key="Account"
								size="l"
								color="#FEF3E9"
							>
								{res?.rule_type}
							</Pill>

							having attribute
						</div>
					))}
			</div>

			<div className={styles.rule_end}>
				last booking date

				<Pill
					key="Account"
					size="l"
					color="#FEF3E9"
				>
					{/* {params} */}
				</Pill>

			</div>

		</section>
	);
}

export default EventListItem;
