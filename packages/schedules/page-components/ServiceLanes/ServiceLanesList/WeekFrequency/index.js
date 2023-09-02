import styles from './styles.module.css';

const SEVEN = 7;
const THIRTYONE = 31;
const ONE = 1;
const THIRTY = 30;
function WeekFrequency({ dayOfWeek }) {
	const weekMessage = [
		'Once a week',
		'Twice a week',
		'Thrice a week',
		'Four times a week',
		'Five times a week',
		'Six times a week',
		'Daily',
	];
	const monthMessage = [
		'Once a month',
		'Twice a month',
		'Thrice a month',
		'Four times a month',
		'Five times a month',
	];
	const yearMessage = [
		'Once a year',
		'Twice a year',
		'Quarterly a Year',
		'Four times a year',
		'Five times a year',
		'Half yearly',
		'Seven times a year',
		'Eight times a year',
		'Nine times a year',
		'Ten times a year',
		'Eleven times a year',
		'Yearly',
	];

	const message = () => {
		if (dayOfWeek < SEVEN) {
			return weekMessage[dayOfWeek - ONE];
		} if (dayOfWeek < THIRTYONE) {
			return monthMessage[Math.floor(dayOfWeek / SEVEN) - ONE];
		}
		return yearMessage[Math.floor(dayOfWeek / THIRTY) - ONE];
	};

	const printMessage = message();

	return <div className={styles.container}>{printMessage}</div>;
}

export default WeekFrequency;
