import React from "react";

class UnmountingPhase extends React.Component {
  componentWillUnmount(): void {
    console.log("componentWillUnmount run");
  }
  render(): React.ReactNode {
    return (
      <div>
        <h1>The componentWillUnmount() Lifecycle Method</h1>
        <p>
          The componentWillUnmount() method is called just before the component
          is removed from the DOM. It allows you to perform any necessary
          cleanup, such as canceling timers, removing event listeners, or
          clearing any data structures that were set up during the mounting
          phase. All of the component’s state and props are destroyed.
        </p>
      </div>
    );
  }
}

export default UnmountingPhase;
