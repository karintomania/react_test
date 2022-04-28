import React from 'react';
import Filter from './filter'; 
import load from './load.svg'; 

export default class VideoGames extends React.Component{
  constructor(props) {
    super(props);
		this.state = {
      error: null,
      isLoaded: false,
      games: [],
      gamesDisp: [],
			name: '',
			rate: 0,
			orderBy: '',
			order: 'ASC',
    };

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeRate = this.handleChangeRate.bind(this);
		this.handleChangeOrder = this.handleChangeOrder.bind(this);
		this.handleChangeOrderBy = this.handleChangeOrderBy.bind(this);
		this.handleClear = this.handleClear.bind(this);

  }

  handleClear(e){
    this.setState({
			name: '',
			rate: 0,
			orderBy: '',
			order: 'ASC',
    }, ()=> this.sortGames());
  }

	handleChangeName(e){
		this.setState({name:e.target.value.toLowerCase()}, ()=> this.sortGames());
	}

	handleChangeRate(e){
		this.setState({rate: e.target.value}, () => this.sortGames());
	}
	
	handleChangeOrderBy(e){
		this.setState({orderBy:e.target.value}, ()=> this.sortGames());
	}

	handleChangeOrder(){
    const order = (this.state.order === 'ASC') ? 'DESC' : 'ASC';
		this.setState({order:order}, ()=> this.sortGames());
	}

	sortGames(){
		const minimumRate = this.state.rate*10;
		const name = this.state.name;
		const orderBy = this.state.orderBy;
		const order = this.state.order;
		const games = this.state.games;

		let gamesDisp = games.filter((game) => {
			let valid = (name.length === 0)? true: game.name.toLowerCase().includes(name);
			valid = valid && (game.rating >= minimumRate);
			return valid;
		});

    let compare;
    switch(orderBy){
      case 'name':
        compare = (a,b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }else if (nameA > nameB) {
            return 1;
          }else{
            return 0;
          }
        };
        break;
      case 'rate':
        compare = (a,b) => {
          const rateA = a.rating;
          const rateB = b.rating;
          return rateA - rateB;
        };
        break;
      case 'date':
        compare = (a,b) => {
          const dateA = a.first_release_date;
          const dateB = b.first_release_date;
          return dateA - dateB;
        };
        break;
      default:
        compare = (a,b) => {
          return 0;
        };
    }
    gamesDisp.sort(compare);
    if(orderBy && order === 'DESC') gamesDisp.reverse();

		this.setState({gamesDisp:gamesDisp});

	}


  componentDidMount() {
    fetch("https://public.connectnow.org.uk/applicant-test/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            games: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        })
        .then(()=>this.sortGames());
  }

  render(){
    return (
			<div className="flex flex-col lg:flex-row gap-10 md:gap-20 p-4 lg:p-20">
				<Filter 
					onChangeName={this.handleChangeName}
					onChangeRate={this.handleChangeRate}
					onClickOrder={this.handleChangeOrder}
					onChangeOrderBy={this.handleChangeOrderBy}
					onClear={this.handleClear}
					name={this.state.name}
					rate={this.state.rate}
					order={this.state.order}
					orderBy={this.state.orderBy}
					/>
				<div className="w-full lg:w-4/5 flex flex-col gap-4">
          <GameList
            games={this.state.gamesDisp}
            isLoaded={this.state.isLoaded}
            error={this.state.error}
           />

				</div>
			</div>
		);
	}

}

function GameList(props){
  if(props.error)
    return <ApiError error={props.error} />

  if(!props.isLoaded)
    return  <Loading />;

  if(props.games.length === 0)
    return (<div className="w-full text-center">No results found.</div>);


  const gameList = (props.games.map(
          game => <Game key={game.id} game={game}/>
        ));
  return gameList;
}

function ApiError(props){
  return (
    <div className="w-full lg:w-4/5 mb-10 flex justify-center">
      <div>
        <p className="text-xl font-heading-white">Something went wrong...</p>
        <p className="text-xl font-heading-white">Please try again later.</p>
        <p>Message: {props.error.toString()}</p>
      </div>
    </div>
  )
}

function Loading(){
  return (
    <div className="w-full lg:w-4/5 flex flex-col items-center gap-8 p-10">
      <p className="text-2xl font-heading-white">Loading...</p>
       <img className="h-20 w-20" src={load}></img>
    </div>
  )
}


function Game(props){
	const name = props.game.name;
	const releaseDate = new Date(props.game.first_release_date).toLocaleDateString("en-GB");
	const summary = (props.game.summary.length < 300) ? props.game.summary : props.game.summary.substring(0,300) + '...';
	const rating = Math.floor(props.game.rating / 10) + 1;

	return(
			<div className="bg-black flex flex-col-reverse md:flex-row justify-end">
				<div className="w-full md:w-9/12 bg-panel px-8 py-4">
					<h2 className="text-xl font-heading-white">{name}</h2>
					<p className="mb-4">Release Data: {releaseDate}</p>
					<p className="text-sm">[Summary] {summary}</p>
				</div>
				<div className="w-full md:w-1/12 bg-black md:bg-panel flex justify-end md:justify-center md:items-center p-10 md:p-0">
					<div className="bg-accent h-8 w-8 font-heading-white rounded-full flex justify-center items-center">{rating}</div>
				</div>
			</div>
	)
}
