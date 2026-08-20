import React from "react";
import MountingPhase from "./mountingPhase";
import "./main.css";
import UpdatingPhase from "./updatingPhase";
import UnmountingPhase from "./unMountingPhase";

class App extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = { name: "", activeTab: 1, updateValraible: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value });
  }

  handleTabChnage(index) {
    this.setState({ activeTab: index });
  }

  render(): React.ReactNode {
    return (
      <div>
        <h1>Every component in react js goes through three phases</h1>
        <ol>
          <li>Mounting</li>
          <li>Updating</li>
          <li>Unmounting</li>
        </ol>
        <p>
          (Note: A React Component may or may not go through all phases.
          Sometimes they are never updated. Other times they are never
          unmounted. A component can even go through the mounting phase and
          unmounting phase back to back without ever updating.)
        </p>
        <div className="flex">
          <a
            className={`${this.state.activeTab === 1 ? "active" : ""}`}
            onClick={() => this.handleTabChnage(1)}
          >
            Mounting Phase
          </a>
          <a
            className={`${this.state.activeTab === 2 ? "active" : ""}`}
            onClick={() => this.handleTabChnage(2)}
          >
            Updating Phase
          </a>
          <a
            className={`${this.state.activeTab === 3 ? "active" : ""}`}
            onClick={() => this.handleTabChnage(3)}
          >
            Unmounting Phase
          </a>
        </div>

        {this.state.activeTab === 1 ? (
          <>
            <h1>Change the Name</h1>
            <input value={this.state.name} onChange={this.handleChange} />
            <MountingPhase name={this.state.name} />
          </>
        ) : this.state.activeTab === 2 ? (
          <>
            <button
              style={{ marginTop: 10 }}
              onClick={() => this.handleTabChnage(2)}
            >
              {"Click"}
            </button>
            <p>
              When you press this click button it triggers the handleTab
              function, due to which my props value won't change and there is no
              update, so my render in the Updating Phase component won't run.
            </p>
            <UpdatingPhase propsVaribale={2} />
          </>
        ) : (
          <UnmountingPhase />
        )}
      </div>
    );
  }
}

export default App;
