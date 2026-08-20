import React from "react";

class MountingPhase extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = { count: 0, name: "" };
    console.log("1. Iam constructor first called in the lifecycle method.");
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  static getDerivedStateFromProps(
    props: { name: string },
    state: { name: string },
  ) {
    console.log(
      "2. Iam getDerivedStateFromProps called second in the lifecycle method.",
    );

    // If the incoming prop is different from what we last saw,
    // sync state to match the new prop.
    if (props.name !== state.name) {
      return {
        name: props.name,
      };
    }
    // Otherwise, don't change anything.
    return null;
  }

  componentDidMount(): void {
    console.log(
      "4. Iam componentDidMount method called fourth in the lifecycle method",
    );
  }

  render(): React.ReactNode {
    console.log("3. Iam render method called third in the lifecycle method");

    return (
      <div>
        <h1>In mounting phase the function which are called are as follows</h1>
        <ol>
          <li>Constructor</li>
          <li>static getDerivedStateFromProps</li>
          <li>render</li>
          <li>componentDidMount</li>
        </ol>

        <h2>The constructor() Method</h2>
        <p>
          The constructor method is the very first method called during the
          mounting phase. This method is mostly used for initializing the state
          of the component and binding the event-handler methods which will be
          used within the component. The constructor method is called when the
          component is initiated but before it’s rendered. Note that if you want
          any state in your component, it’s important you call the super(props)
          function with props as an argument passed to it within the
          constructor.
        </p>
        <button onClick={this.handleClick}>{this.state.count} Click</button>

        <h2>The static getDerivedStateFromProps() Method</h2>
        <p>
          After initializing, the next function that is called is static
          getDerivedStateFromProps(). This method allows a component to update
          its state based on changes to its props. It is very rarely used and
          should be used with caution as it can cause many errors. As a general
          rule for beginners, you probably don’t need it and should avoid using
          it. This method is used to modify the state value with any props
          value. The static getDerivedStateFromProps() method accepts two
          arguments: props and state, and returns an object, or null if no
          change is needed. These values are passed directly to the method, so
          there’s no need for it to have access to the instance of the class (or
          any other part of the class) and thus it is considered a static
          method.
        </p>
        <p>Props value : {this.state.name}</p>

        <h1>The componentDidMount() Method</h1>
        <p>
          The componentDidMount() method is executed immediately after the
          component is rendered for the first time, that is after the first
          render() cycle. This method is mostly used to handle all network
          requests such as API calls or to set up all the major subscriptions of
          the application. Generally, componentDidMount() is a good place to do
          all the setup you couldn’t have done without the DOM.
        </p>
      </div>
    );
  }
}

export default MountingPhase;
