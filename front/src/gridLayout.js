import React from 'react';
import GridLayout from 'react-grid-layout';
import SimpleCard from './card.js';


export default class GridDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ptdr: []
    };
  }

  pushWidget1() {
    console.log("PTDR PUUUUUUSH");
    this.state.ptdr.push(<SimpleCard></SimpleCard>);
  }

  render() {
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2},
      {i: 'b', x: 5, y: 0, w: 1, h: 2},
      {i: 'c', x: 10, y: 0, w: 1, h: 2}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a">{this.state.ptdr}</div>
      </GridLayout>
    )
  }
}