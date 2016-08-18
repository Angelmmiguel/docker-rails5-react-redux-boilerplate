import React from 'react';
import { connect } from 'react-redux';
import { getTitle } from '../actions/actions';

// Components
import MyTitle from '../components/MyTitle';

class MyContainer extends React.Component {
  // Update the title
  toggleTitle() {
    // Dispatch the action to Redux
    this.props.dispatch(getTitle());
  }
  // Layout
  render() {
    return (
      <section>
        <MyTitle title={ this.props.title } />
        <button onClick={this.toggleTitle.bind(this)}>Toggle title</button>
      </section>
    );
  }
}

// Map the state to the props of this component
const mapStateToProps = (state) => {
  return {
    title: state.title
  }
}

export default connect(
  mapStateToProps
)(MyContainer);
