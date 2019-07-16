import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Learn by Playing!</h1>
        <h3> I am awesome </h3>
        <h5> Something</h5>
        <p>
          I think the best way of learning something new is by practicing;
          and what better way to practice if not by playing and having fun!
        </p>
        <p>
          The first version can be found here: <a href="https://github.com/robert-damoc/MinigamesInReact">MinigamesInReact</a>
        </p>

        <p>
          I created the second one because the first one had the squares in the Board state; because of that, when we
          updated one square we'd trigger a rerender on the entire board.
        </p>

        <p>
          The new approach keeps the state on each square and uses `refs` to update it.
        </p>

        <p>
          It works better on bigger grids, as much as we don't update too many squares at once.
        </p>
        <h2>Have fun and enjoy!</h2>
      </div>
    );
  }
}

export default Home;
