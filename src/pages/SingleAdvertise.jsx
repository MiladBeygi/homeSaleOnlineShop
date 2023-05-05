import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ADVERTISES_URL } from "../constants/URLS";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import MyMap from "../components/MyMap";
import Button from "../components/Button";
import { UserContext } from "../App";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import BackDrop from "../components/BackDrop";
import useHandleClickOutside from "../hooks/useHandleClickOutSide"

const SingleAdvertise = (props) => {
    const [ad, setAd] = useState({ title: "", year: "", id: "", bedrooms: "", floor: "", hasElevator: "", hasParking: "", hasStorage: "", price: "", phone: "", area: "", location: ["", ""], description: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    const [deletedObj, setDeletedObj] = useState({});

    //what we need for handle click outside to disapear delete modal
    const deleteBtnRef = useRef();
    const deleteModalRef = useRef();
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    }
    useHandleClickOutside(deleteModalRef, deleteBtnRef, closeDeleteModal);

    const params = useParams();

    const deleteclickHandler = () => {
        setShowDeleteModal(true);
    }
    const deleteAdvertise = async () => {
        try {
            const res = await fetch(ADVERTISES_URL + `/${params.productId}`, {
                method: "DELETE",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify(ad)
            });
            const data = await res.json();
            if (res.ok) {
                navigate("../");
            }
        }
        catch (e) {
            toast.error(e.message)
        }
        finally {

        }
    }
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
    }, [isLoggedIn])
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
            {isLoggedIn && <Button classes="bg-yellow-500 py-2">ویرایش آگهی</Button>}
            {isLoggedIn && <Button ref={deleteBtnRef} onClick={deleteclickHandler} classes="bg-red-600 py-2">حذف آگهی</Button>}
            {showDeleteModal && <DeleteModal ref={deleteModalRef} showDeleteModal={showDeleteModal} closeDeleteModal={closeDeleteModal} deleteAdvertise={deleteAdvertise} />}
            {showDeleteModal && <BackDrop />}
        </div>}

    </>
}
export default SingleAdvertise;