export default function Filter(props){
  
	return(
		<div className="w-full lg:w-1/5">
			<div className="bg-panel p-4">
				<h2 className="font-heading-white text-lg mb-8">Filter Results</h2>
				<div className="flex flex-col md:flex-row lg:flex-col flex-wrap gap-y-8">
					<div className="w-full">
						<label className="font-heading-white">Name (contains)</label>
						<input className="input mt-4" type="text" onChange={props.onChangeName} value={props.name}/>
					</div>
					<div className="w-full md:w-2/6 lg:w-full pr-0 md:pr-4 lg:pr-0">
            <SelectRate
              onChange={props.onChangeRate}
              rate={props.rate} />
					</div>
					<div  className="w-full md:w-3/6 lg:w-full pr-0 md:pr-4 lg:pr-0">
						<label className="font-heading-white">Order By</label>
              <SelectOrder
                order={props.order} 
                orderBy={props.orderBy} 
                onClickOrder={props.onClickOrder}
                onChangeOrderBy={props.onChangeOrderBy} />
					</div>
					<div className="w-full md:w-1/6 lg:w-full flex justify-end items-end ">
						<button className="w-full md:w-auto btn-color p-2" onClick={props.onClear}>Clear</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function SelectRate(props){
  return(
    <>
      <label className="font-heading-white">Minimum Score</label>
      <select className="input mt-4" onChange={props.onChange} value={props.rate}>
        <option value="0">1 - 10</option>
        <option value="1">2 ~</option>
        <option value="2">3 ~</option>
        <option value="3">4 ~</option>
        <option value="4">5 ~</option>
        <option value="5">6 ~</option>
        <option value="6">7 ~</option>
        <option value="7">8 ~</option>
        <option value="8">9 ~</option>
        <option value="9">10</option>
      </select>
    </>
  )
}

function SelectOrder(props){
  return (
    <div className="flex mt-4">
      <button className="btn-color text-2xl font-bold px-2" onClick={props.onClickOrder} > 
      {(props.order === 'ASC') ? (<>&#8593;</>) : (<>&#8595;</>) /* down arrow : up arrow */}
      </button>
      <select className="input w-full" onChange={props.onChangeOrderBy}  value={props.orderBy}>
        <option value=""></option>
        <option value="name">Name</option>
        <option value="date">Release Date</option>
        <option value="rate">Rate</option>
      </select>
    </div>
  );
}