// ! remove dummy data
import styles from './styles.module.css';

function Header({ badge_type = 'Badge' }) {
	const dummyDatas = {
		lstModified   : '31/September/2023',
		lstModifiedBy : 'Ankur Verma',
		bdgeNumber    : '001',
	};
	return (
		<>
			<div className={styles.fields_container}>
				<p className={styles.text_styles}>
					Last Modified :
					{` ${dummyDatas.lstModified}`}

				</p>
				<p className={styles.text_styles}>
					Last Modified By :
					{` ${dummyDatas.lstModifiedBy}`}
				</p>
			</div>

			<p className={styles.text_styles}>
				{`#${dummyDatas.bdgeNumber}`}
			</p>

			<h2 style={{ color: '#4f4f4f', marginTop: 28 }}>
				Add
				{' '}
				{badge_type}
			</h2>
			<p className={styles.text_styles2}>
				Select the conditions and number of completions necessary to obtain
				the badge.
			</p>
		</>
	);
}
export default Header;
