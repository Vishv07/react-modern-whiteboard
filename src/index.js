import React from 'react';
import ReactDOM from 'react-dom';
import WhiteBoard from './Components/whiteBoard';
import Tools from './Components/tools';
import History from './Components/history';

ReactDOM.render(<div id='main'>
					<div id='container'>
						<Tools/>
						<WhiteBoard />
					</div>
					{/* <History/> */}
		     	</div>, document.getElementById('app'));