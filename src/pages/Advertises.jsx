import { useEffect, useState } from "react";
import MyMap from "../components/MyMap";
import Card from "./../components/Card";
import { ADVERTISES_URL } from "../constants/URLS";
import { toast } from "react-toastify";
import { Pagination, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
const Advertises = (props) => {

    //waht we need for fetching data from server and loading 
    const [advertises, setAdvertises] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    // what we need for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
    const visitedPosts = (currentPage - 1) * postsPerPage;
    const navigate = useNavigate();



    //change Handler for pagination
    const onPageChange = (number) => {
        // console.log(number);
        setCurrentPage(number);
        navigate(`?page=${number}`);
    }
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(ADVERTISES_URL);
                const data = await res.json();
                // console.log(data)
                setAdvertises(data);

            }
            catch (e) {
                toast.error(e.message);
            }
            finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [currentPage])
    return <>

        {isLoading && <Spinner className="my-5" size={"xl"} />}
        <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {!isLoading &&
                advertises.slice(visitedPosts, currentPage * postsPerPage).map((ad, i) => {
                    return <Card key={i + 1} id={ad.id} title={ad.title} position={ad.location} price={ad.price} description={ad.description} />
                })
            }

        </div>
        <div className="pagination flex items-center justify-center text-center focus:bg-sky-500 py-5">
            <Pagination
                currentPage={currentPage}

                onPageChange={onPageChange}
                showIcons={false}
                totalPages={Math.ceil(advertises.length / postsPerPage)}
                previousLabel="صفحه قبل"
                nextLabel="صفحه بعد"
                active={currentPage}
            />
        </div>
    </>
}
export default Advertises;