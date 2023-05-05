import React, { useState } from "react";
import Button from "../Button";
import { Spinner } from "flowbite-react";
import "./DeleteModal.css"

const DeleteModal = React.forwardRef((props, ref) => {
    const { deleteAdvertise, closeDeleteModal, showDeleteModal } = props;
    const [isLoading, setIsLoading] = useState(false);
    const yesClickHandler = async (event) => {
        setIsLoading(true);
        try {
            const response = await deleteAdvertise();

        }
        catch (err) {
            console.log(err);
        }
        finally {
            closeDeleteModal();
            setIsLoading(false);
        }


    }
    const noClickHandler = (event) => {
        closeDeleteModal();
    }
    return <>
        <div ref={ref} className={`bg-slate-400 p-4 md:fixed md:inset-x-5 z-[99999999] md:w-2/4 md:top-[30%] md:left-[25%] md:right-[25%]  rounded-3xl ${showDeleteModal ? "ModalOpen" : "ModalClosed"}`}>
            <h1 className="text-lg font-bold">آیا از حذف آگهی مطمئن هستید ؟</h1>
            <div className="sm:flex sm:justify-center">
                <div className="mx-5 px-5">
                    <Button onClick={yesClickHandler}>
                        {isLoading ? <Spinner /> : 'بله'}
                    </Button>
                </div>
                <div className="mx-5 px-5">
                    <Button onClick={noClickHandler}>
                        {isLoading ? <Spinner /> : 'خیر'}
                    </Button>
                </div>
            </div>
        </div>
    </>
})
export default DeleteModal;