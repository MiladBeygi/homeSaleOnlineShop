import { useEffect } from "react"

const useHandleClickOutside = (elemntRef, btnRef, callBack) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            e.preventDefault();
            if (elemntRef &&
                elemntRef.current &&
                !elemntRef.current.contains(e.target) &&
                !btnRef.current.contains(e.target)) {
                callBack();
            };
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])
}
export default useHandleClickOutside;