import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import Input from "../Input";
import Radio from "../Radio";
import Button from "../Button";
import Select from "../Select";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "../LocationMarker";
import { Spinner } from "flowbite-react";
import { ADVERTISES_URL } from "../../constants/URLS";
import { toast } from "react-toastify";
const EditModal = React.forwardRef((props, ref) => {

    const { id, showEditModal, homeLocation, title, year, bedrooms, floor, description, price, phone, area, elevator, parking, storage, closeEditModal, render } = props;
    const [hasElevator, setHasElevator] = useState(elevator);
    const [hasParking, setHasParking] = useState(parking);
    const [hasStorage, setHasStorage] = useState(storage);
    const [location, setLocation] = useState(homeLocation);
    const [isLoading, setIsLoading] = useState(false);
    //for field validation ===> for title
    const { value: titleValue, isValid: titleIsValid, hasError: titleHasError, valueChangeHandler: titleChangeHandler, inputBlurHandler: titleBlurHandler, reset: titleReset } = useInput((input) => input.length >= 5, title);


    //for field validation ===> for construction year
    const { value: yearValue, isValid: yearIsValid, hasError: yearHasError, valueChangeHandler: yearChangeHandler, inputBlurHandler: yearBlurHandler, reset: yearReset } = useInput((input) => +input > 1250 && +input <= 1402, year);

    //for field validation ===> for number of bedroom
    const { value: bedroomValue, isValid: bedroomIsValid, hasError: bedroomHasError, valueChangeHandler: bedroomChangeHandler, inputBlurHandler: bedroomBlurHandler, reset: bedroomReset } = useInput((input) => +input >= 0 && +input < 15, bedrooms);

    //for field validation ===> for floor
    const { value: floorValue, isValid: floorIsValid, hasError: floorHasError, valueChangeHandler: floorChangeHandler, inputBlurHandler: floorBlurHandler, reset: floorReset } = useInput((input) => +input >= -2 && +input < 50, floor);

    //for field validation ===> for description
    const { value: descriptionValue, isValid: descriptionIsValid, hasError: descriptionHasError, valueChangeHandler: descriptionChangeHandler, inputBlurHandler: descriptionBlurHandler, reset: descriptionReset } = useInput((input) => input.length >= 10, description);

    //for field validation ===> for price
    const { value: priceValue, isValid: priceIsValid, hasError: priceHasError, valueChangeHandler: priceChangeHandler, inputBlurHandler: priceBlurHandler, reset: priceReset } = useInput((input) => +input >= 0.5 && +input <= 1000, price);

    //for field validation ===> for phone number
    const { value: phoneNumberValue, isValid: phoneNumberIsValid, hasError: phoneNumberHasError, valueChangeHandler: phoneNumberChangeHandler, inputBlurHandler: phoneNumberBlurHandler, reset: phoneNumberReset } = useInput((input) => input.length === 11 && input.startsWith("09"), phone);

    //for field validation ===> for area
    const { value: areaValue, isValid: areaIsValid, hasError: areaHasError, valueChangeHandler: areaChangeHandler, inputBlurHandler: areaBlurHandler, reset: areaReset } = useInput((input) => +input >= 10 && input <= 1500, area);

    const elevatorChangeHandler = (event) => {
        setHasElevator(event.target.value);
        console.log(event.target.value);
        // console.log(event.target.value)
    }
    const parkingChangeHandler = (event) => {
        setHasParking(event.target.value);
        console.log(event.target.value);
    }
    const storageChangeHandler = (event) => {
        setHasStorage(event.target.value);
        console.log(event.target.value);
    }

    const formIsValid = titleIsValid && yearIsValid && bedroomIsValid && floorIsValid && priceIsValid && phoneNumberIsValid && areaIsValid && descriptionIsValid;
    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const editedObj = {
            title: titleValue,
            year: yearValue,
            bedrooms: bedroomValue,
            floor: floorValue,
            hasElevator,
            hasParking,
            hasStorage,
            price: priceValue,
            phone: phoneNumberValue,
            area: areaValue,
            location,
            description: descriptionValue,
            updatedAt: (new Date()).getTime(),

        }
        console.log(editedObj)
        try {
            const res = await fetch(ADVERTISES_URL + `/${id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify(editedObj)
            });
            const data = await res.json();
            if (res.ok) {
                closeEditModal();
                console.log(data);
                render(data);
            }
        }
        catch (e) {
            toast.error(e.message);
        }
        finally {
            setIsLoading(false);
        }
    }
    return <>
        <form dir="rtl" ref={ref} className={`bg-slate-400 p-4 md:fixed md:inset-x-5 z-[99999999] md:w-3/4 md:top-[1%] md:left-[12.5%] md:right-[12.5%]  rounded-3xl ${showEditModal ? "ModalOpen" : "ModalClosed"} md:grid md:grid-cols-4`}>
            <div>

                <Input id="ad-title" type="text" label="عنوان آگهی را بنویسید : " value={titleValue} placeholder="برای مثال : آپارتمان 3 خوابه" onChange={titleChangeHandler} onBlur={titleBlurHandler} />
                {titleHasError && <div className="text-red-500">عنوان آگهی  باید بیشتر از پنج حرف باشد</div>}

            </div>

            <div>

                <Input className="pt-[30px]" id='construction-year' type="number" label="سال ساخت ملک : " placeholder="برای مثال : 1401" value={yearValue} onChange={yearChangeHandler} onBlur={yearBlurHandler} />
                {yearHasError && <div className="text-red-500"> سال ساخت باید بیشتر از 1250 و کمتر از 1403 باشد    </div>}
            </div>

            <div>

                <Input className="pt-[30px]" id="bedrooms" type="number" label="تعداد اتاق خواب : " placeholder="برای مثال : 3" value={bedroomValue} onChange={bedroomChangeHandler} onBlur={bedroomBlurHandler} />
                {bedroomHasError && <div className="text-red-500"> تعداد اتاق خواب ها باید بیشتر از صفر و کمتر از 15 باشد     </div>}
            </div>

            <div>

                <Input className="pt-[30px]" id="floor" type="number" label="طبقه :" placeholder="برای مثال : 2" value={floorValue} onChange={floorChangeHandler} onBlur={floorBlurHandler} />
                {floorHasError && <div className="text-red-500"> طبقه باید بیشتر از -2 و کمتر از 50 باشد    </div>}
            </div>

            <div>

                <Input className="pt-[30px]" id="description" type="text" label="توضیحات : " placeholder="برای مثال : 3 خواب مستر ،دارای تراس بزرگ" value={descriptionValue} onChange={descriptionChangeHandler} onBlur={descriptionBlurHandler} />
                {descriptionHasError && <div className="text-red-500"> توضیحات باید بیشتر از 10 حرف باشد   </div>}
            </div>
            <div>

                <Input id="price" type="number" label="قیمت هر متر مربع ( میلیون تومان) :" value={priceValue} onChange={priceChangeHandler} onBlur={priceBlurHandler} placeholder="برای مثال : 20" />
                {priceHasError && <div className="text-red-500"> قیمت هر متر مربع از خانه باید بیشتر از نیم میلیون تومان و کمتر از هزار میلیون تومان باشد  </div>}
            </div>

            <div>

                <Input className="pt-[30px]" id="phone" type="tel" label="شماره تماس : " value={phoneNumberValue} onChange={phoneNumberChangeHandler} onBlur={phoneNumberBlurHandler} placeholder="برای مثال 09121234567" />
                {phoneNumberHasError && <div className="text-red-500"> شماره تماس باید 11 رقم بوده و با 09 شروع شود </div>}
            </div>

            <div>

                <Input className="pt-[30px]" id="area" type="number" label="متراژ (متر مربع)" value={areaValue} onChange={areaChangeHandler} onBlur={areaBlurHandler} placeholder="برای مثال 110" />
                {areaHasError && <div className="text-red-500"> متراژ خانه باید بیشتر از 10 متر مربع و کمتر از 1500 متر مربع باشد</div>}
            </div>


            <Select className="pt-5" id="edit-elevator" label="آسانسور : " name="elevator" onChange={elevatorChangeHandler} />

            <Select className="pt-5" id="edit-parking" label="پارکینگ : " name="parking"
                onChange={parkingChangeHandler} />
            <Select className="pt-5" id="edit-storage" label="انباری :  " name="storage" onChange={storageChangeHandler} />

            <MapContainer className="h-[200px] w-[90%] mx-auto my-2 rounded-2xl col-span-full" center={location} zoom={14} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker position={location} homeLocation={(input) => setLocation(input)} />
            </MapContainer>

            <Button disabled={!formIsValid} onClick={submitHandler} className="col-span-full" type="submit">
                {!isLoading && "ثبت تغییرات"}
                {isLoading && <Spinner />}
            </Button>
        </form>
    </>
})
export default EditModal;