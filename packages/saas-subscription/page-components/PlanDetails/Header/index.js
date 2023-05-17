import styles from './styles.module.css';

const HEADER_MAPPING = {
	plan_name        : 'Plan Name',
	status           : 'Status',
	plan_description : 'Plan Description',
	plan_validity    : 'Plan Validity',
};

const data = {
	plan_name        : 'Plan Name',
	status           : 'Active',
	plan_description : 'Lorem Ipsum',
	plan_validity    : '30/4/2022',
};

function Header() {
	return (
		<div className={styles.flex_box}>
			{Object.keys(HEADER_MAPPING).map((ele) => (
				<div className={styles.col}>
					<p className={styles.title}>{HEADER_MAPPING?.[ele]}</p>
					<div className={styles.col_value}>{data?.[ele]}</div>
				</div>
			))}
		</div>
	);
}

export default Header;
