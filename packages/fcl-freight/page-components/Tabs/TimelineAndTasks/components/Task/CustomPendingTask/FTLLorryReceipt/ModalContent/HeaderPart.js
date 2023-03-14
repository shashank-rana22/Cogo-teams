import { HeadSecond, Head, HeadFirst, HeadThird } from './styles';

export const HeaderPart = ({ data, lrData, id }) => {
	return (
		<>
			<Head>
				<HeadFirst>
					<div>
						<img
							src="https://cogoport-testing.sgp1.digitaloceanspaces.com/42cbf21f50b949090e5b77983b905420/logo%201.png"
							alt="cogoport logo"
							style={{ paddingRight: '18px' }}
						/>
						<p
							style={{
								fontSize: '18px',
								fontWeight: '500',
								paddingLeft: '6px',
								marginTop: '10px',
							}}
						>
							{data?.service_provider_data?.name}
						</p>
					</div>
					<p
						style={{
							alignItems: 'center',
							position: 'relative',
							top: '26px',
							fontSize: '13px',
							fontWeight: 'bold',
						}}
					>
						PO Number: .........
					</p>
				</HeadFirst>

				<HeadSecond>
					<p
						style={{
							paddingRight: '8px',
							fontSize: '14px',
							fontWeight: 'bold',
							position: 'relative',
							bottom: '27px',
						}}
					>
						Docket No: {lrData[id]?.lr_number}
					</p>
				</HeadSecond>
				<HeadThird>
					<img
						src="https://cogoport-testing.sgp1.digitaloceanspaces.com/b7b7bdf5c6ea1980ef93bbe5aaf1895a/Screenshot%202022-09-19%20at%202.35%202.png"
						alt="cogoport logo"
						style={{ paddingRight: '18px' }}
					/>
					<div
						style={{
							padding: '5px 22px 0px 0px',
							textAlign: 'right',
							fontSize: '7px',
						}}
					>
						<div
							style={{
								fontSize: '9px',
								fontWeight: 'bold',
							}}
						>
							Unit No. 601, 6th Floor, Ackruti Trade center,
						</div>
						<div>Rd number 7,Mumbai</div>
						<div>Suurban,Maharashra-400093</div>
					</div>
				</HeadThird>
			</Head>
		</>
	);
};
