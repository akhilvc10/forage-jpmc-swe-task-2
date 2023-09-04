import React, { useEffect, useState } from "react";
import DataStreamer, { ServerRespond } from "./DataStreamer";
import Graph from "./Graph";
import "./App.css";

/**
 * State declaration for App
 */
interface IState {
	data: ServerRespond[];
	showGraph: boolean;
}

/**
 * The parent element of the react app.
 * It renders title, button, and Graph react element.
 */
function App(): JSX.Element | null {
	const [data, setData] = useState<IState>({ data: [], showGraph: false });

	useEffect(() => {
		getDataFromServer();
	}, []);

	/**
	 * Render Graph react component with data parsed as a property
	 */
	function renderGraph() {
		if (data.showGraph) {
			return <Graph data={data.data} />;
		}
	}

	/**
	 * Get new data from the server and update the state with the new data
	 */
	function getDataFromServer(): void {
		let x = 0;
		const interval = setInterval(() => {
			DataStreamer.getData((serverResponds: ServerRespond[]) => {
				// Update the state by creating a new array of data that consists of
				// Previous data in the state and the new data from the server
				setData((prevState) => ({
					...prevState,
					data: [...prevState.data, ...serverResponds],
					showGraph: true
				}));
			});
			x++;
			if (x > 1000) {
				clearInterval(interval);
			}
		}, 100);
	}

	return (
		<div className="App">
			<header className="App-header">Bank & Merge Co Task 2</header>
			<div className="App-content">
				<button
					className="btn btn-primary Stream-button"
					onClick={() => {
						getDataFromServer();
					}}>
					Start Streaming Data
				</button>
				<div className="Graph">{renderGraph()}</div>
			</div>
		</div>
	);
}

export default App;
