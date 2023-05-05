import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "../components/LocationMarker";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Radio from "../components/Radio";
import Button from "../components/Button";
import useInput from "../hooks/useInput";
import { ADVERTISES_URL } from "../constants/URLS";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";


const AddAdvertisement = (props) => {
    const [hasElevator, setHasElevator] = useState(null);
    const [hasParking, setHasParking] = useState(null);
    const [hasStorage, setHasStorage] = useState(null);
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [isLoading, setIsLoading] = useState(false);
    const [formHasError, setFormHasError] = useState(false);
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    //for field validation ===> for title
    const { value: titleValue, isValid: titleIsValid, hasError: titleHasError, valueChangeHandler: titleChangeHandler, inputBlurHandler: titleBlurHandler, reset: titleReset } = useInput((input) => input.length >= 5);


    //for field validation ===> for construction year
    const { value: yearValue, isValid: yearIsValid, hasError: yearHasError, valueChangeHandler: yearChangeHandler, inputBlurHandler: yearBlurHandler, reset: yearReset } = useInput((input) => +input > 1250 && +input <= 1402);

    //for field validation ===> for number of bedroom
    const { value: bedroomValue, isValid: bedroomIsValid, hasError: bedroomHasError, valueChangeHandler: bedroomChangeHandler, inputBlurHandler: bedroomBlurHandler, reset: bedroomReset } = useInput((input) => +input >= 0 && +input < 15);

    //for field validation ===> for floor
    const { value: floorValue, isValid: floorIsValid, hasError: floorHasError, valueChangeHandler: floorChangeHandler, inputBlurHandler: floorBlurHandler, reset: floorReset } = useInput((input) => +input >= -2 && +input < 50);


    //for field validation ===> for description
    const { value: descriptionValue, isValid: descriptionIsValid, hasError: descriptionHasError, valueChangeHandler: descriptionChangeHandler, inputBlurHandler: descriptionBlurHandler, reset: descriptionReset } = useInput((input) => input.length >= 10);

    //for field validation ===> for price
    const { value: priceValue, isValid: priceIsValid, hasError: priceHasError, valueChangeHandler: priceChangeHandler, inputBlurHandler: priceBlurHandler, reset: priceReset } = useInput((input) => +input >= 0.5 && +input <= 1000);

    //for field validation ===> for phone number
    const { value: phoneNumberValue, isValid: phoneNumberIsValid, hasError: phoneNumberHasError, valueChangeHandler: phoneNumberChangeHandler, inputBlurHandler: phoneNumberBlurHandler, reset: phoneNumberReset } = useInput((input) => input.length === 11 && input.startsWith("09"));

    //for field validation ===> for area
    const { value: areaValue, isValid: areaIsValid, hasError: areaHasError, valueChangeHandler: areaChangeHandler, inputBlurHandler: areaBlurHandler, reset: areaReset } = useInput((input) => +input >= 10 && input <= 1500);

    const elevatorChangeHandler = (event) => {
        setHasElevator(event.target.value);
    }
    const parkingChangeHandler = (event) => {
        setHasParking(event.target.value);
    }
    const storageChangeHandler = (event) => {
        setHasStorage(event.target.value);
    }
    const formIsValid = titleIsValid && yearIsValid && bedroomIsValid && floorIsValid && descriptionIsValid && priceIsValid && phoneNumberIsValid && areaIsValid && (location !== null);

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (hasElevator === null || hasParking === null || hasStorage === null) {
            setFormHasError(true);
            return;
        } else {
            setFormHasError(false)
        }
        try {
            const obj = {
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
                location: [location.lat, location.lng],
                description: descriptionValue,
                createdAt: (new Date()).getTime(),
                updatetdAt: (new Date()).getTime()
            }


            const res = await fetch(ADVERTISES_URL,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(obj)
                }
            );
            const data = await res.json();
            if (res.ok) {
                titleReset();
                yearReset();
                bedroomReset();
                floorReset();
                setLocation({ lat: null, lng: null });
                descriptionReset();
                priceReset();
                phoneNumberReset();
                areaReset();
            }
            console.log(data);
        }
        catch (e) {
            toast.error(e.message + ": خطا")
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("ACCESS_TOKEN")) {
            setIsLoggedIn(true);
        } else {
            navigate("../../");
        }
    }, [])
    return <>
        <form dir="rtl" className={`w-full mx-auto md:w-3/4`} onSubmit={submitHandler}>
            <Input id="ad-title" type="text" label="عنوان آگهی را بنویسید : " placeholder="برای مثال : آپارتمان 3 خوابه" value={titleValue} onChange={titleChangeHandler} onBlur={titleBlurHandler} />
            {titleHasError && <div className="text-red-500">عنوان آگهی  باید بیشتر از پنج حرف باشد</div>}


            <Input id='construction-year' type="number" label="سال ساخت ملک : " placeholder="برای مثال : 1401" value={yearValue} onChange={yearChangeHandler} onBlur={yearBlurHandler} />
            {yearHasError && <div className="text-red-500"> سال ساخت باید بیشتر از 1250 و کمتر از 1403 باشد    </div>}


            <Input id="bedrooms" type="number" label="تعداد اتاق خواب : " placeholder="برای مثال : 3" value={bedroomValue} onChange={bedroomChangeHandler} onBlur={bedroomBlurHandler} />
            {bedroomHasError && <div className="text-red-500"> تعداد اتاق خواب ها باید بیشتر از صفر و کمتر از 15 باشد     </div>}


            <Input id="floor" type="number" label="طبقه :" placeholder="برای مثال : 2" value={floorValue} onChange={floorChangeHandler} onBlur={floorBlurHandler} />
            {floorHasError && <div className="text-red-500"> طبقه باید بیشتر از -2 و کمتر از 50 باشد    </div>}

            <Radio legend="آسانسور : " firstId="elevator-y" secondId="elevator-n" firstLabel="دارد : " secondLabel="ندارد : " radioName="elevator" firstValue={true} secondValue={false} firstValueOnchange={elevatorChangeHandler} secondValueOnChange={elevatorChangeHandler} />


            <Radio legend="پارکینگ : " firstId="parking-y" secondId="parking-n" firstLabel="دارد : " secondLabel="ندارد : " radioName="parking" firstValue={true} secondValue={false} firstValueOnchange={parkingChangeHandler} secondValueOnChange={parkingChangeHandler} />

            <Radio legend="انباری : " firstId="storage-y" secondId="storage-n" firstLabel="دارد : " secondLabel="ندارد : " radioName="storage" firstValue={true} secondValue={false} firstValueOnchange={storageChangeHandler} secondValueOnChange={storageChangeHandler} />

            <p className="text-xl text-right mx-5">
                موقعیت مکانی خود را در نقشه تعیین کنید :
            </p>
            <MapContainer className="h-[400px] w-[90%] mx-auto my-2 rounded-2xl" center={{ lat: 35.701, lng: 51.419 }} zoom={14} scrollWheelZoom={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={location} homeLocation={(input) => setLocation(input)} />
            </MapContainer>
            <Input id="description" type="text" label="توضیحات : " placeholder="برای مثال : 3 خواب مستر ،دارای تراس بزرگ" value={descriptionValue} onChange={descriptionChangeHandler} onBlur={descriptionBlurHandler} />
            {descriptionHasError && <div className="text-red-500"> توضیحات باید بیشتر از 10 حرف باشد   </div>}

            <Input id="price" type="number" label="قیمت هر متر مربع ( میلیون تومان) :" value={priceValue} onChange={priceChangeHandler} onBlur={priceBlurHandler} placeholder="برای مثال : 20" />
            {priceHasError && <div className="text-red-500"> قیمت هر متر مربع از خانه باید بیشتر از نیم میلیون تومان و کمتر از هزار میلیون تومان باشد  </div>}

            <Input id="phone" type="tel" label="شماره تماس : " value={phoneNumberValue} onChange={phoneNumberChangeHandler} onBlur={phoneNumberBlurHandler} placeholder="برای مثال 09121234567" />
            {phoneNumberHasError && <div className="text-red-500"> شماره تماس باید 11 رقم بوده و با 09 شروع شود </div>}

            <Input id="area" type="number" label="متراژ (متر مربع)" value={areaValue} onChange={areaChangeHandler} onBlur={areaBlurHandler} placeholder="برای مثال 110" />
            {areaHasError && <div className="text-red-500"> متراژ خانه باید بیشتر از 10 متر مربع و کمتر از 1500 متر مربع باشد</div>}

            <Button disabled={!formIsValid} type="submit" classes="my-5">
                {isLoading && <Spinner />}
                ثبت آگهی
            </Button>
            {formHasError && <div className="text-red-500 pb-5">
                یکی از فیلدهای مربوط به آسانسور، پارکینک یا انباری پر نشده است
            </div>}

        </form>
    </>
}
export default AddAdvertisement;