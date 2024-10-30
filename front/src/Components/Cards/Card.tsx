const Card:React.FC<{children:any}>=(props)=>{
    return(<div className="flex flex-col  w-full items-center gap-1 pb-8 ">
  {props.children}
    </div>)
}
export default Card;