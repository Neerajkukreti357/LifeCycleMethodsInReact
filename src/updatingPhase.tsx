import React from "react";

class UpdatingPhase extends React.Component {
  constructor(props: object) {
    super(props);
    this.state = { propsVaribale: 0, stateVariable: 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ stateVariable: this.state.stateVariable + 1 });
  }

  static getDerivedStateFromProps(
    props: { propsVaribale: string },
    state: { propsVaribale: string },
  ) {
    console.log("getDerivedStateFromProps run ");

    if (props.propsVaribale !== state.propsVaribale) {
      return { propsVaribale: props.propsVaribale };
    }
    return null;
  }

  shouldComponentUpdate(
    nextProps: Readonly<object>,
    nextState: Readonly<object>,
  ): boolean {
    if (nextProps.propsVaribale !== this.state.propsVaribale) {
      console.log("shouldComponentUpdate run because props value is changed");
      return true;
    } else if (nextState.stateVariable !== this.state.stateVariable) {
      console.log("shouldComponentUpdate run because state value is changed");
      return true;
    }
    console.log(
      "shouldComponentUpdate stops because state or props value is not chnaged",
    );
    return false;
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>) {
    console.log("getSnapshotBeforeUpdate runs");
    return null;
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    console.log("componentDidUpdate runs");
  }

  render(): React.ReactNode {
    console.log("render run ");

    return (
      <div>
        <h1>Updating Phase</h1>
        <p>
          The updating phase is when the component has any updates or it
          re-renders. This phase is triggered when the props or state are
          updated.
        </p>

        <h1>Methods which are used in this phase are as follows:</h1>
        <ol>
          <li>
            static getDerivedStateFromProps():(Done Above Same thing it will
            runs even if state or props chnage)
          </li>
          <li>shouldComponentUpdate()</li>
          <li>render()</li>
          <li>getSnapshotBeforeUpdate()</li>
          <li>componentDidUpdate()</li>
          <li>componentDidUpdate()</li>
        </ol>

        <h1>The shouldComponentUpdate() Method</h1>
        <p>
          This is also another rarely used lifecycle method. It’s specifically
          used for performance optimization. This method gives you control over
          whether or not a component should update due to a change in its props
          or state. By default, a component will always re-render when the state
          or prop is updated. This method can either return true or false to
          determine if the component should be updated or not. Also, this method
          receives nextProps and nextState as arguments so you can always
          compare them with the component’s current prop and state values.
        </p>

        <button onClick={this.handleChange}>
          {this.state.stateVariable}
          Click
        </button>

        <h1>The getSnapshotBeforeUpdate() Method</h1>
        <p>
          The getSnapshotBeforeUpdate() method is called right before the
          changes from the current update are applied to the DOM. The value you
          return from this method will be passed as the third parameter to the
          componentDidUpdate() method. This method is called after the render
          method and before componentDidUpdate. This is also one of those
          methods that are rarely used.
        </p>

        <h1>The componentDidUpdate() Method</h1>
        <p>
          This method is the last one invoked in this phase. Like the previous
          method, it also receives the older props and state values as
          arguments, but it also receives the return value of
          getSnapshotBeforeUpdate() as a third argument (if present). It is
          typically used to make more fetch requests based on the condition of
          comparing the previous and current props and state values. Therefore,
          you may call setState but it should be within the conditional
          statement.
        </p>

        <p>
          (समस्या क्या है मान लीजिए एक मैसेज लिस्ट है, जिसमें ऊपर की तरफ़ नए
          मैसेज जोड़े जाते हैं। जब DOM अपडेट होता है, तो स्क्रॉल की स्थिति
          (scroll position) वैसी ही रहती है जैसे पहले थी — जिससे यूज़र को लगता
          है कि पूरा कंटेंट अचानक नीचे खिसक गया। हमें चाहिए कि नया मैसेज आने के
          बाद भी स्क्रॉल की स्थिति सहज (seamless) बनी रहे, जैसे कुछ बदला ही न
          हो।
        </p>
        <p>
          {" "}
          दोनों मेथड्स की ज़रूरत अलग-अलग क्यों है componentDidUpdate() तब चलता
          है जब DOM पहले ही बदल चुका होता है। इसलिए इस समय तक पुराने DOM की
          जानकारी (जैसे पुरानी scroll height) खो चुकी होती है — उसे यहाँ मापना
          बहुत देर हो जाती है। getSnapshotBeforeUpdate() एक ऐसा इकलौता क्षण है
          जो "पुराने DOM" और "नए DOM" के बीच में आता है — यह render() के बाद
          चलता है (तो React को पता होता है कि क्या बदलने वाला है), लेकिन असली
          DOM में वो बदलाव लागू होने से ठीक पहले चलता है।
        </p>
        <p>
          मेथड-दर-मेथड समझें getSnapshotBeforeUpdate(prevProps, prevState) यह
          अपडेट फ़ेज़ में render() के तुरंत बाद, लेकिन DOM में बदलाव कमिट होने
          से पहले चलता है। इस समय पुराना DOM अभी भी मौजूद होता है, इसलिए यहाँ आप
          DOM से कोई भी जानकारी (जैसे scroll position, element की ऊँचाई)
          "स्नैपशॉट" के रूप में कैप्चर कर सकते हैं, इससे पहले कि वो जानकारी
          बदलाव की वजह से खो जाए। यह जो भी value return करता है, वही value अगले
          मेथड यानी componentDidUpdate() को तीसरे argument के रूप में मिलती है।
          अगर कुछ कैप्चर करने की ज़रूरत नहीं है, तो null return करना चाहिए।
        </p>
        <p>
          componentDidUpdate(prevProps, prevState, snapshot) यह मेथड DOM में
          बदलाव पूरी तरह लागू (commit) हो जाने के बाद चलता है — अब नया DOM असली
          रूप में मौजूद है। इसका तीसरा argument, snapshot, वही value है जो
          getSnapshotBeforeUpdate() ने पहले return की थी। यहाँ आप उस पुरानी
          जानकारी (snapshot) और अब के नए DOM की स्थिति की तुलना करके ज़रूरी
          समायोजन (adjustment) कर सकते हैं — जैसे scroll position को सही जगह
          वापस सेट करना। यह मेथड हर अपडेट पर चलता है — इसलिए prevProps/prevState
          से तुलना करके यह ज़रूर जाँचना चाहिए कि वाकई कुछ ज़रूरी बदला है या
          नहीं। अगर बिना शर्त (unconditionally) यहाँ setState() बुला दिया जाए,
          तो एक अनंत लूप (infinite loop) बन सकता है — यह एक आम गलती है। दोनों को
          साथ मिलाकर याद रखने का आसान तरीक़ा "पहले नाप लो, फिर सुधार लो" —
          getSnapshotBeforeUpdate पुराने DOM की स्थिति नापता (measure) है, और
          componentDidUpdate नए DOM में उस नापी हुई जानकारी के आधार पर सुधार
          (adjust) करता है।
        </p>
        <p>
          अन्य असली उपयोग (use cases), संक्षेप में getSnapshotBeforeUpdate
          अकेले: scroll position कैप्चर करना, किसी element के resize होने से
          पहले उसकी माप लेना componentDidUpdate अकेले (यह ज़्यादा आम इस्तेमाल
          है): जब कोई prop (जैसे id) बदले, तो नया डेटा फिर से fetch करना; किसी
          third-party लाइब्रेरी को नए props के अनुसार sync करना; किसी विशेष
          state बदलाव पर logging/analytics भेजना एक-पंक्ति में इंटरव्यू का जवाब
          "getSnapshotBeforeUpdate DOM अपडेट होने से ठीक पहले पुरानी जानकारी
          कैप्चर करता है, और वही जानकारी componentDidUpdate को snapshot के रूप
          में मिलती है, ताकि नए DOM में उसके आधार पर सही समायोजन किया जा सके —
          जैसे स्क्रॉल पोज़िशन को सहज बनाए रखना।" )
        </p>
      </div>
    );
  }
}

export default UpdatingPhase;
