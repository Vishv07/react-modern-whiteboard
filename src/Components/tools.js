import React from 'react';
import EventBus from '../EventBus/eventBus';
import ToolStore, { POINTER, PEN, LINE, ELLIPSE, RECT } from '../EventBus/toolStore';
import ColorPicker from './colorPicker';

export default class Tools extends React.Component {
	constructor() {
		super();
		this.state = {
			tools: [
				{ id: POINTER, label: 'fa-mouse-pointer', type: 'cursor' },
				{ id: LINE, label: 'fa-minus', type: 'line', selected: true },
				{ id: RECT, label: 'fa-square-o', type: 'rect' },
				{ id: ELLIPSE, label: 'fa-circle-thin', type: 'ellipse' },
				{ id: PEN, label: 'fa-pencil', type: 'pen' },
			]
		};
		ToolStore.subscribe(() => {
			const tools = this.state.tools.map(tool => ({ ...tool, selected: ToolStore.tool === tool.id }))
			console.log(tools);
			this.setState({ tools })
		});
	}

	componentDidMount(){
			
		document.addEventListener("keydown", this.HandleShortCuts, false);
	}

	HandleShortCuts = (e) => {
		
			switch (e.keyCode) {
				case 65:
					this.updateState(POINTER);
					break;
				case 76:
					this.updateState(LINE);
					break;
				case 82:
					this.updateState(RECT);
					break;
				case 67:
					this.updateState(ELLIPSE);
					break;
				case 80:
					this.updateState(PEN);
					break;
				default:
					break;
			}
	}

	updateState = (ID) => {
		const tools = this.state.tools.map(tool => ({ ...tool, selected: ID === tool.id }))
		EventBus.emit(EventBus.TOOL_CHANGE, ID);
		this.setState({ tools });
	}

	handleClick(index) {
		return function () {
			EventBus.emit(EventBus.TOOL_CHANGE, this.state.tools[index].id);
		}
	}

	render() {
		const tools = this.state.tools.map((tool, i) => <div
			key={i}
			onClick={this.handleClick(i).bind(this)}
			className={tool.selected ? 'selected' : ''}
		><i className={tool.label + ' fa fa-lg'}></i></div>)
		return (<div id="tools" style={{marginLeft:"35px",marginTop:"35px",backgroundColor:"white"}}>
			{tools}
			{/* <ColorPicker /> */}
		</div>);
	}
}

