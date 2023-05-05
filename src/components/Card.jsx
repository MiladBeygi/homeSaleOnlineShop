import { Link } from "react-router-dom";
import MyMap from "./MyMap";
import { useContext } from "react";
import { UserContext } from "../App";

const Card = (props) => {
    const { id, title, description, position, price } = props;
    return <>
        <Link to={`/advertises/${id}`}>
            <div className={`m-2 rounded-2xl bg-slate-600 p-2 text-slate-100 h-[550px] overflow-hidden`}>
                <MyMap position={position} />
                <h1 className="py-2">{title}</h1>
                <p className="py-2">
                    {description}
                </p>
                <p className="py-2">
                    <span className="mx-2"> قیمت هر متر مربع : </span>
                    {
                        price
                    }
                    <span className="mx-2">میلیون تومان </span>
                </p>
            </div>
        </Link>
    </>
}
export default Card;