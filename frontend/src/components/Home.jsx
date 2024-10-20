import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getStatistics } from '../actions/transactionAction';
import LoadingSpinner from './layout/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { clearErrors } from '../slices/transactionSlice';
import Barchart from './Barchart';
import StatisticsCard from './StatisticsCard';
import { FaBox, FaDollarSign, FaChartLine, FaShoppingCart } from 'react-icons/fa';
import PieChart from './PieChart';
import { Link } from 'react-router-dom';

const Home = () => {

    const dispatch = useDispatch();
    const { loading, transactions, error, count, statistics, barchart, piechart } = useSelector(state => state.transactionState);

    const [month, setMonth] = useState(3);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const monthObj = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }

    // function to increase page
    const increasePage = () => {
        setPage(page + 1);
    };

    // function to decrease page
    const decreasePage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    useEffect(() => {
        dispatch(getProducts(page, month, search));
        dispatch(getStatistics(month));
    }, [month]);

    useEffect(() => {
        dispatch(getProducts(page, month, search));
    }, [search, page]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [error]);

    return (
        <>
            {/* Transactions table */}
            <div className="p-4 max-w-4xl mx-auto">
                <h1 className='text-3xl font-bold py-4'>Transctions Table</h1>
                {/* <!-- Search and Month Filter --> */}
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search by title or description or price..."
                        className="mb-2 sm:mb-0 sm:mr-2 p-2 border rounded w-full sm:w-1/2"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select className="p-2 border rounded w-full sm:w-1/3" value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>

                {/* <!-- Table --> */}
                <div className='flex justify-between'>
                    <h6 className='font-semibold text-lg py-2'>{transactions?.length} / {count} transactions found..</h6>
                    <h6 className=' text-lg py-2'>Month: <span className='font-semibold'>{month ? monthObj[month] : 'All months'}</span></h6>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="text-left p-4 border">ID</th>
                                <th className="text-left p-4 border">Image</th>
                                <th className="text-left p-4 border">Title</th>
                                <th className="text-left p-4 border">Description</th>
                                <th className="text-left p-4 border">Price</th>
                                <th className="text-left p-4 border">Category</th>
                                <th className="text-left p-4 border">Sold</th>
                            </tr>
                        </thead>
                        {
                            loading ? (
                                <tbody>
                                    <tr>
                                        <td colSpan="7" className="p-4">
                                            <div className="flex justify-center">
                                                <LoadingSpinner />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <>
                                    {
                                        transactions?.length > 0 ? (
                                            <tbody>
                                                {
                                                    transactions.map((transaction, index) => (
                                                        <tr key={index} className="border-t">
                                                            <td className="p-4">{transaction?.id}</td>
                                                            <td className="p-4">
                                                                <img src={transaction?.image} alt={transaction.title} className="w-16 h-16 object-cover" />
                                                            </td>
                                                            <td className="p-4 font-semibold">
                                                                <Link to={`/transaction/${transaction?._id}`} className='hover:underline'>
                                                                    {transaction?.title.length > 45 ? `${transaction.title.slice(0, 45)}...` : transaction.title}
                                                                </Link>
                                                            </td>
                                                            <td className="p-4">
                                                                <Link to={`/transaction/${transaction?._id}`} className='hover:underline'>
                                                                    {transaction?.description.length > 45 ? `${transaction.description.slice(0, 45)}...` : transaction.description}
                                                                </Link>
                                                            </td>
                                                            <td className="p-4 font-semibold">{transaction?.price.toFixed(2)}</td>
                                                            <td className="p-4">{transaction?.category}</td>
                                                            <td className="p-4">
                                                                {transaction?.sold ? (
                                                                    <span className='text-green-500 font-semibold'>Yes</span>
                                                                ) : (
                                                                    <span className='text-red-500 font-semibold'>No</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        ) : (
                                            <tbody>
                                                <tr>
                                                    <td colSpan="7" className="text-center p-4">No transactions found</td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                </>
                            )
                        }
                    </table>
                </div>


                {/* <!-- Pagination --> */}
                <article className='flex justify-between py-4'>
                    <p className='font-semibold'>Page No: {page} / {Math.ceil(count / 10)}</p>
                    <div className="flex justify-center mt-4">
                        <button
                            className="mx-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            onClick={decreasePage}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="mx-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            onClick={increasePage}
                            disabled={page >= Math.ceil(count / 10)}
                        >
                            Next
                        </button>
                    </div>
                    <p className='font-semibold'>Per Page: 10</p>
                </article>



            </div>

            {/* Barchart */}
            <div className="p-1 md:p-4 max-w-4xl mx-auto ">
                <h1 className='text-3xl font-bold py-4'>Statistics - {monthObj[month]}</h1>
                <div className='flex gap-2 md:gap-4 flex-wrap md:flex-nowrap justify-center'>
                    <StatisticsCard
                        title="Total Sale Price"
                        value={statistics?.totalSalePrice.toFixed(2)}
                        icon={<FaDollarSign />}
                        bgColor="bg-green-500"
                    />
                    <StatisticsCard
                        title="Total sold items"
                        value={statistics?.totalSoldItems.toFixed(2)}
                        icon={<FaShoppingCart />}
                        bgColor="bg-blue-500"
                    />
                    <StatisticsCard
                        title="Total not sold items"
                        value={statistics?.totalunSoldItems.toFixed(2)}
                        icon={<FaBox />}
                        bgColor="bg-red-500"
                    />
                </div>
            </div>

            {/* Barchart */}
            <div className="p-4 max-w-4xl mx-auto">
                <h1 className='text-3xl font-bold py-4'>Transactions Bar Chart</h1>
                <Barchart />
            </div>

            {/* Barchart */}
            <div className="p-4 max-w-4xl mx-auto">
                <h1 className='text-3xl font-bold py-4'>Categories Pie Chart</h1>
                <PieChart />
            </div>
        </>
    )
}

export default Home