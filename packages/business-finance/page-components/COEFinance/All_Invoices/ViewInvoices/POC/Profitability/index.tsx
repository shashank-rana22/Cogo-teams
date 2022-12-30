import { Skeleton } from '@cogoport/front/components/admin';
import { Container, SubContainer } from './styles';
import React from 'react';
const Profitability = ({ data, loading }) => {
	const { quotationalProfit, tentativeProfit } = data || {};

	return (
		<Container>
			<SubContainer>
				<div className="quotation-profit-style">
					<div className="quotation">Quotational</div>
					{loading ? (
						<Skeleton width="50px" height="10px" margin="10px 0px" />
					) : (
						<div className="quotation-profit">
							{quotationalProfit ? (
								`${quotationalProfit}%`
							) : (
								<div style={{ color: '#4d79ff' }}>DATA NOT FOUND</div>
							)}
						</div>
					)}
				</div>
			</SubContainer>
			<SubContainer>
				<div className="tentative-profit-style">
					<div className="tentative">Tentative</div>
					{loading ? (
						<Skeleton width="50px" height="10px" margin="10px 0px" />
					) : (
						<div className="tentative-profit ">
							{tentativeProfit ? (
								`${tentativeProfit}%`
							) : (
								<div style={{ color: '#4d79ff' }}>DATA NOT FOUND</div>
							)}
						</div>
					)}
				</div>
			</SubContainer>
		</Container>
	);
};
export default Profitability;
