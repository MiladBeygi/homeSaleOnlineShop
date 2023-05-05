import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ADVERTISES_URL } from "../constants/URLS";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import MyMap from "../components/MyMap";

const SingleAdvertise = (props) => {
    const [ad, setAd] = useState({ title: "", year: "", id: "", bedrooms: "", floor: "", hasElevator: "", hasParking: "", hasStorage: "", price: "", phone: "", area: "", location: ["", ""], description: "" });
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    useEffect(() => {
        const getAd = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(ADVERTISES_URL + `/${params.productId}`);
                const data = await res.json();
                // console.log(data)
                setAd(data)
            }
            catch (e) {
                toast.error(e.message);
            }
            finally {
                setIsLoading(false);
            }
        }
        getAd()
    }, [])
    return <>
        {isLoading && <Spinner className="my-5" size={"xl"} />}
        {!isLoading && <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 mx-auto px-5 py-[50px] min-h-[85vh] ">
            <div className="py-5">
                <h1 className="text-2xl py-2 font-bold">{ad.title}</h1>
                <p className="py-2">
                    سال ساخت ملک :
                    {ad.year}
                </p>
                <p className="py-2">
                    تعداد اتاق خواب‌ها :
                    {ad.bedrooms}
                </p>
                <p className="py-2">
                    <span className="mx-1">مساحت این ملک </span>
                    {ad.area}
                    <span className="mx-1"> مترمربع است </span>
                </p>
                <p className="py-2">
                    این ملک در طبقه {ad.floor} است
                </p>
                <p className="py-2">
                    آسانسور :
                    {ad.hasElevator ? "دارد" : "ندارد"}
                </p>
                <p className="py-2">
                    پارکینگ :
                    {ad.hasParking ? "دارد" : "ندارد"}
                </p>
                <p className="py-2">
                    انباری :
                    {ad.hasStorage ? "دارد" : "ندارد"}
                </p>
                <p className="py-2">
                    <span className="mx-1">قیمت هر متر مربع این ملک</span>
                    {ad.price}
                    <span className="mx-1">میلیون تومان است</span>
                </p>
                <p className="py-2">
                    <span className="mx-1">شماره تماس مالک : </span>
                    {ad.phone}
                </p>
                <p className="py-2">
                    {ad.description}
                </p>
            </div>
            <div className="py-5">
                <MyMap position={ad.location} />
            </div>
        </div>}
    </>
}
export default SingleAdvertise;