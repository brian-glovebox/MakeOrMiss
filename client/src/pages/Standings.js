import React, { Component, PropTypes } from 'react';
import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';
import FlipMove from 'react-flip-move';
import classNames from 'classnames';

const Toggle = ({clickHandler, text, icon, active, large}) => {
  const buttonClass = classNames({
    'button-toggle': true,
    'no-icon': !icon,
    active,
    large,
  });
  const iconClass = `fa fa-fw fa-${icon}`;

  return (
    <button className={buttonClass} onClick={clickHandler}>
      <i className={iconClass} />
      {text}
    </button>
  );
};

const easternC = [
  { id: 'a', name: 'Milwaukee Bucks', conference: 'E', recordW:60, recordL:22, threeW: 5, threeL: 6},
  { id: 'b', name: 'Toronto Raptors', conference: 'E', recordW:58, recordL:24, threeW: 11, threeL: 7},
  { id: 'c', name: 'Philadelphia 76ers', conference: 'E', recordW:51, recordL:31, threeW: 10, threeL: 8},
  { id: 'd', name: 'Boston Celtics', conference: 'E', recordW:49, recordL:33, threeW: 5, threeL: 6},
  { id: 'e', name: 'Indiana Pacers', conference: 'E', recordW:48, recordL:34, threeW: 6, threeL: 6},
  { id: 'f', name: 'Brooklyn Nets', conference: 'E', recordW:42, recordL:40, threeW: 12, threeL: 8},
  { id: 'g', name: 'Orlando Magic', conference: 'E', recordW:42, recordL:40, threeW: 5, threeL: 6},
  { id: 'h', name: 'Detroit Piston', conference: 'E', recordW:41, recordL:41, threeW: 6, threeL: 9},
  { id: 'i', name: 'Charlotte Hornets', conference: 'E', recordW:39, recordL:43, threeW: 6, threeL: 10},
  { id: 'j', name: 'Miami Heat', conference: 'E', recordW:39, recordL:43, threeW: 6, threeL: 9},
  { id: 'k', name: 'Washington Wizards', conference: 'E', recordW:32, recordL:50, threeW: 5, threeL: 6},
  { id: 'l', name: 'Atlanta Hawks', conference: 'E', recordW:29, recordL:53, threeW: 9, threeL: 6},
  { id: 'm', name: 'Chicago Bulls', conference: 'E', recordW:22, recordL:60, threeW: 8, threeL: 8},
  { id: 'n', name: 'Cleveland Cavaliers', conference: 'E', recordW:19, recordL:63, threeW: 5, threeL: 4},
  { id: 'o', name: 'New York Knicks', conference: 'E', recordW:17, recordL:65, threeW: 4, threeL: 7}, 
]

const westernC = [
  { id: 'a', name: 'Golden State Warriors', conference: 'W', recordW:'57', recordL:'25', threeW: '7', threeL: '7'},
  { id: 'b', name: 'Denver Nuggets', conference: 'W', recordW:'54', recordL:'28', threeW: '13', threeL: '3'},
  { id: 'c', name: 'Portland Trailblazers', conference: 'W', recordW:'53', recordL:'29', threeW: '4', threeL: '6'},
  { id: 'd', name: 'Houston Rockets', conference: 'W', recordW:'53', recordL:'29', threeW: '5', threeL: '7'},
  { id: 'e', name: 'Utah Jazz', conference: 'W', recordW:'50', recordL:'32', threeW: '0', threeL: '7'},
  { id: 'f', name: 'Oklahoma City Thunder', conference: 'W', recordW:'49', recordL:'33', threeW: '6', threeL: '7'},
  { id: 'g', name: 'San Antonio Spurs', conference: 'W', recordW:'48', recordL:'34', threeW: '7', threeL: '4'},
  { id: 'h', name: 'Los Angeles Clippers', conference: 'W', recordW:'48', recordL:'34', threeW: '6', threeL: '2'},
  { id: 'i', name: 'Sacramento Kings', conference: 'W', recordW:'39', recordL:'43', threeW: '6', threeL: '7'},
  { id: 'j', name: 'Los Angeles Lakers', conference: 'W', recordW:'37', recordL:'45', threeW: '5', threeL: '4'},
  { id: 'k', name: 'Minnesota Timberwolves', conference: 'W', recordW:'36', recordL:'46', threeW: '8', threeL: '5'},
  { id: 'l', name: 'Memphis Grizzles', conference: 'W', recordW:'33', recordL:'49', threeW: '6', threeL: '9'},
  { id: 'm', name: 'New Orleans Pelicans', conference: 'W', recordW:'33', recordL:'49', threeW: '4', threeL: '6'},
  { id: 'n', name: 'Dallas Mavericks', conference: 'W', recordW:'33', recordL:'49', threeW: '7', threeL: '7'},
  { id: 'o', name: 'Phoenix Suns', conference: 'W', recordW:'19', recordL:'63', threeW: '5', threeL: '5'}, 
]


class ListItem extends Component {
  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <li id={this.props.id} className={listClass} style={style}>
        <h3>{this.props.name}</h3>
        <h5>W: {this.props.recordW} L: {this.props.recordL} | {this.props.threeW} - {this.props.threeL}</h5>
      </li>
    );
  }
};


class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removedArticles: [],
      view: 'list',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordianVertical',
      easternC, 
      westernC
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
    this.sortShuffle = this.sortShuffle.bind(this);
  }

  toggleList() {
    this.setState({
      view: 'list',
      enterLeaveAnimation: 'accordianVertical'
    });
  }

  toggleGrid() {
    this.setState({
      view: 'grid',
      enterLeaveAnimation: 'accordianHorizontal'
    });
  }

  toggleSort() {
    const sortAsc = (a, b) => a.recordW - b.recordW;
    const sortDesc = (a, b) => b.recordW - a.recordW;

    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'chronological',
      easternC: this.state.easternC.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      ),
      westernC: this.state.westernC.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      )
    });
  }

  sortShuffle() {
    this.setState({
      sortingMethod: 'shuffle',
      easternC: shuffle(this.state.easternC),
      westernC: shuffle(this.state.westernC)
    });
  }

  moveArticle(source, dest, id) {
    const sourceArticles = this.state[source].slice();
    let destArticles = this.state[dest].slice();

    if ( !sourceArticles.length ) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id ? sourceArticles.findIndex(article => article.id === id) : 0;

    // If the article is already removed, do nothing.
    if ( i === -1 ) return;

    destArticles = [].concat( sourceArticles.splice(i, 1), destArticles );

    this.setState({
      [source]: sourceArticles,
      [dest]: destArticles,
    });
  }

  sortRotate() {
    // const easternC = this.state.easternC.slice();
    // easternC.unshift(easternC.pop())

    // this.setState({
    //   sortingMethod: 'rotate',
    //   easternC
    // });

    let invert = 0;
    for (let i = 0; i <this.state.easternC.length; i++) {

      invert = (this.state.easternC[i].recordW - this.state.easternC[i].threeW + this.state.easternC[i].threeL )
      console.log(invert)
    }
  

    const sortAsc = (a, b) => a.invert - b.invert;
    const sortDesc = (a, b) => b.invert - a.invert;

    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'chronological',
      easternC: this.state.easternC.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      )
    });
  }

  renderEasternC() {
    return this.state.easternC.map( (article, i) => {
      return (
        <ListItem
          key={article.id}
          view={this.state.view}
          index={i}
          clickHandler={throttle(() => this.moveArticle('easternC', 'removedArticles', article.id), 800)}
          {...article}
        />
      );
    });
  }
  renderWesternC() {
    return this.state.westernC.map( (article, i) => {
      return (
        <ListItem
          key={article.id}
          view={this.state.view}
          index={i}
          clickHandler={throttle(() => this.moveArticle('easternC', 'removedArticles', article.id), 800)}
          {...article}
        />
      );
    });
  }

  render() {
    return (
      <div id="shuffle" className={this.state.view}>
        <header>
          <div className="abs-left">
            <Toggle
              clickHandler={this.toggleList}
              text="List" icon="list"
              active={this.state.view === 'list'}
            />
            <Toggle
              clickHandler={this.toggleGrid}
              text="Grid" icon="th"
              active={this.state.view === 'grid'}
            />
          </div>
          <div className="abs-right">
            <Toggle
              clickHandler={this.toggleSort}
              text={this.state.order === 'asc' ? 'Ascending' : 'Descending'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'chronological'}
            />
            <Toggle
              clickHandler={this.sortShuffle}
              text="Shuffle" icon="random"
              active={this.state.sortingMethod === 'shuffle'}
            />
            <Toggle
              clickHandler={this.sortRotate}
              text="Rotate" icon="refresh"
              active={this.state.sortingMethod === 'rotate'}
            />
              <Toggle
              clickHandler={this.invertSort}
              text={this.state.order === 'asc' ? 'Invert' : 'Revert'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'chronological'}
            />
              <Toggle
              clickHandler={this.evenSort}
              text={this.state.order === 'asc' ? '.500' : 'Revert'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'chronological'}
            />
              <Toggle
              clickHandler={this.randomSort}
              text={this.state.order === 'asc' ? 'Random' : 'Revert'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'chronological'}
            />
          </div>
        </header>
        <br/>
        <br/>
        <br/>
        <div className="standingContainer">
        <div className= "standingsBox">
          <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={this.state.enterLeaveAnimation}
            leaveAnimation={this.state.enterLeaveAnimation}
            typeName="ul"
          >
            { this.renderWesternC() }
          </FlipMove>
        </div>
        <div className= "standingsBox">
          <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={this.state.enterLeaveAnimation}
            leaveAnimation={this.state.enterLeaveAnimation}
            typeName="ul"
          >
            { this.renderEasternC() }
          </FlipMove>
        </div>
        </div>
        
      </div>
    );
  }
};

export default Standings;