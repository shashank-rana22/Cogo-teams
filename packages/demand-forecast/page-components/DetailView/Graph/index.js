import { ResponsivePie } from '@cogoport/charts/pie';

import styles from './styles.module.css';

function Graph({ title = 'Weekly Distribution' }) {
	const data = [
		{
			id    : 'haskell',
			label : 'Aug 1st Week',
			value : '112',
		},
		{
			id    : 'php',
			label : 'Aug 2st Week',
			value : '243',
		},
		{
			id    : 'python',
			label : 'Aug 3st Week',
			value : '289',
		},
		{
			id    : 'java',
			label : 'Aug 4st Week',
			value : '310',
		},
		{
			id    : 'java',
			label : 'Aug 4st Week',
			value : '310',
		},
	];

	const colors = ['#ACDADF', '#F3FAFA', '#CFEAED', '#63BEC8', '#ACDADF'];
	return (
		<div>
			<div className={styles.single_chart_container}>
				<div className={styles.title}>
					{title}
				</div>
				<div className={styles.graph}>
					<ResponsivePie
						loading={false}
						data={data}
						innerRadius={0.5}
						activeOuterRadiusOffset={4}
						enableArcLinkLabels={false}
						enableArcLabels={false}
						colors={colors}
						colorBy="index"
					/>
				</div>
				<div className={styles.legends}>
					{
						data.map((legend, index) => (
							<div key="123" className={styles.legend_info}>
								<div className={styles.legend_title}>
									<Logo backgroundColor={colors[index]} />
									<div>{legend?.label}</div>
								</div>

								<div className={styles.legend_value}>
									{legend?.value}
									{' '}
									Containers
								</div>
							</div>
						))
					}

				</div>
			</div>
		</div>
	);
}

function Logo({ backgroundColor = '' }) {
	const logoStyle = {
		width        : '16px',
		height       : '16px',
		marginRight  : '8px',
		backgroundColor,
		borderRadius : '50%',
	};

	return <div className={styles.logo} style={logoStyle} />;
}
export default Graph;
