import React, { Component, PropTypes } from 'react';
import shuffle from 'lodash/shuffle';
import throttle from 'lodash/throttle';
import FlipMove from 'react-flip-move';
import classNames from 'classnames';
import "../style.scss"
import "../teamStyle.scss"


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
  { id: 'MIL', name: 'Milwaukee Bucks', conference: 'E', recordW:60, recordL:22, threeW: 5, threeL: 6},
  { id: 'TOR', name: 'Toronto Raptors', conference: 'E', recordW:58, recordL:24, threeW: 11, threeL: 7},
  { id: 'PHI', name: 'Philadelphia 76ers', conference: 'E', recordW:51, recordL:31, threeW: 10, threeL: 8},
  { id: 'BOS', name: 'Boston Celtics', conference: 'E', recordW:49, recordL:33, threeW: 5, threeL: 6},
  { id: 'IND', name: 'Indiana Pacers', conference: 'E', recordW:48, recordL:34, threeW: 6, threeL: 6},
  { id: 'BRK', name: 'Brooklyn Nets', conference: 'E', recordW:42, recordL:40, threeW: 12, threeL: 8},
  { id: 'ORL', name: 'Orlando Magic', conference: 'E', recordW:42, recordL:40, threeW: 5, threeL: 6},
  { id: 'DET', name: 'Detroit Piston', conference: 'E', recordW:41, recordL:41, threeW: 6, threeL: 9},
  { id: 'CHO', name: 'Charlotte Hornets', conference: 'E', recordW:39, recordL:43, threeW: 6, threeL: 10},
  { id: 'MIA', name: 'Miami Heat', conference: 'E', recordW:39, recordL:43, threeW: 6, threeL: 9},
  { id: 'WAS', name: 'Washington Wizards', conference: 'E', recordW:32, recordL:50, threeW: 5, threeL: 6},
  { id: 'ATL', name: 'Atlanta Hawks', conference: 'E', recordW:29, recordL:53, threeW: 9, threeL: 6},
  { id: 'CHI', name: 'Chicago Bulls', conference: 'E', recordW:22, recordL:60, threeW: 8, threeL: 8},
  { id: 'CLE', name: 'Cleveland Cavaliers', conference: 'E', recordW:19, recordL:63, threeW: 5, threeL: 4},
  { id: 'NYK', name: 'New York Knicks', conference: 'E', recordW:17, recordL:65, threeW: 4, threeL: 7}, 
]

const westernC = [
  { id: 'GSW', name: 'Golden State Warriors', conference: 'W', recordW:'57', recordL:'25', threeW: '7', threeL: '7'},
  { id: 'DEN', name: 'Denver Nuggets', conference: 'W', recordW:'54', recordL:'28', threeW: '13', threeL: '3'},
  { id: 'POR', name: 'Portland Trailblazers', conference: 'W', recordW:'53', recordL:'29', threeW: '4', threeL: '6'},
  { id: 'HOU', name: 'Houston Rockets', conference: 'W', recordW:'53', recordL:'29', threeW: '5', threeL: '7'},
  { id: 'UTA', name: 'Utah Jazz', conference: 'W', recordW:'50', recordL:'32', threeW: '0', threeL: '7'},
  { id: 'OKC', name: 'Oklahoma City Thunder', conference: 'W', recordW:'49', recordL:'33', threeW: '6', threeL: '7'},
  { id: 'SAS', name: 'San Antonio Spurs', conference: 'W', recordW:'48', recordL:'34', threeW: '7', threeL: '4'},
  { id: 'LAC', name: 'Los Angeles Clippers', conference: 'W', recordW:'48', recordL:'34', threeW: '6', threeL: '2'},
  { id: 'SAC', name: 'Sacramento Kings', conference: 'W', recordW:'39', recordL:'43', threeW: '6', threeL: '7'},
  { id: 'LAL', name: 'Los Angeles Lakers', conference: 'W', recordW:'37', recordL:'45', threeW: '5', threeL: '4'},
  { id: 'MIN', name: 'Minnesota Timberwolves', conference: 'W', recordW:'36', recordL:'46', threeW: '8', threeL: '5'},
  { id: 'MEM', name: 'Memphis Grizzles', conference: 'W', recordW:'33', recordL:'49', threeW: '6', threeL: '9'},
  { id: 'NOP', name: 'New Orleans Pelicans', conference: 'W', recordW:'33', recordL:'49', threeW: '4', threeL: '6'},
  { id: 'DAL', name: 'Dallas Mavericks', conference: 'W', recordW:'33', recordL:'49', threeW: '7', threeL: '7'},
  { id: 'PHO', name: 'Phoenix Suns', conference: 'W', recordW:'19', recordL:'63', threeW: '5', threeL: '5'}, 
]


class ListItem extends Component {

  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index,
                    text: 180 };

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
      console.log(this.props)
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
          clickHandler={throttle(() => this.moveArticle('westernC', 'removedArticles', article.id), 800)}
          {...article}
        />
      );
    });
  }

  render() {
    return ( <div className="windowBox" id="standings">
      <div className={this.state.view}>
        <header id="standingsHeader">
          <div className="abs-right">
            <Toggle className="toggle"
              clickHandler={this.toggleSort}
              text={this.state.order === 'asc' ? 'Ascending' : 'Descending'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'chronological'}
            />
            <Toggle className="toggle"
              clickHandler={this.sortShuffle}
              text="Shuffle" icon="random"
              active={this.state.sortingMethod === 'shuffle'}
            />
            <Toggle className="toggle"
              clickHandler={this.sortRotate}
              text="Rotate" icon="refresh"
              active={this.state.sortingMethod === 'rotate'}
            />
              <Toggle className="toggle"
              clickHandler={this.invertSort}
              text={this.state.order === 'asc' ? 'Invert' : 'Revert'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'chronological'}
            />
              <Toggle className="toggle"
              clickHandler={this.evenSort}
              text={this.state.order === 'asc' ? '.500' : 'Revert'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'chronological'}
            />
              <Toggle className="toggle"
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
        <div className="dvContainer">
        <div className= "dvBox">
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
        <div id="standingsLabels">
        <p>1st</p>
        <p>2nd</p>
        <p>3rd</p>
        <p>4th</p>
        <p>5th</p>
        <p>6th</p>
        <p>7th</p>
        <p>8th</p>
        <p className="altColor">9th</p>
        <p className="altColor">10th</p>
        <p className="altColor">11th</p>
        <p className="altColor">12th</p>
        <p className="altColor">13th</p>
        <p className="altColor">14th</p>
        <p className="altColor">15th</p>

        </div>
        <div className= "dvBox">
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
      <div id= "stb" className="textBox">
      <h4>Standings</h4>
      <h7>Re-imagine the standings based on each teams’ record in games decided by 3 points or less and how adjusting the results from those games could affect the end of the season placement.</h7>
      </div>
</div>
    );
  }
};

export default Standings;